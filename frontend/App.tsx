import { Route, Routes } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/App.css";

export default function App() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return (
    <ThemeProvider defaultTheme={theme} storageKey="app-theme">
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
