import { IoMdClose } from "react-icons/io";
import Button from "./Button";

const DeleteModel = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-[#293B6080/50] backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        {" "}
        <div className="bg-white p-6 rounded-lg w-96">
          <span className=" flex justify-between">
            <h2 className="text-[20px] font-semibold text-[#363942]">
              Delete Product
            </h2>
            <IoMdClose
              className="text-[#25282B] h-3.5 w-3.5"
              onClick={onClose}
            />
          </span>

          <p className="mt-3 text-[#344054] text-sm font-semibold">
            Are you sure you really want to delete this Product{" "}
            <span className="font-bold">‘’ CakeZone Walnut Brownie’’ ?</span>?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant={"publish"}
              onClick={() => onConfirm(product._id)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModel;
