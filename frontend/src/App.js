// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'
import SchedulePage from './pages/SchedulePage/SchedulePage';
import MenuPage from './pages/MenuPage/MenuPage'
import FeedbackPage from './pages/FeedbackPage/FeedbackPage'
import OrderingPage from './pages/OrderingPage/OrderingPage'
import RecipesPage from "./pages/RecipesPage/RecipesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/feedback' element={<FeedbackPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/profile' element={<PrivateRoute> (<ProfilePage />) </PrivateRoute>} />
        <Route path='/profile/edit' element={<PrivateRoute> (<EditProfilePage />) </PrivateRoute>} />
        <Route path='/menu/recipes' element={<PrivateRoute> (<RecipesPage />) </PrivateRoute>} />
        <Route path='/inventory' element={<PrivateRoute> (<OrderingPage />) </PrivateRoute>} />
        <Route path='/schedule' element={<PrivateRoute> (<SchedulePage />) </PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
