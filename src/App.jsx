import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import RequireAuth from "./components/RequireAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";
import AccessDeniedPage from "./pages/AccessDenied";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import AdminRestaurantsPage from "./pages/AdminRestaurants";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminRestaurantImagesPage from "./pages/AdminRestaurantImagesPage";
import "./assets/scss/App.scss";

function App() {
    return (
        <div id="App">
            <Navigation />

            <Routes>
                {/* Guest routes */}

                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/access-denied" element={<AccessDeniedPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected routes */}

                {/* User routes */}

                <Route
                    path="/update-profile"
                    element={
                        <RequireAuth>
                            <UpdateProfilePage />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/create-restaurant"
                    element={
                        <RequireAuth>
                            <CreateRestaurantPage />
                        </RequireAuth>
                    }
                />

                {/* Admin routes */}
                <Route
                    path="/admin-restaurants"
                    element={
                        <RequireAdminAuth>
                            <AdminRestaurantsPage />
                        </RequireAdminAuth>
                    }
                />
                <Route
                    path="/admin-restaurant-images"
                    element={
                        <RequireAdminAuth>
                            <AdminRestaurantImagesPage />
                        </RequireAdminAuth>
                    }
                />
                <Route
                    path="/admin-users"
                    element={
                        <RequireAdminAuth>
                            <AdminUsersPage />
                        </RequireAdminAuth>
                    }
                />
            </Routes>

            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default App;
