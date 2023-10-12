import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-b from-zinc-100 to-bg-transparent">
      <div className="max-w-7xl mx-auto py-7 px-7 sm:px-4 flex justify-center">
        <div className="absolute inset-x-0 top-2 h-16 px-10">
          <Link to="/" className="flex gap-2 items-center">
            <p className="bg-clip-text bg-gradient-to-r from-fuchsia-700 to-purple-600 text-4xl font-extrabold text-transparent md:block">
              Accessible Tic Tac Toe
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
