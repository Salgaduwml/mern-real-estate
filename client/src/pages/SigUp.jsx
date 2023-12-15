import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-cover bg-center flex flex-col-reverse sm:flex-row relative items-center justify-center bg-[url(/public/bg.png)] after:bg-black/30 after:absolute after:inset-0">
      <div className="max-w-6xl mx-auto w-full p-4 grid grid-cols-2 z-10">
        <div className="flex-1"></div>
        <div className="flex-1 p-12 flex flex-col items-center gap-6 bg-white rounded-md">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-3">Create your account</h1>

            <p>
              Have an account?{" "}
              <span className="text-blue-600 font-semibold">
                <Link to="/sign-in">Login now</Link>
              </span>
            </p>
          </div>
          <form action="" className="w-full flex flex-col gap-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="px-4 py-3 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="px-4 py-3 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="px-4 py-3 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <button className="bg-[#222] hover:opacity-90 py-3 px-6 rounded-md text-white">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
