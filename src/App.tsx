import MainLayout from "@/layout/MainLayout";
import { ToastProvider } from "./contexts/ToastContext";
function App() {
  return (
    <div>
      <ToastProvider>
        <MainLayout />
      </ToastProvider>
    </div>
  );
}

export default App;
