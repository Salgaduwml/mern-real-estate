const Search = () => {
  return (
    <section className="max-w-screen-2xl py-16 px-12">
      <div className="w-full flex gap-16">
        <div className="w-1/4">
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="searchTerm" className="font-medium">
                Search:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search"
                className="px-4 py-2 border border-black/30 rounded w-full placeholder:text-sm mt-1 "
              />
            </div>
            <div>
              <p className="font-medium">Type:</p>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="all" className="w-4 h-4" />
                <label htmlFor="all" className="text-sm mt-0.5">
                  Rent & sale
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="rent" className="w-4 h-4" />
                <label htmlFor="rent" className="text-sm mt-0.5">
                  Rent
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="sale" className="w-4 h-4" />
                <label htmlFor="sale" className="text-sm mt-0.5">
                  Sale
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="offer" className="w-4 h-4" />
                <label htmlFor="offer" className="text-sm mt-0.5">
                  Offer
                </label>
              </div>
            </div>
            <div>
              <p className="font-medium">Amenities:</p>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="all" className="w-4 h-4" />
                <label htmlFor="parking" className="text-sm mt-0.5">
                  Parking
                </label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="furnished" className="w-4 h-4" />
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
              >
                <option value="">Price low to high</option>
                <option value="">Price high to low</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <button className="w-full bg-slate-700 px-6 py-2.5 rounded text-white">
              Search
            </button>
          </form>
        </div>
        <div className="w-3/4">
          <h1 className="text-xl font-tenor font-semibold">Search Result</h1>
        </div>
      </div>
    </section>
  );
};

export default Search;
