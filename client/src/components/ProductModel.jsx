import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { useEffect } from "react";

const ProductModal = ({ onClose, type, setProducts, editProduct }) => {
  const [form, setForm] = useState({
    id: Date.now(),
    name: "",
    type: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    exchangeEligibility: "",
    published: true,
    images: [],
  });

  useEffect(() => {
    if (type === "edit" && editProduct) {
      setForm({
        name: editProduct.name || "",
        type: editProduct.type || "",
        quantityStock: editProduct.quantityStock || "",
        mrp: editProduct.mrp || "",
        sellingPrice: editProduct.sellingPrice || "",
        brandName: editProduct.brandName || "",
        exchangeEligibility: editProduct.exchangeEligibility || "YES",
        published: editProduct.published ?? true,
        images: [],
      });
    }
  }, [type, editProduct]);

  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    setErrors((prev) => ({
      ...prev,
      images: "",
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.type.trim()) newErrors.type = "Required";
    if (!form.quantityStock) newErrors.quantityStock = "Required";
    if (!form.mrp) newErrors.mrp = "Required";
    if (!form.sellingPrice) newErrors.sellingPrice = "Required";
    if (!form.brandName.trim()) newErrors.brandName = "Required";
    if (!form.exchangeEligibility) newErrors.exchangeEligibility = "Select one";
    if (form.images.length === 0) newErrors.images = "Upload image";

    if (form.images.length === 0) {
      newErrors.images = "Image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("quantityStock", form.quantityStock);
    formData.append("mrp", form.mrp);
    formData.append("sellingPrice", form.sellingPrice);
    formData.append("brandName", form.brandName);
    formData.append("exchangeEligibility", form.exchangeEligibility);
    formData.append("published", form.published);

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    let url = "http://localhost:5000/products";
    let method = "POST";
    console.log(editProduct);

    if (type === "edit") {
      url = `http://localhost:5000/products/${editProduct._id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data) {
      console.log("API ERROR:", data);
      return;
    }

    if (type === "edit") {
      setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } else {
      setProducts((prev) => [data, ...prev]);
    }

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#293B6080/50] backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[500px] rounded-2xl shadow-xl px-6 py-4 overflow-auto  max-h-[90vh] overflow-y-auto hide-scrollbar"
        >
          <span className=" flex pb-4 justify-between border-b border-[#DCDFE3]">
            <h2 className="text-[16px] font-medium text-[#344054]">
              Add Product
            </h2>
            <IoMdClose
              className="text-[#344054] h-3.5 w-3.5"
              onClick={onClose}
            />
          </span>
          <div className="flex flex-col gap-4">
            <span className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-medium text-sm text-[#344054]"
              >
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </span>
            <span className="flex flex-col gap-2">
              <label
                htmlFor="type"
                className="font-medium text-sm text-[#344054]"
              >
                Product Type
              </label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Type"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </span>

            <span className="flex flex-col gap-2">
              <label
                htmlFor="quantity"
                className="font-medium text-sm text-[#344054]"
              >
                Quantity Stock
              </label>
              <input
                name="quantityStock"
                value={form.quantityStock}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />

              {errors.quantityStock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantityStock}
                </p>
              )}
            </span>

            <span className="flex flex-col gap-2">
              <label
                htmlFor="mrp"
                className="font-medium text-sm text-[#344054]"
              >
                MRP
              </label>
              <input
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
                placeholder="mrp"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.mrp && (
                <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>
              )}
            </span>

            <span className="flex flex-col gap-2">
              <label
                htmlFor="sellingPrice"
                className="font-medium text-sm text-[#344054]"
              >
                Selling Price
              </label>
              <input
                name="sellingPrice"
                value={form.sellingPrice}
                onChange={handleChange}
                placeholder="Selling Price"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.sellingPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sellingPrice}
                </p>
              )}
            </span>

            <span className="flex flex-col gap-2">
              <label
                htmlFor="brandName"
                className="font-medium text-sm text-[#344054]"
              >
                Brand Name
              </label>
              <input
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                placeholder="Brand Name"
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.brandName && (
                <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>
              )}
            </span>

            <span className="flex flex-col gap-2">
              <label
                htmlFor="images"
                className="font-medium text-sm text-[#344054]"
              >
                Upload Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImages}
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}

              {/* preview */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="h-24 mt-4 rounded-lg"
                />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <label
                htmlFor="exchangeEligibility"
                className="font-medium text-sm text-[#344054]"
              >
                Exchange Eligibility
              </label>
              <select
                name="exchangeEligibility"
                value={form.exchangeEligibility}
                onChange={handleChange}
                className="w-full border-2 border-[#DCDFE3] focus:outline-none focus:border-[#07107466]/40 focus:ring-1 focus:ring-[#07107466]/40 rounded-lg p-3"
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
              {errors.exchangeEligibility && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.exchangeEligibility}
                </p>
              )}
            </span>
          </div>

          <div className="flex items-end justify-end pt-4">
            <Button variant={"publish"} className="">
              {type === "edit" ? "Edit" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductModal;
