import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import backgroundImage from "@/assets/background-2.jpg";


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <div
      className="min-h-screen"
      style={{
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <App />
    </div>
  </StrictMode>
);
