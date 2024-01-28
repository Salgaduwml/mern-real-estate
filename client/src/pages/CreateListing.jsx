import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((dowloadUrl) => {
            resolve(dowloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    if (id === "sell" || id === "rent") {
      setFormData((prev) => {
        return { ...prev, type: id };
      });
    }
    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData((prev) => ({ ...prev, [id]: e.target.checked }));
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image.");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      setLoading(false);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  console.log(formData);
  return (
    <main>
      <div className="max-w-7xl mx-auto w-full px-5 py-12 sm:py-20 ">
        <h1 className="text-3xl mb-4 font-tenor text-center">
          Create a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-12 mt-12"
        >
          <div className="flex flex-col gap-6 flex-1">
            <input
              type="text"
              id="name"
              required
              maxLength="62"
              minLength="10"
              placeholder="Name"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              id="description"
              required
              placeholder="Description"
              rows="3"
              className="px-4 py-2 border border-black/30 rounded w-full placeholder:text-sm"
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              id="address"
              required
              placeholder="Address"
              className="px-4 py-2 h-12 border border-black/30 rounded w-full placeholder:text-sm"
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span className="text-sm leading-[1] mt-0.5">Sell</span>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span className="text-sm leading-[1] mt-0.5">Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className="text-sm leading-[1] mt-0.5">Parking spot</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className="text-sm leading-[1] mt-0.5">Furnished</span>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className="text-sm leading-[1] mt-0.5">Offer</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-16"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p className="text-sm">Bedrooms</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-16"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className="text-sm">Bathrooms</p>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000"
                  required
                  className="pl-3 py-2 border border-black/30 rounded w-20"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p className="text-sm">Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000"
                    required
                    className="pl-3 py-2 border border-black/30 rounded w-20"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-sm">Discounted price</p>
                    <span className="text-xs">($ / month)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-semibold text-sm">
              Images:{" "}
              <span className="text-gray-500 font-normal ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex items-center gap-6 mt-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="text-sm p-3 py-2 border border-black/30 rounded w-full"
              />
              <button
                className="py-2 px-6 text-green-600 border border-green-600 h-full rounded"
                onClick={handleImageUpload}
                type="button"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {imageUploadError && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {imageUploadError}
              </p>
            )}
            {formData.imageUrls.length > 0 && (
              <div className="mt-3">
                {formData.imageUrls.map((url, i) => (
                  <div
                    key={i}
                    className="border flex items-center justify-between p-3"
                  >
                    <img
                      src={url}
                      className="w-[100px] h-[60px] rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="text-red-500 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              disabled={loading || uploading}
              className="py-2 px-6 w-full bg-green-600 text-white mt-4 h-12 rounded"
            >
              {loading ? "Creating..." : "Create listing"}
            </button>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
