import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { GrTools } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="min-h-screen justify-center flex flex-col items-center">
          <div className="justify-center flex space-x-2 items-center">
            <GrTools />
            <p>Under construction</p>
          </div>

          <div>
            <Button
              className="mt-10 w-full bg-green-500 hover:bg-green-400"
              onClick={() => {
                localStorage.removeItem("user-access");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    </Layout>
  );
};

export default Profile;
