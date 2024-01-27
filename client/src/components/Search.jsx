import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromUrl = urlParams.get("searchTerm");
    if (searchTermfromUrl) {
      setSearchTerm(searchTermfromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-full flex items-center pl-3 w-full"
    >
      <input
        type="text"
        required
        placeholder="Search..."
        className="bg-transparent focus:outline-none outline-none focus:ring-0 border-none w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="bg-red-500 h-full px-6 py-3 rounded-r-full">
        <AiOutlineSearch className="text-white" size={24} />
      </button>
    </form>
  );
};
