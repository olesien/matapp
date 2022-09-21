import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import RequireAuth from "./components/RequireAuth";
import AccessDeniedPage from "./pages/AccessDenied";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyRestaurantsPage from "./pages/MyRestaurantsPage";
import NotFound from "./pages/NotFound";
import RestaurantPage from "./pages/RestaurantPage";
import SignupPage from "./pages/SignupPage";
import SuggestionPage from "./pages/SuggestionPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
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

                <Route path="/suggestion" element={<SuggestionPage />} />

                {/* Protected routes */}

                <Route path="/update-profile" element={
                    <RequireAuth>
                        <UpdateProfilePage />
                    </RequireAuth>
                } />

                <Route path="/my-restaurants" element={
                    <RequireAuth>
                        <MyRestaurantsPage />
                    </RequireAuth>
                } />

                <Route path="/my-restaurants/:id" element={
                    <RequireAuth>
                        <RestaurantPage />
                    </RequireAuth>
                } />
            </Routes>

            <ToastContainer autoClose={3000} />
            <ReactQueryDevtools position="bottom-right" />
        </div>
    );
}

export default App;
