import { useState } from "react";
import ProductModal from "../components/ProductModel";

export default function EmptyProduct({ setProducts }) {
  const [openModel, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
      <div className="grid grid-cols-2 gap-2 w-fit items-center p-4">
        <div className="h-6 w-6 rounded border-[6px] border-[#071074]"></div>

        <div className="h-6 w-6 rounded border-[6px] border-[#071074]"></div>

        <div className="h-6 w-6 rounded border-[6px] border-[#071074]"></div>

        <div className="flex items-center justify-center text-[#071074] text-5xl font-bold h-7 w-7 -translate-y-[5px]">
          +
        </div>
      </div>
      <h2 className="font-semibold text-xl text-[#344054]">
        Feels a little empty over here...
      </h2>
      <h4 className="text-[#98A2B3] text-[14px] font-normal flex text-center mt-4">
        You can create products without connecting store <br /> you can add
        products to store anytime
      </h4>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-lg mt-6 text-white text-sm font-semibold bg-gradient-to-b from-[#000FB4] to-[#4050FF] py-3 px-23"
      >
        Add your Products
      </button>
      {openModel && (
        <ProductModal
          onClose={() => setOpenModal(false)}
          type={"create"}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
