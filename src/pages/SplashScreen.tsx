import { BackgroundLogin } from "@/assets/export";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-slate-600">
      <div className="max-w-[412px] mx-auto bg-white min-h-screen">
        <div
          className="min-h-screen bg-contain"
          style={{
            backgroundImage: `url(${BackgroundLogin})`,
          }}
        >
          <div className="bg-black/40 min-h-screen flex flex-col justify-center items-center p-6">
            <h1 className="text-4xl text-white font-bold text-center">
              Welcome to AGRIHUB
            </h1>
            <Link to="/login">
              <Button className="mt-10 w-full bg-blue-500 hover:bg-blue-400">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
