import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Search } from "./Search";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromUrl = urlParams.get("searchTerm");
    if (searchTermfromUrl) {
      setSearchTerm(searchTermfromUrl);
    }
  }, [location.search]);

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
