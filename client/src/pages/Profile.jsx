import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
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

  return (
    <section className="w-full min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto w-full p-4 ">
        <div className="max-w-xl mx-auto p-12 flex flex-col gap-4">
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
              className="w-24 h-24 object-cover rounded-full cursor-pointer self-center"
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
          </form>
          <div className="flex items-center justify-between gap-4">
            <span
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            >
              Delete account
            </span>
            <span className="text-red-500 cursor-pointer">Sign out</span>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {updateSuccess && (
            <p className="text-green-600 text-center">
              User is updated successfully!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
