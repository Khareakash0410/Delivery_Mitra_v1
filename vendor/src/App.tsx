import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/layout"
import { ToastContainer } from "react-toastify"
import Login from "./pages/Login/Login"
import ProductSection from "./pages/Products/Products"
import Dashboard from "./pages/Dashboard/Dashboard"
import EditProduct from "./pages/EditProduct/EditProduct"
import OrdersSection from "./pages/Order/Order"
import OrderView from "./pages/OrderView/OrderView"
import Payments from "./pages/Payments/Payments"
import Setting from "./pages/Settings/Setting"
import AddProduct from "./pages/AddProduct/AddProduct"


function App() {

  return (
    <Router>

      <Routes>
      
      <Route path="/" element={<Layout />}>

        <Route index element={<Dashboard />}/>
        <Route path="products" element={<ProductSection />}/>
        <Route path="product/edit" element={<EditProduct />}/>
        <Route path="orders" element={<OrdersSection />}/>
        <Route path="orders/:id" element={<OrderView />}/>
        <Route path="payments" element={<Payments />}/>
        <Route path="settings" element={<Setting />}/>
        <Route path="product-add" element={<AddProduct />}/>
        
      </Route>      

      <Route path="/login" element={<Login />}/>

      </Routes>

      <ToastContainer theme="colored" position="top-right" hideProgressBar={true} autoClose={3000} limit={1} />

    </Router>
  )
}

export default App