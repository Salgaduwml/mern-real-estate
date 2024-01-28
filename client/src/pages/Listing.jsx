import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaParking, FaChair } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosBed } from "react-icons/io";
import { useSelector } from "react-redux";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);

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
    <section className="w-full min-h-[calc(100vh-64px)]">
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
            <div className="max-w-7xl mx-auto w-full px-5 py-12 sm:py-20 flex flex-col sm:flex-row gap-12">
              <div className="basis-2/3 flex flex-col items-start">
                <p className="flex items-center text-red-600 font-semibold text-sm gap-2 mb-2">
                  <FaLocationDot />
                  {listing.address}
                </p>
                <h1 className="font-semibold text-2xl font-tenor capitalize">
                  {listing.name}
                </h1>
                <div className="mt-6">
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
                <ul className="text-sm text-black/60 font-medium grid grid-cols-2 sm:grid-cols-4 gap-8 leading-[1] border p-4 px-6 rounded border-black/20">
                  <li className="flex items-center gap-3">
                    <IoIosBed size={20} className="text-red-600" />
                    <span className="">
                      {listing.bedrooms} {""}
                      {listing.bedrooms > 1 ? "Beds" : "Bed"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaBath size={18} className="text-red-600" />
                    <span className="">
                      {listing.bathrooms} {""}
                      {listing.bathrooms > 1 ? "Baths" : "Bath"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaParking size={20} className="text-red-600" />
                    <span className="">
                      {listing.bathrooms ? "Parking" : "No Parking"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaChair size={20} className="text-red-600" />
                    <span className="">
                      {listing.furnished ? "Furnished" : "Furnished"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="basis-1/3">
                {listing && currentUser?._id !== listing.userRef && (
                  <button className="bg-black text-white font-tenor font-normal w-full p-2.5 rounded hover:opacity-80">
                    Contact Landload
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Listing;
