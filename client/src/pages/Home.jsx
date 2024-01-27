import { useEffect, useState } from "react";
import { Search } from "../components/Search";
import ListingItem from "../components/ListingItem";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsCalculatorFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Home() {
  const [offerListings, setOfferListigs] = useState([]);
  const [recentListings, setRecentListigs] = useState([]);
  useEffect(() => {
    const fetchOfferListigs = async () => {
      try {
        const res = await fetch("/api/listing?offer=true&limit=4");
        const data = await res.json();
        setOfferListigs(data);
        fetchResentListings();
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOfferListigs();
  }, []);

  const fetchResentListings = async () => {
    const res = await fetch("/api/listing?limit=6");
    const data = await res.json();
    setRecentListigs(data);
  };

  return (
    <>
      <section className="w-full h-[480px] bg-cover bg-center flex flex-col-reverse sm:flex-row relative items-center justify-center bg-[url(https://images.unsplash.com/photo-1633109741715-59b57495bbdc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] after:bg-black/30 after:absolute after:inset-0">
        <div className="max-w-3xl flex flex-col z-[20] justify-center items-center gap-6">
          <h1 className="font-tenor text-white text-6xl text-center leading-[1.2]">
            Find Your Next{" "}
            <span className="text-red-600 bg-white rounded-full px-4">
              Perfect
            </span>{" "}
            Place With Ease
          </h1>
          <div className="w-full max-w-md">
            <Search />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex gap-4 justify-between items-center">
          <h2 className="font-tenor text-3xl">Latest Offers</h2>

          <Link to="/search?offer=true" className="text-red-600 font-medium">
            More offeres
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {offerListings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
      <section className="py-16 bg-red-600/5">
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto px-5">
          <div className="border rounded-md border-black/40 p-6 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-tenor text-2xl text-black">
                Find out how much <br />
                you can afford
              </h3>
              <div className="bg-red-600 w-12 h-12 flex justify-center items-center rounded-full">
                <BiSolidBadgeDollar size={32} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-black/60">
              We will help you estimate your budget range. Save to your buyer
              profile to help in your search.
            </p>
          </div>
          <div className="border rounded-md border-black/40 p-6 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-tenor text-2xl text-black">
                Understand your <br /> monthly costs
              </h3>
              <div className="bg-red-600 w-12 h-12 flex justify-center items-center rounded-full">
                <BsCalculatorFill size={26} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-black/60">
              Get an in-depth look at what your monthly and closing costs will
              look like based on your financial situation and goals.
            </p>
          </div>
          <div className="border rounded-md border-black/40 p-6 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-tenor text-2xl text-black">
                Get help with your <br /> down payment
              </h3>
              <div className="bg-red-600 w-12 h-12 flex justify-center items-center rounded-full">
                <FaMoneyCheckDollar size={28} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-black/60">
              You may be able to buy a home with just 3.5% down. Saving for that
              can be challenging down payment assistance programs can help.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex gap-4 justify-between items-center">
          <h2 className="font-tenor text-3xl">Recent Listings</h2>
          <Link to="/search" className="text-red-600 font-medium">
            More listings
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {recentListings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
      <section className="w-full bg-fixed h-[480px] bg-cover bg-center flex flex-col-reverse sm:flex-row relative items-center justify-center bg-[url(https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] after:bg-black/30 after:absolute after:inset-0">
        <div className="max-w-3xl flex flex-col z-[20] justify-center items-center gap-6">
          <h1 className="font-tenor text-white text-5xl text-center leading-[1.2]">
            Need a home loan?
            <br />
            Get pre-approved
          </h1>
          <button className="bg-red-600 text-white rounded-full px-6 py-2.5">
            Contact Us
          </button>
        </div>
      </section>
    </>
  );
}
