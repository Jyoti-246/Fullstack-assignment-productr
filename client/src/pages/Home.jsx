import { useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    (p?.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const publishActive =
    location.pathname === "/" || location.pathname === "/publish";

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex-col">
          <Nav search={search} setSearch={setSearch} />
          <ul className="mt-6 flex gap-6 font-medium text-sm text-[#98A2B3] border-b-2 border-[#DCDFE3] pb-4">
            <li>
              <NavLink
                to="/publish"
                className={() =>
                  `ml-8 pb-4 ${publishActive ? "text-[#344054] font-semibold border-b-2 border-[#0B99FF]" : "hover:text-[#344054] font-semibold hover:border-b-2 hover:border-[#0B99FF]"}`
                }
              >
                Publish
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/unpublish"
                className={({ isActive }) =>
                  `pb-4 ${isActive ? "text-[#344054] font-semibold border-b-2 border-[#0B99FF]" : "hover:text-[#344054] font-semibold hover:border-b-2 hover:border-[#0B99FF]"}`
                }
              >
                Unpublish
              </NavLink>
            </li>
          </ul>

          <div className="p-6">
            <Outlet
              context={{
                products: filteredProducts?.length
                  ? filteredProducts
                  : products,
                setProducts,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
