const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const styles = {
    publish:
      "bg-gradient-to-b from-[#000FB4] to-[#4050FF] text-white px-11 py-3",

    unpublish:
      "bg-[#52D407] text-white border border-[#37C100] text-white px-11 py-3",

    edit: "bg-white text-[#344054] border border-[#344054] px-14 py-3",

    delete: "bg-white text-[#98A2B3] border border-[#D4D4D4] px-3 py-2.5",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl text-sm font-semibold flex items-center justify-center ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
