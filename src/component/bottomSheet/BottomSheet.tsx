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
      className="relative inset-0 z-[1000] overflow-hidden w-full overflow-x-hidden "
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="fixed inset-0 transition-opacity " onClick={toggleSheet}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white shadow-lg sm:rounded-t-2xl rounded-tl-[20px] rounded-tr-[20px] max-h-[50%] w-full overflow-hidden ">
        <div
          className="absolute right-[3%] top-[3%] "
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <img src={Images.iconClose} className="w-5 h-5 object-contain" />
        </div>
        <div className="p-4 pt-[20px]  overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
