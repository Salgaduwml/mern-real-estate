import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="bg-[#2B2B2B]">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
          <Link to="/">
            <h1 className="font-tenor text-red-600 text-3xl flex">
              Realtor <span className="text-white">Gate</span>
            </h1>
          </Link>
          <ul className="flex gap-6 items-center text-white">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:underline">
              <Link to="/">Contact</Link>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <Link className="bg-white text-[#2B2B2B] w-8 h-8 flex justify-center items-center rounded-full">
              <FaFacebook size={20} />
            </Link>
            <Link className="bg-white text-[#2B2B2B] w-8 h-8 flex justify-center items-center rounded-full">
              <FaInstagram size={20} />
            </Link>
            <Link className="bg-white text-[#2B2B2B] w-8 h-8 flex justify-center items-center rounded-full">
              <FaPinterest size={20} />
            </Link>
            <Link className="bg-white text-[#2B2B2B] w-8 h-8 flex justify-center items-center rounded-full">
              <FaXTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
