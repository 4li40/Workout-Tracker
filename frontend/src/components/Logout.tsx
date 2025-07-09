import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login"); // redirect to login page
        },
      },
    });
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
