import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-cover bg-center flex flex-col-reverse sm:flex-row relative items-center justify-center bg-[url(https://images.unsplash.com/photo-1633109741715-59b57495bbdc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] after:bg-black/30 after:absolute after:inset-0">
      <div className="max-w-6xl mx-auto w-full p-4 grid grid-cols-2 z-10">
        <div className="flex-1"></div>
        <div className="flex-1 p-12 flex flex-col items-center gap-6 bg-white rounded-md">
          <div className="text-center">
            <h1 className="text-3xl mb-4 font-tenor">Log in to your account</h1>

            <p>
              Don&apos;t have an account?{" "}
              <span className="text-blue-600 font-semibold">
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <OAuth />
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
            />
            <button
              disabled={loading}
              className="bg-[#222] hover:opacity-90 py-2 px-6 h-12 rounded-md text-white"
            >
              {loading ? "Signing in" : "Sign in"}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
