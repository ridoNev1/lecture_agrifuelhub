import Layout from "@/components/layout/Layout";
import { BackgroundLogin, MainLogo } from "@/assets/export";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  {
    userId: 1,
    name: "Petani Jamal",
    email: "user@mail.com",
    password: "user123",
    user_level: 1,
  },
  {
    userId: 2,
    name: "Admin Utama",
    email: "admin@mail.com",
    password: "admin123",
    user_level: 2,
  },
  {
    userId: 3,
    name: "Vendor Hebat",
    email: "vendor@mail.com",
    password: "vendor123",
    user_level: 3,
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const onChange =
    (key: keyof typeof data) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("user-access", JSON.stringify(user));
      navigate("/homepage");
    } else {
      setError("Email atau Password salah.");
    }
  };

  return (
    <Layout>
      <div>
        <img
          className="h-[126px] w-full object-cover"
          src={BackgroundLogin}
          alt="image-in-login-page"
        />
        <div className="px-6">
          <div className="mt-16 montserat-text">
            <p className="font-bold text-xl">LOGIN</p>
            <p className="font-semibold text-sm text-[#656565]">
              Masuk dengan akun mitra anda
            </p>
          </div>

          <div className="mt-8">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-sm"
                type="email"
                id="email"
                placeholder="eg: user@mail.com"
                value={data.email}
                onChange={onChange("email")}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                className="text-sm"
                type="password"
                id="password"
                placeholder="Masukan password"
                value={data.password}
                onChange={onChange("password")}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end items-center mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#656565] poppins-text font-medium"
              >
                Remember Me
              </label>
            </div>
          </div>

          <Button className="mt-12 w-full bg-[#397007]" onClick={handleLogin}>
            Login
          </Button>
        </div>

        <div className="mt-8 flex justify-center items-center flex-col">
          <img src={MainLogo} alt="main-logo-images" className="w-52 h-52" />
          <p className="-mt-8 font-bold text-[#397007] poppins-text">
            Ubah Limbah Jadi Uang
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
