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
import Profile from "./components/secured/Profile";
import { UseUser } from "./hooks/useUser";
import { useEffect, useState } from "react";
import LoadingPage from "./components/public/LoadingPage";
import { UserAppBar } from "./components/secured/UserAppBar";
import { ProtectedRoute } from "./constants/ProtectedRoute";
import { Landing } from "./components/secured/Landing";
import { Home } from './components/secured/Home';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchRole = async () => {
      const user = await UseUser();
      setUser(user);
      setIsLoading(false);
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
      <UserAppBar userRole={user.role} />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute
              redirectTo="/login"
              isAllowed={!!user && user.status === "ACTIVE"}
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/protocol/list" element={<ProtocolList />} />
          <Route path="/protocol/view/:id" element={<ProtocolView />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && user.role === "ADMIN"}
            />
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/protocol/upload" element={<ProtocolForm />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
