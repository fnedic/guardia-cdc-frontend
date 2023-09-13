import Register from "./components/public/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Profile from "./components/secured/Profile";
import { UseRole } from "./hooks/useRole";
import { useEffect, useState } from "react";
import LoadingPage from "./components/public/LoadingPage";
import { UserAppBar } from "./components/secured/UserAppBar";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Agrega un estado para el indicador de carga
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Llama a la función async y espera la respuesta antes de actualizar el estado
    const fetchRole = async () => {
      const userRole = await UseRole();
      setRole(userRole);
      setIsLoading(false); // Cuando se completa la carga, actualiza isLoading
    };

    fetchRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Header />
      <UserAppBar userRole={role}/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {role === "ADMIN" ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/protocol/list" />} />
        )}

        <Route path="/videos" element={<VideoList />} />
        <Route path="/protocol/list" element={<ProtocolList />} />
        <Route path="/protocol/view/:id" element={<ProtocolView />} />
        <Route path="/protocol/upload" element={<ProtocolForm />} />
        <Route path="/user/update/:id" element={<UpdateUser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
