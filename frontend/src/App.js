import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./component/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

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
            <Route path='/new-ticket' element={<PrivateRoute />} exact >
              <Route path='/new-ticket' element={<NewTicket />} exact />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />} exact >
              <Route path='/tickets' element={<Tickets />} exact />
            </Route>
            <Route path='/ticket' element={<PrivateRoute />} exact >
              <Route path='/ticket/:ticketId' element={<Ticket />} exact />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
