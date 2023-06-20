import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export interface NavLinkProps {
  href: string;
  exact?: boolean;
  className?: string;
  classActive?: string;
}

interface Props
  extends NavLinkProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const NavLink: React.FC<Props> = ({
  href,
  exact,
  className = "",
  classActive,
  children,
}) => {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={twMerge(
        `relative px-5 py-4 text-base leading-tight text-white outline-0 transition before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:w-1 before:bg-transparent before:transition hover:bg-zinc-800 focus:bg-zinc-800 md:py-5 md:pl-8 md:pr-6 md:text-lg md:before:w-2 lg:rounded-xl lg:px-4 lg:py-3 lg:text-base lg:font-medium lg:leading-tight lg:text-zinc-800 lg:before:left-2 lg:before:right-2 lg:before:top-auto lg:before:h-1 lg:before:w-auto lg:before:rounded-full lg:hover:bg-zinc-200 lg:focus:bg-zinc-200`,
        className,
        isActive &&
          twMerge("before:bg-white lg:before:bg-zinc-800", classActive)
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
