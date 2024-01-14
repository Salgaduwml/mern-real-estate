import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaParking, FaChair } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosBed } from "react-icons/io";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const listingId = params.id;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/${listingId}`);
        const data = await res.json();
        setLoading(false);
        if (!res.ok) {
          setError(data.message);
          return;
        }
        setListing(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchListing();
  }, [listingId]);

  console.log(listing);
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#F7F7F7]">
      {error ? (
        <p>Something went wrong</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        listing && (
          <div>
            <Swiper navigation modules={[Navigation]}>
              {listing.imageUrls.map((image, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="h-[450px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="max-w-6xl mx-auto w-full px-4 py-10 flex gap-12">
              <div className="basis-2/3">
                <p className="flex items-center text-green-800 font-semibold text-sm gap-2 mb-2">
                  <FaLocationDot />
                  {listing.address}
                </p>
                <h1 className="font-semibold text-2xl font-tenor capitalize">
                  {listing.name}
                </h1>
                <div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-3 h-3 bg-green-800 rounded-full" />
                    <p>{listing.rent ? "For rent" : "For sale"}</p>
                  </div>
                  {listing.offer ? (
                    <div className="flex gap-3 mt-3">
                      <span className="line-through text-lg font-bold text-gray-500">
                        ${listing.regularPrice}
                      </span>
                      <span className="text-lg font-bold">
                        ${listing.discountPrice} / month
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">
                      ${listing.regularPrice} / month
                    </span>
                  )}
                </div>
                <div className="my-6 space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p className="leading-[1.6]">{listing.description}</p>
                </div>
                <ul className="text-green-800 text-sm font-medium flex gap-8 leading-[1] border p-4 rounded border-green-800/50">
                  <li className="flex items-center gap-3">
                    <IoIosBed size={20} />
                    <span className="">
                      {listing.bedrooms} {""}
                      {listing.bedrooms > 1 ? "Beds" : "Bed"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaBath size={18} />
                    <span className="">
                      {listing.bathrooms} {""}
                      {listing.bathrooms > 1 ? "Baths" : "Bath"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaParking size={20} />
                    <span className="">
                      {listing.bathrooms ? "Parking" : "No Parking"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaChair size={20} />
                    <span className="">
                      {listing.furnished ? "Furnished" : "Furnished"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="basis-1/3">
                <div className="bg-green-700/5 rounded w-full p-4 border">
                  <button className="bg-green-800 text-white font-tenor font-normal w-full p-2.5 rounded">
                    Contact Landload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Listing;
