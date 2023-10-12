import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 flex jusify-center items-center">
        <Link href="/" className="flex gap-2 items-center">
          <p className="bg-clip-text bg-gradient-to-r from-fuchsia-700 to-purple-600 text-4xl font-extrabold text-transparent md:block">
            Accessible Tic Tac Toe
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
