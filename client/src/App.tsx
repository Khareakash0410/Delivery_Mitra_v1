import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Toaster } from "sonner";
import OTPVerify from "./pages/OtpVerification/OTP";
import Auth from "./pages/Auth/Auth";
import ProductDetails from "./components/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import CollectionPage from "./pages/Collections/CollectionPage";
import Layout from "./layout/layout/Layout";
import { useEffect, useState } from "react";
import Modal from "./components/ProductForUserModal/Modal";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import UserAccount from "./pages/AccountPage/Account";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import OrderHistory from "./components/AccountInfo/OrderHistory";
import WishlistProduct from "./components/AccountInfo/WishlistProduct";


function App() {

  const [showModal, setShowModal] = useState(false);


 useEffect(() => {
    const lastShown = localStorage.getItem("modalLastShown");
    const now = Date.now();
    if (!lastShown || now - Number(lastShown) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem("modalLastShown", String(Date.now()));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);



  return (
    <Router>

      {showModal && (<Modal onClose={() => setShowModal(false)}/>)}

      <Routes>

       <Route path="/" element={<Layout />}>

         <Route index element={<Homepage />}/>

         <Route path="auth" element={<Auth />}/>

         <Route path="verify-otp" element={<OTPVerify />}/>

         <Route path="product/:id" element={<ProductDetails />}/>

         <Route path="collections/:category" element={<CollectionPage />}/>

         <Route path="order/details" element={<OrderPage />}/>

         <Route path="order/confirmation" element={<OrderConfirmation />}/>

         <Route path="user/account" element={<UserAccount />}/>

         <Route path="user/account/update" element={<AccountInfo />}/>

         <Route path="user/account/orders" element={<OrderHistory />}/>

         <Route path="user/account/wishlist" element={<WishlistProduct />}/>

       </Route>

      </Routes>

      <Toaster position="top-right"/>

    </Router>
  )
}

export default App        