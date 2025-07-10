import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 />
      </div>
    ); // Show spinner while loading
  if (error)
    return (
      <div className="text-red-500 text-center mt-8">
        Authentication error.{" "}
        <button onClick={() => refetch()} className="underline">
          Retry
        </button>
      </div>
    );
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
