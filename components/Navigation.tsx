import { useAuthUser } from "@/hooks/useAuthUser";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import NavLink, { NavLinkProps } from "./NavLink";

export type NavigationHandle = {
  toggle: () => void;
};

interface Props extends NavLinkProps {
  label: string;
}

const links: Array<Props> = [
  {
    href: "/",
    label: "Home",
    exact: true,
  },
  {
    href: "/page-x",
    label: "Page X",
    className:
      "hover:bg-sky-800 focus:bg-sky-800 lg:hover:bg-sky-200 lg:focus:bg-sky-200",
    classActive: "before:bg-sky-400 lg:before:bg-sky-400",
  },
  {
    href: "/page-y",
    label: "Page Y",
    className:
      "hover:bg-emerald-800 focus:bg-emerald-800 lg:hover:bg-emerald-200 lg:focus:bg-emerald-200",
    classActive: "before:bg-emerald-400 lg:before:bg-emerald-400",
  },
  {
    href: "/page-z",
    label: "Page Z",
  },
  {
    href: "/account",
    label: "My account",
    className: "hover:bg-indigo-800 focus:bg-indigo-800",
  },
];

const Navigation = forwardRef<NavigationHandle>((props, ref) => {
  const user = useAuthUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle() {
      setOpen((value) => !value);
    },
  }));

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex w-3/4 justify-end">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-full max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-0 p-2">
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white outline-none transition hover:bg-zinc-800 focus:bg-zinc-800 md:h-12 md:w-12"
                          onClick={() => setOpen(false)}
                        >
                          <XMarkIcon className="h-6 md:h-7" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col border-r border-white/10 bg-zinc-900 py-4 shadow-xl md:pb-0">
                      {user && (
                        <Link
                          href="/account"
                          className="relative mt-10 flex items-center gap-4 px-4 py-2 outline-0 hover:bg-zinc-800 focus:bg-zinc-800 md:mt-12 md:py-3"
                        >
                          <figure className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-700 md:h-12 md:w-12">
                            {user.image && (
                              <Image src={user.image} fill alt="Avatar" />
                            )}
                          </figure>
                          <div className="flex w-[calc(100%-3.5rem)] flex-col items-start text-sm leading-tight text-white/40 md:text-base">
                            <h3 className="font-bold text-white">
                              {user.name}
                            </h3>
                            <span className="mt-0.5 w-full truncate md:mt-0">
                              {user.email}
                            </span>
                          </div>
                        </Link>
                      )}

                      <nav
                        className={`mt-8 flex flex-col ${
                          !user ? "md:mt-12" : null
                        }`}
                      >
                        {links.map((link) => (
                          <NavLink key={link.label} {...link}>
                            {link.label}
                          </NavLink>
                        ))}
                      </nav>

                      {user && (
                        <button
                          type="button"
                          className="mt-auto flex w-full items-center gap-2 px-4 py-3 text-sm leading-tight text-white outline-none transition hover:bg-red-800 focus:bg-red-800 md:px-6 md:py-5 md:text-base"
                          onClick={() =>
                            signOut({
                              callbackUrl: "/login",
                            })
                          }
                        >
                          <ArrowRightOnRectangleIcon className="h-6" />
                          <span>Logout</span>
                        </button>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <nav className="ml-auto hidden items-start gap-2 lg:flex">
        {links.map((link) => (
          <NavLink key={link.label} {...link}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
});

export default Navigation;
