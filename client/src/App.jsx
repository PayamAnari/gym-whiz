import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser/CreateUser";
import UserList from "./pages/User/UserList";
import CreateGym from "./pages/Gym/CreateGym";
import GymDetail from "./pages/Gym/GymDetail";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import GymPage from "./pages/GymsPage/GymsPage";
import { GymProvider } from "./contexts/GymContext";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile/Profile";
import FavoriteGyms from "./pages/FavoriteGyms/FavoriteGyms";
import OurStoryDetail from "./components/OurStory/OurStoryDetail";
import Tips from "./pages/Tips/Tips";

const App = () => {
  return (
    <>
      <GymProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gyms" element={<GymPage />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/gym/create" element={<CreateGym />} />
            <Route path="/gym/:id" element={<GymDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<FavoriteGyms />} />
            <Route path="/our-story-detail" element={<OurStoryDetail />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </GymProvider>
    </>
  );
};

export default App;
