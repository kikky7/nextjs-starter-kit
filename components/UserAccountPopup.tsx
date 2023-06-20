import { useAuthUser } from "@/hooks/useAuthUser";
import { Popover, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const UserAccountPopup = () => {
  const user = useAuthUser();

  if (!user) {
    return null;
  }

  return (
    <Popover className="relative ml-8 hidden lg:block">
      <Popover.Button className="on-focus-visible group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-zinc-200 focus:ring-offset-2 focus:ring-offset-white active:scale-95">
        {user.image ? (
          <Image src={user.image} fill alt="Avatar" />
        ) : (
          <UserIcon className="h-6 text-zinc-900/20 transition group-hover:text-zinc-900" />
        )}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white p-6">
              <Popover.Button
                as={Link}
                href="/account"
                className="on-focus-visible -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-zinc-200"
              >
                {user.image && (
                  <figure className="relative mr-4 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <Image src={user.image} fill alt="Avatar" />
                  </figure>
                )}
                <div className="flex flex-col items-start leading-tight">
                  <h3 className="font-bold">{user.name}</h3>
                  <span className="mt-0.5 text-zinc-500 md:mt-0">
                    {user.email}
                  </span>
                </div>
              </Popover.Button>
            </div>
            <div className="bg-zinc-100 p-4">
              <Popover.Button
                className="on-focus-visible flex w-full items-start rounded-md px-2 py-2 font-bold transition duration-150 ease-in-out hover:bg-red-600 hover:text-white"
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                Logout
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default UserAccountPopup;
