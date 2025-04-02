import { Route, Routes } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/App.css";
import { Toaster } from "@/components/Toaster";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { isServerRunning } from "@/lib/utils";
import useLocalStorage from "use-local-storage";

export default function App() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [loading, setLoading] = useState(false);
  const [url] = useLocalStorage("server-url", "http://127.0.0.1:6061");

  useEffect(() => {
    let isMounted = true;

    const work = async () => {
      if (!isMounted) return;

      const running = await isServerRunning(`${url}/api/ping`);
      if (!running) {
        setLoading(true);
      }

      if (isMounted) {
        setTimeout(work, 1000);
      }
    };

    work();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <ThemeProvider defaultTheme={theme} storageKey="app-theme">
      <>
        {loading ? <LoadingScreen onDone={() => setLoading(false)} /> : null}
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
        <Toaster />
      </>
    </ThemeProvider>
  );
}
