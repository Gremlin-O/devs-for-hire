
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const YM_ID = 110067332;

  window.addEventListener("hashchange", () => {
    const ym = (window as Window & { ym?: (...args: unknown[]) => void }).ym;
    ym?.(YM_ID, "hit", window.location.href);
  });

  createRoot(document.getElementById("root")!).render(<App />);
  