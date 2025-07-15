import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173/dashboard",
    });
  };
  return (
    <div className="bg-muted min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 py-6 md:py-10">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <div className="mb-6 w-full flex justify-start">
          <Link to="/">
            <Button variant="ghost" className="flex items-center">
              <span className="mr-2">←</span>
              Back
            </Button>
          </Link>
        </div>
        <Card className="w-full rounded-2xl shadow">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-xl font-semibold">
              Welcome back
            </CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={loginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
