import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="md:text-7xl text-3xl text-center mt-24 mb-4 font-bold">
          WELCOME TO ProduGame
        </h1>
        <p className="md:w-1/2 w-full text-center text-sm md:text-base">
          with ProduGame we made it to enhance productivity for university students. You can efficiently plan and prioritize academic and personal tasks, fostering better time management and stress reduction.
        </p>
      </div>
    </div>
  );
}
