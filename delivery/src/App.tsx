import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Auth from "./pages/Auth/Auth"
import AuthVerify from "./pages/AuthVerify/AuthVerify"
import Landing from "./pages/landingpage/Landing"

const App = () => {
  return (

    <Router>

    <Routes>

     <Route path="/" element={<Layout />}>

      <Route index element={<Landing />}/>

     </Route>

     <Route path="/auth" element={<Auth />}/>

     <Route path="/auth-verify" element={<AuthVerify />}/>

    </Routes>


    </Router>
  )
}

export default App