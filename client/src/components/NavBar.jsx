import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    // NavBar is a landmark
    <nav
      role="navigation"
      className="bg-gradient-to-b from-zinc-100 to-bg-transparent"
    >
      <div className="max-w-7xl mx-auto py-7 px-7 sm:px-4 flex justify-center">
        <div className="absolute inset-x-0 top-2 h-16 px-10">
          <p>
            <Link aria-label="Home" to="/" className="flex gap-2 items-center">
              <span className="bg-clip-text bg-gradient-to-r from-fuchsia-700 to-purple-600 text-2xl font-extrabold text-transparent md:block">
                Accessible Tic Tac Toe
              </span>
            </Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
