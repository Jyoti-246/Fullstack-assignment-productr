const NoProduct = ({ status }) => {
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
        No {status} Products
      </h2>
      <h4 className="text-[#98A2B3] text-[14px] font-normal flex text-center mt-4">
        Your {status} Products will appear here <br /> Create your first product
        to publish
      </h4>
    </div>
  );
};

export default NoProduct;
