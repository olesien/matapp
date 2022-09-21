import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import MyRestaurantsPage from "./pages/MyRestaurantsPage";
import "./assets/scss/App.scss";
import RequireAuth from "./components/RequireAuth";
import RestaurantPage from "./pages/RestaurantPage";
import SuggestionPage from "./pages/SuggestionPage";
import AccessDeniedPage from "./pages/AccessDenied";

function App() {
    return (
        <div id="App">
            <Navigation />

            <Routes>
                {/* Guest routes */}
                <Route path="*" element={<NotFound />} />

                <Route path="/" element={<HomePage />} />

                <Route path="/access-denied" element={<AccessDeniedPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route path="/suggestion" element={<SuggestionPage />} />

                {/* Protected routes */}
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
