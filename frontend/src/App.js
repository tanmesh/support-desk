import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<LogIn />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path='/*' element={<NotFound />} exact />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
