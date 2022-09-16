import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import "./assets/scss/App.scss";

function App() {
    return (
        <div id="App">
            <Navigation />

            <Routes>
                {/* Guest routes */}
                <Route path="*" element={<NotFound />} />

                <Route path="/" element={<HomePage />} />
            </Routes>

            <ToastContainer autoClose={3000} />
            <ReactQueryDevtools position="bottom-right" />
        </div>
    );
}

export default App;
