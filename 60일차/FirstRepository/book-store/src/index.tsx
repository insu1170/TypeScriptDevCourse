import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { state, ThemeContext } from "./context/themeContext";

async function mountApp() {
  // worker start 후 마운트 시키기 위해 async로 감싼 mountApp 안에 베치해준다.
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mock/browser");
    await worker.start({
      onUnhandledRequest: "warn",
    });
  }
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      {/* ThemeContext 내부에 있는 컴포넌트들은 ThemeContext의 값을 사용할 수 있다. */}
      <ThemeContext.Provider value={state}>
        <App />
      </ThemeContext.Provider>
    </React.StrictMode>,
  );
}
mountApp();
