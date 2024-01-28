import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listings, setListings] = useState([]);

  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    const listings = async () => {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      setListings(data);
    };
    listings();
  }, []);

  console.log(listings);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleListingDelete = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#F7F7F7] py-5 sm:py-12">
      <div className="max-w-7xl mx-auto w-full px-5 flex flex-col sm:flex-row gap-8">
        <div className="bg-white w-full max-w-sm border rounded">
          <div className="mx-auto p-4 py-8 sm:p-8 flex flex-col gap-4">
            <h1 className="text-3xl mb-4 font-tenor text-center">Profile</h1>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 items-stretch text-center"
            >
              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                src={formData.avatar || currentUser.avatar}
                alt="Profile"
                onClick={() => fileRef.current.click()}
                className="w-24 h-24 object-cover rounded-full cursor-pointer self-center mb-4"
              />
              {uploadError ? (
                <p className="text-red-500 text-sm">Error uploading image</p>
              ) : uploadProgress > 0 && uploadProgress < 100 ? (
                <p className="text-slate-700 text-sm">{`uploading: ${uploadProgress}%`}</p>
              ) : uploadProgress === 100 ? (
                <p className="text-green-600 text-sm">
                  Image uploaded successfully
                </p>
              ) : (
                ""
              )}
              <input
                type="text"
                id="username"
                required
                defaultValue={currentUser.username}
                placeholder="Username"
                className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
                onChange={handleChange}
              />
              <input
                type="email"
                id="email"
                required
                defaultValue={currentUser.email}
                placeholder="Email"
                className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
                onChange={handleChange}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
                onChange={handleChange}
              />
              <button
                disabled={loading}
                className="bg-[#222] hover:opacity-90 py-2 px-6 h-12 rounded-md text-white"
              >
                {loading ? "Updating" : "Update"}
              </button>
              <Link
                to={"/create-listing"}
                className="bg-red-600 py-2 px-6 h-12 rounded-md text-white flex items-center justify-center"
              >
                Create new listing
              </Link>
            </form>
            <div className="flex items-center justify-between gap-4">
              <span
                className="text-red-500 cursor-pointer"
                onClick={handleDelete}
              >
                Delete account
              </span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out
              </span>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {updateSuccess && (
              <p className="text-green-700 text-center">
                User is updated successfully!
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white p-4 sm:p-8 border rounded">
          {listings.length > 0 ? (
            <ul className="space-y-6">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={`/listings/${listing._id}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-8">
                      <img
                        className="w-[120px] h-[80px] object-cover rounded"
                        src={listing.imageUrls[0]}
                      />
                      <h3 className="font-medium truncate">{listing.name}</h3>
                    </div>
                  </Link>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleListingDelete(listing._id)}>
                      <svg
                        className="w-[20px] h-[20px] text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                        />
                      </svg>
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="#909090"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                          id="edit"
                        >
                          <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                          <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>You do not have any listings</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
