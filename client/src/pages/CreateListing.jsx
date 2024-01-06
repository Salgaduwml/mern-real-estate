export default function CreateListing() {
  return (
    <main>
      <div className="max-w-6xl mx-auto w-full p-4 ">
        <h1 className="text-3xl mb-4 font-tenor text-center">
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-12">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              id="name"
              required
              maxLength="62"
              minLength="10"
              placeholder="Name"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <textarea
              type="text"
              id="description"
              required
              placeholder="Description"
              className="px-4 py-2 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="text"
              id="address"
              required
              placeholder="Address"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="sell" className="w-4 h-4" />
                <span className="text-sm leading-[1] mt-0.5">Sell</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" id="rent" className="w-4 h-4" />
                <span className="text-sm leading-[1] mt-0.5">Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="parking" className="w-4 h-4" />
                <span className="text-sm leading-[1] mt-0.5">Parking spot</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="furished" className="w-4 h-4" />
                <span className="text-sm leading-[1] mt-0.5">Furished</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="offer" className="w-4 h-4" />
                <span className="text-sm leading-[1] mt-0.5">Offer</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-12"
                />
                <p className="text-sm">Bedrooms</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-12"
                />
                <p className="text-sm">Bathrooms</p>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-20"
                />
                <div className="flex flex-col items-center">
                  <p className="text-sm">Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-20"
                />
                <div className="flex flex-col items-center">
                  <p className="text-sm">Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-semibold text-sm">
              Images:{" "}
              <span className="text-gray-500 font-normal ml-2">
                The first image will be the cover (max6)
              </span>
            </p>
            <div className="flex items-center gap-6 mt-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="text-sm p-3 py-2 border border-black/30 rounded w-full"
              />
              <button className="py-2 px-6 text-green-600 border border-green-600 h-full rounded">
                Upload
              </button>
            </div>
            <button className="py-2 px-6 w-full bg-blue-500 text-white mt-4 h-12 rounded">
              Create listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
