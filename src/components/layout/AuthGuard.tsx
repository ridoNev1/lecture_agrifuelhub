import { getUserDetails } from "@/enum";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    }
  }, [userDetails, navigate]);

  return children;
};

export default AuthGuard;
