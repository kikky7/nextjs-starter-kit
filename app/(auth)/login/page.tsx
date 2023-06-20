"use client";

import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FaApple,
  FaCircleNotch,
  FaFacebook,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    await signIn("google", { callbackUrl: "/" });
  };

  const loginDisabled = () => {
    toast.error("Login with selected provider is currently not available!");
  };

  return (
    <>
      <section className="absolute flex h-full w-full items-center justify-center py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold leading-tight">
            <span>Welcome to My Next App!</span>
          </h1>

          <h2 className="mt-6 text-xl font-bold">Sign in with</h2>

          <div className="relative mt-3 space-x-2 md:space-x-3">
            <Button size="circle" onClick={loginWithGoogle}>
              <FaGoogle size={20} />
            </Button>

            {/* TODO: Display button only if credentials are set in env */}
            <Button size="circle" onClick={loginDisabled} disabled>
              <FaApple size={20} />
            </Button>

            <Button size="circle" onClick={loginDisabled} disabled>
              <FaFacebook size={20} />
            </Button>

            <Button size="circle" onClick={loginDisabled} disabled>
              <FaTwitter size={20} />
            </Button>

            {/* Show loading state while NextAuth is processing. Set background color same as body/wrapper background color */}
            {isLoading && (
              <div className="absolute -inset-2 !ml-0 flex items-center justify-center bg-zinc-50">
                <FaCircleNotch className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>

          {error && (
            <p className="mt-6 font-bold text-red-500">Login failed.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Login;
