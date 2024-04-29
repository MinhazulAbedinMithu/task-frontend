"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row overflow-y-hidden">
      <div className="bg-gray-50 shadow-md h-fit md:min-h-[90vh] w-full md:w-1/5 pb-2 md:pb-0">
        <nav className="grid grid-cols-3 md:flex md:flex-col justify-between items-center md:justify-start h-full px-4 md:px-0 md:my-2">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className={
              pathname === "/dashboard/profile"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            Profile
          </Link>
          <Link
            href="/dashboard/myTasks"
            className={
              pathname === "/dashboard/myTasks"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            My Tasks
          </Link>
          <Link
            href="/dashboard/analytics"
            className={
              pathname === "/dashboard/analytics"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            Analytics
          </Link>
          {/* <Link
            href="/dashboard/leaderBoard"
            className={
              pathname === "/dashboard/leaderBoard"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            Leaderboard
          </Link> */}
          <Link
            href="/dashboard/chat"
            className={
              pathname === "/dashboard/chat"
                ? "px-2 py-2 w-full text-black font-bold"
                : "px-2 py-2 w-full text-gray-700 hover:bg-gray-300"
            }
          >
            Chat
          </Link>
        </nav>
      </div>
      <div className="w-full md:w-4/5">{children}</div>
    </div>
  );
};

export default Layout;
