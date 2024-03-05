import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import { CustomNavigationBotom } from "./bottomTab";
import Shop from "../pages/shop";
import Profile from "../pages/profile";
import DetailProduct from "../pages/detailProduct";
import Endow from "../pages/endow";
import QrCode from "../pages/qrCode";
import Cart from "../pages/cart";
import Address from "../pages/address";
import AddAdr from "../pages/address/addAdr";
import HistoryOrder from "../pages/historyOrder";
import Individual from "../pages/individual";

const AppNavigation = () => {
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/detailProduct" element={<DetailProduct />}></Route>
        <Route path="/endow" element={<Endow />}></Route>
        <Route path="/qrCode" element={<QrCode />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/address" element={<Address />}></Route>
        <Route path="/addAdr" element={<AddAdr />}></Route>
        <Route path="/historyOrder" element={<HistoryOrder />}></Route>
        <Route path="/individual" element={<Individual />}></Route>
      </Routes>
      <CustomNavigationBotom />
    </div>
  );
};
export default AppNavigation;
