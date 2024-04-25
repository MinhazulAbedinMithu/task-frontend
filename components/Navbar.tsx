"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { ImFacebook2 } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import logo from "@/public/logo2.jpg";
import Cookies from "js-cookie";

type Props = {};

const securityNavList = [
  { title: "Home", href: "/" },
  { title: "My School", href: "/myschool" },
  { title: "Requests", href: "/request" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
];

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none sm:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}
            >
              <CgMenu />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xl font-bold md:block hidden"
            >
              ProduGame
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex gap-2 items-center justify-between w-full">
              <Link
                href="/login"
                className={`text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                aria-current="page"
              >
                Login
              </Link>
            <Link
              href="/register"
              className="text-black font-bold p-2 rounded-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div className={isMobileMenuOpen ? "" : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/login"
            className={`text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base block font-medium`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base block font-medium`}
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
