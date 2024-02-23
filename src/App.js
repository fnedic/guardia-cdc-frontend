import Register from "./components/public/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/public/Header";
import {Footer} from "./components/public/Footer";
import Login from "./components/public/Login";
import ProtocolForm from "./components/secured/Protocols/ProtocolForm";
import ProtocolView from "./components/secured/Protocols/ProtocolView";
import UpdateUser from "./components/secured/Dashboard/UpdateUser";
import VideoList from "./components/secured/Protocols/VideoList.js";
import ProtocolList from "./components/secured/Protocols/ProtocolList";
import Profile from "./components/secured/Profile";
import { UseUser } from "./hooks/useUser";
import { useEffect, useState } from "react";
import LoadingPage from "./components/public/LoadingPage";
import { UserAppBar } from "./components/secured/UserAppBar";
import { ProtectedRoute } from "./constants/ProtectedRoute";
import { Landing } from "./components/secured/Landing";
import { Home } from "./components/secured/Home";
import Dashboard from "./components/secured/Dashboard/Dashboard";
import UpdateVideo from "./components/secured/Dashboard/UpdateVideo";
import ProceduresList from "./components/secured/Protocols/ProceduresList";
import NotFound from "./components/public/NotFound";
import HomeCalendar from "./components/secured/Calendar/HomeCalendar";
import Events from "./components/secured/Calendar/Events.js";
import AdminRequestedChanges from "./components/secured/Calendar/AdminRequestedChanges.js";

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
        <Route path="*" element={<NotFound/>} />
        <Route
          element={
            <ProtectedRoute
              redirectTo="/landing"
              isAllowed={!!user && user.status === "ACTIVE"}
            />
          }
        >
          <Route path="/home" element={<Home userRole={user.role} />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/protocol/list" element={<ProtocolList />} />
          <Route path="/procedure/list" element={<ProceduresList />} />
          <Route path="/protocol/view/:id" element={<ProtocolView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Events />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && user.role === "ADMIN"}
            />
          }
        >
          <Route path="/admin/data" element={<Dashboard />} />
          <Route path="/protocol/upload" element={<ProtocolForm />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />
          <Route path="/video/update/:id" element={<UpdateVideo />} />
          <Route path="/admin/calendar" element={<HomeCalendar />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/admin/requested-changes" element={<AdminRequestedChanges/>} />
        </Route>
      </Routes>
      <Footer userRole={user.role}/>
    </BrowserRouter>
  );
}

export default App;