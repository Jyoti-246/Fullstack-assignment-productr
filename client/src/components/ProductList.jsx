import { useState } from "react";
import Button from "./Button";
import { MdDeleteOutline } from "react-icons/md";
import ProductModal from "./ProductModel";
import DeleteModel from "./DeleteModel";
import NoProduct from "./NoProduct";
import { useLocation } from "react-router-dom";

const ProductList = ({ type = "all", products, setProducts }) => {
  const [editModel, setEditModel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  const status = location.pathname === "/publish" ? "published" : "unpublished";

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  // confirm delete
  const confirmDelete = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
    setOpenDelete(false);
  };

  const filteredProducts =
    type === "all"
      ? products
      : products.filter((item) =>
          type === "published"
            ? item.published === true
            : item.published === false,
        );

  if (!products || products.length === 0) {
    return <NoProduct status={status} />;
  }

  const handleToggle = async (id) => {
    const res = await fetch(`http://localhost:5000/products/${id}/publish`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) return;

    setProducts((prev) => prev.map((p) => (p._id === id ? data : p)));
  };

  return (
    <>
      <ul className="grid grid-cols-3 gap-6 items-center px-8 h-[77vh] overflow-y-auto hide-scrollbar">
        {filteredProducts.map((product) => (
          <li
            key={product._id}
            className="flex flex-col text-xl text-black border border-[#DCDFE3] rounded-4 p-4 gap-6"
          >
            <div className="flex overflow-x-auto border w-full justify-center border-[#DCDFE3] rounded-2 bg-[#F8F9FB]">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={product.name}
                  className="h-54 w-54 shrink-0 rounded-lg object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[#000000] text-sm font-semibold">
                {product.name}
              </h1>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Product type-</span>
                <span className="font-light">{product.type}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Quantity Stock-</span>
                <span className="font-light">{product.quantityStock}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">MRP-</span>
                <span className="font-light">{product.mrp}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Selling Price-</span>
                <span className="font-light">{product.sellingPrice}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Brand Name-</span>
                <span className="font-light">{product.brandName}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Total number of images-</span>
                <span className="font-light">{product.totalImages}</span>
              </div>
              <div className="text-[#98A2B3] text-sm flex justify-between">
                <span className="font-medium">Exchange Eligibility-</span>
                <span className="font-light">
                  {product.exchangeEligibility}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant={product.published === true ? "unpublish" : "publish"}
                onClick={() => handleToggle(product._id)}
              >
                {product.published === true ? "unpublish" : "publish"}
              </Button>
              <Button variant={"edit"} onClick={() => setEditModel(true)}>
                Edit
              </Button>
              <Button
                variant={"delete"}
                onClick={() => handleDeleteClick(product)}
              >
                <MdDeleteOutline className="h-6 w-6" />
              </Button>
            </div>
            {editModel === true && (
              <ProductModal
                setProducts={setProducts}
                type={"edit"}
                onClose={() => setEditModel(false)}
                setProducts={setProducts}
                editProduct={product}
              />
            )}
            {openDelete === true && (
              <DeleteModel
                isOpen={openDelete}
                product={selectedProduct}
                onClose={() => setOpenDelete(false)}
                onConfirm={confirmDelete}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
