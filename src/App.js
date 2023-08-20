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
import ProtocolList from './components/secured/ProtocolList';
import ProtocolDashboard from "./components/secured/ProtocolDashboard.js";
import YouTubeVideos from "./components/secured/YouTubeVideos.js";

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
        <Route path="/dashboard/protocol" element={<DashAppBar />} />
        <Route path="/protocol/upload" element={<DashAppBar />} />
        <Route path="/protocol/view/:id" element={<LoggedAppBar />} />
        <Route path="/protocol/list" element={<LoggedAppBar />} />
        <Route path="/register" element={<SignBar />} />
        <Route path="/login" element={<SignBar />} />
        <Route path="/user/update/:id" element={<DashAppBar/>} />
        <Route path="/videos" element={<LoggedAppBar />} />
        
      </Routes>
      <Routes>
        <Route path="/protocol/view/:id" element={<ProtocolView />} />
        <Route path="/protocol/list" element={<ProtocolList />} />
        <Route path="/dashboard/protocol" element={<ProtocolDashboard />} />
        <Route path="/protocol/upload" element={<ProtocolForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user/update/:id" element={<UpdateUser/>} />
        <Route path="/videos" element={<YouTubeVideos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
