import { useState, useEffect } from "react";
import EmptyProduct from "../components/EmptyProduct";
import Nav from "../components/Nav";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import ProductModal from "../components/ProductModel";
import { FaPlus } from "react-icons/fa6";
import { useMemo } from "react";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      (p?.name || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Nav search={search} setSearch={setSearch} />

          <div className="p-8 flex justify-between">
            <h1 className="font-semibold text-xl text-[#344054]">Products</h1>
            <button
              onClick={() => setOpenModal(true)}
              className="flex gap-2 items-center"
            >
              <span className="text-[#98A2B3] text-lg flex items-center">
                <FaPlus />
              </span>
              <span className="text-xl font-normal text-[#344054]">
                Add Products
              </span>
            </button>
          </div>
          {openModal && (
            <ProductModal
              onClose={() => setOpenModal(false)}
              type={"create"}
              setProducts={setProducts}
            />
          )}
          {products.length > 0 ? (
            <ProductList
              type={"all"}
              products={filteredProducts.length ? filteredProducts : products}
              setProducts={setProducts}
            />
          ) : (
            <EmptyProduct setProducts={setProducts} />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
