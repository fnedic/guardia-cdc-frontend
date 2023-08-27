import Register from "./components/public/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/public/Header";
import Footer from "./components/public/Footer";
import Login from "./components/public/Login";
import Dashboard from "./components/secured/Dashboard/Dashboard";
import ProtocolForm from "./components/secured/Protocols/ProtocolForm";
import ProtocolView from "./components/secured/Protocols/ProtocolView";
import UpdateUser from "./components/secured/UpdateUser";
import VideoList from "./components/secured/Protocols/VideoList.js";
import ProtocolList from "./components/secured/Protocols/ProtocolList";
import { Home } from "./components/secured/Home";

function App() {
  
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  console.log(isAdmin);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {isAdmin ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/home" />} />
        )}

        <Route path="/videos" element={<VideoList />} />
        <Route path="/protocol/list" element={<ProtocolList />} />
        <Route path="/protocol/view/:id" element={<ProtocolView />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/protocol/upload" element={<ProtocolForm />} />
        <Route path="/user/update/:id" element={<UpdateUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
