"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { Bars3Icon, CubeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "./Button";
import Navigation, { NavigationHandle } from "./Navigation";
import UserAccountPopup from "./UserAccountPopup";

const Navbar = () => {
  const user = useAuthUser();
  const router = useRouter();

  const navRef = useRef<NavigationHandle>(null);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-4 shadow-lg md:h-20 lg:px-8">
        <Link
          href="/"
          className="on-focus-visible -ml-1 rounded-full p-1 transition-colors hover:text-zinc-700 active:scale-95"
        >
          <CubeIcon className="h-8 md:h-10" />
        </Link>

        {/* Main navigation (sidebar for mobile, inline for desktop) */}
        <Navigation ref={navRef} />

        {!user && (
          <Button
            size="sm"
            className="ml-auto lg:ml-8"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}

        {/* Button to open mobile navigation */}
        <button
          type="button"
          className="-mr-2 ml-1 flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none md:ml-2 md:h-12 md:w-12 lg:hidden"
          onClick={() => navRef.current?.toggle()}
        >
          <Bars3Icon className="h-6 md:h-7" />
        </button>

        {/* User avatar button and popup on larger devices for logged in users */}
        <UserAccountPopup />
      </header>
    </>
  );
};

export default Navbar;
