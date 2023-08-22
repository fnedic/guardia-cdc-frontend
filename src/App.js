import Register from "./components/public/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/public/Header";
import Footer from "./components/public/Footer";
import LogIn from "./components/public/LogIn";
import Dashboard from "./components/secured/Dashboard";
import ProtocolForm from "./components/secured/ProtocolForm";
import ProtocolView from "./components/secured/ProtocolView";
import UpdateUser from "./components/secured/UpdateUser";
import VideoList from "./components/secured/VideoList.js";
import ProtocolList from "./components/secured/ProtocolList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />

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
