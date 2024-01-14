import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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
          <>
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
          </>
        )
      )}
      <div className="max-w-6xl mx-auto w-full p-4"></div>
    </section>
  );
};

export default Listing;
