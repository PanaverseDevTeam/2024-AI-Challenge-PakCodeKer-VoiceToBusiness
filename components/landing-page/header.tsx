// components/Header.js
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-white via-white text-black py-2 border">
      <div className=" w-full md:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex justify-center items-center px-8">
        <h1 className="text-xl font-bold flex flex-row items-center justify-center">
          <Link href="/">
            <div className="text-silver-200 hover:text-silver-300 text-xl">
              BriX
            </div>
          </Link>
        </h1>
        {/* <div className="flex">
          <Link href="/login">
            <div className="text-black hover:text-white mr-4 px-3 py-2 rounded transition duration-300">
              Login
            </div>
          </Link>
          <Link href="/register">
            <div className="bg-black hover:bg-[#828282] transition-all duration-500 ease-in-out  text-white hover:text-white px-3 py-2 rounded ">
              Sign Up
            </div>
          </Link>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
