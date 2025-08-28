import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker, checkInstallPrompt } from "./utils/sw-registration";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker and check for install prompt
if (import.meta.env.PROD) {
  registerServiceWorker();
  checkInstallPrompt();
}
