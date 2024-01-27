import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center max-w-7xl px-5 py-3 mx-auto">
        <Link to="/">
          <h1 className="font-tenor text-red-600 text-3xl flex">
            Realtor <span className="text-black">Gate</span>
          </h1>
        </Link>
        <ul className="flex gap-6 items-center">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-slate-700 hover:underline">
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            ) : (
              <Link to="/sign-in">Sign in</Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
