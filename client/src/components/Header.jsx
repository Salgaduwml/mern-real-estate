import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl px-4 py-3 mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex text-slate-700">
            Realtor
          </h1>
        </Link>
        <form className="bg-slate-100 px-3 py-2 rounded flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <AiOutlineSearch className="text-slate-500" size={18} />
        </form>
        <ul className="flex gap-6">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-slate-700 hover:underline">
            <Link to="/sign-in">Sign in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
