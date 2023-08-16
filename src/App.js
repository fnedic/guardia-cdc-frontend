import { Header } from "./components/public/Header";
import Register from "./components/public/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/public/LogIn";
import { SignBar } from "./components/public/SignBar";
import Footer from "./components/public/Footer";
import Dashboard from "./components/secured/Dashboard";
import LoggedAppBar from "./components/secured/LoggedAppBar";
import { CssBaseline } from "@mui/material";
import DashAppBar from "./components/secured/DashAppBar";
import ProtocolForm from "./components/secured/ProtocolForm";
import ProtocolView from "./components/secured/ProtocolView";
import UpdateUser from "./components/secured/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<LoggedAppBar />} />
        <Route path="/profile" element={<LoggedAppBar />} />
        <Route path="/dashboard" element={<DashAppBar />} />
        <Route path="/protocolUpload" element={<DashAppBar />} />
        <Route path="/protocol/view" element={<LoggedAppBar />} />
        <Route path="/register" element={<SignBar />} />
        <Route path="/login" element={<SignBar />} />
        <Route path="/update-user/:id" element={<DashAppBar/>} />
        
      </Routes>
      <Routes>
        <Route path="/protocol/view" element={<ProtocolView />} />
        <Route path="/protocolUpload" element={<ProtocolForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/update-user/:id" element={<UpdateUser/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
