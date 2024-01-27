import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing?${searchQuery}`);
      const data = await res.json();
      setLoading(false);
      setListings(data);
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };

    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "all" || id === "rent" || id === "sale") {
      setSidebarData((prev) => ({ ...prev, type: id }));
    }
    if (id === "parking" || id === "furnished" || id === "offer") {
      setSidebarData((prev) => ({
        ...prev,
        [id]: e.target.checked || e.target.checked === "true" ? true : false,
      }));
    }
    if (id === "searchTerm") {
      setSidebarData((prev) => ({ ...prev, searchTerm: value }));
    }
    if (id === "sort_order") {
      const sort = value.split("_")[0] || "created_at";
      const order = value.split("_")[1] || "desc";
      setSidebarData((prev) => ({ ...prev, sort, order }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numOfListigs = listings.length;
    const startIndex = numOfListigs;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/listing?${searchQuery}`);
    const data = await res.json();
    if (data.length > 9) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <section className="max-w-screen-2xl py-16 px-12">
      <div className="w-full flex gap-16">
        <div className="w-1/4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="searchTerm" className="font-medium">
                Search:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search"
                className="px-4 py-2 border border-black/30 rounded w-full placeholder:text-sm mt-1 "
                onChange={handleChange}
                value={sidebarData.searchTerm}
              />
            </div>
            <div>
              <p className="font-medium">Type:</p>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                <label htmlFor="all" className="text-sm mt-0.5">
                  Rent & sale
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                <label htmlFor="rent" className="text-sm mt-0.5">
                  Rent
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "sale"}
                />
                <label htmlFor="sale" className="text-sm mt-0.5">
                  Sale
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <label htmlFor="offer" className="text-sm mt-0.5">
                  Offer
                </label>
              </div>
            </div>
            <div>
              <p className="font-medium">Amenities:</p>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                <label htmlFor="parking" className="text-sm mt-0.5">
                  Parking
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                <label htmlFor="furnished" className="text-sm mt-0.5">
                  Furnished
                </label>
              </div>
            </div>
            <div>
              <p className="font-medium">Sort:</p>
              <select
                id="sort_order"
                className="bg-white px-4 py-2 border border-black/30 rounded w-full text-sm mt-2"
                onChange={handleChange}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-700 px-6 py-2.5 rounded text-white"
            >
              Search
            </button>
          </form>
        </div>
        <div className="w-3/4">
          <h1 className="text-xl font-tenor font-semibold">Search Result</h1>
          {!loading && listings.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-lg font-medium">No listing found...!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
              {showMore && (
                <button
                  className="text-green-600 font-semibold text-sm mt-6"
                  onClick={onShowMoreClick}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
