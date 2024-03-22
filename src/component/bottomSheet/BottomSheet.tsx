import React from "react";
import Images from "../../static";

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="fixed inset-0 transition-opacity" onClick={toggleSheet}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg sm:rounded-t-2xl rounded-tl-[20px] rounded-tr-[20px]">
        <div
          className="absolute right-[3%] top-[1%]"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <p>X</p>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
