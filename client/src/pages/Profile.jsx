import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="w-full min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto w-full p-4 ">
        <div className="max-w-xl mx-auto p-12 flex flex-col gap-4">
          <h1 className="text-3xl mb-4 font-tenor text-center">Profile</h1>

          <form className="w-full flex flex-col gap-4">
            <img
              src={currentUser.avatar}
              alt=""
              className="w-24 h-24 object-cover rounded-full cursor-pointer self-center"
            />

            <input
              type="text"
              id="text"
              required
              placeholder="Username"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <button className="bg-[#222] hover:opacity-90 py-2 px-6 h-12 rounded-md text-white">
              Update
            </button>
          </form>
          <div className="flex items-center justify-between gap-4">
            <span className="text-red-500 cursor-pointer">Delete account</span>
            <span className="text-red-500 cursor-pointer">Sign out</span>
          </div>
        </div>
      </div>
    </section>
  );
}
