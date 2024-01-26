import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <div className="w-full max-w-[300px] rounded-md overflow-hidden bg-white shadow-md group">
      <Link to={`/listings/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt=""
          className="w-full h-[180px] object-cover group-hover:scale-105 transition"
        />
        <div className="p-4">
          <div>
            <p className="flex items-center text-green-800 font-semibold text-sm gap-2 mb-2">
              <FaLocationDot />
              <span className="truncate">{listing.address}</span>
            </p>
            <h3 className="font-semibold text-lg font-tenor capitalize">
              {listing.name}
            </h3>
            <p className="leading-[1.6] line-clamp-2 text-sm mt-2">
              {listing.description}
            </p>
            <div className="flex gap-3 my-3">
              <span className="flex gap-1 text-sm items-center">
                <span className="font-semibold text-base">
                  {listing.bathrooms}
                </span>
                {listing.bathrooms > 1 ? "baths" : "bath"}
              </span>
              <span className="flex gap-1 text-sm items-center">
                <span className="font-semibold text-base">
                  {listing.bedrooms}
                </span>
                {listing.bedrooms > 1 ? "beds" : "bed"}
              </span>
            </div>
          </div>

          {listing.offer ? (
            <div className="flex gap-3">
              <span className="line-through font-bold text-gray-500">
                ${listing.regularPrice.toLocaleString("en-US")}
              </span>
              <span className="font-bold">
                ${listing.discountPrice.toLocaleString("en-US")}{" "}
                <span className="text-sm font-normal">/ month</span>
              </span>
            </div>
          ) : (
            <span className="font-bold">
              ${listing.regularPrice.toLocaleString("en-US")}{" "}
              <span className="text-sm font-normal">/ month</span>
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
