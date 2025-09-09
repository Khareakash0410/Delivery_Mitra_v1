import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./component/layout/Layout"
import { ToastContainer } from "react-toastify"
import AddNew from "./pages/AddNew/AddNew"
import Dashboard from "./pages/Dashboard/Dashboard"
import Payments from "./pages/Payments/Payments"
import Vendors from "./pages/Vendors/Vendors"
import LoginPage from "./pages/LoginPage/LoginPage"
import Vendor from "./component/vendor/Vendor"
import ViewRole from "./pages/ViewRole/ViewRole"
import DeliveryAgents from "./pages/DeliveryAgents/DeliveryAgents"
import DeliveryAgent from "./component/delivery/Delivery"

const App = () => {
  return (

    <Router>

     <Routes>

      <Route path="/" element={<Layout />}>
       
       <Route index element={<Dashboard />}/>
       <Route path="vendors" element={<Vendors />}/>
       <Route path="vendor/:id" element={<Vendor />}/>
       <Route path="add-new" element={<AddNew />}/>
       <Route path="payments" element={<Payments />}/>
       <Route path="delivery-agent" element={<DeliveryAgents />}/>
       <Route path="delivery-agent/:id" element={<DeliveryAgent />}/>
       <Route path="view-role" element={<ViewRole />}/>

      </Route>

      <Route path="/login-admin" element={<LoginPage />}/>

     </Routes>

     <ToastContainer theme="colored" position="top-right" hideProgressBar={true} autoClose={3000} limit={1}/>

    </Router>
  )
}

export default App