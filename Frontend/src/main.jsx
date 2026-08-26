import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading.jsx";
import SocketProvider from "./contexts/SocketContext.jsx";
import NewRideProvider from "./contexts/NewRide.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster theme="system" position="top-right" richColors closeButton />
      <Provider store={store}>
        <NewRideProvider>
          <SocketProvider>
            <PersistGate
              loading={<Loading message={"Fetching Data"} />}
              persistor={persistor}
            >
              <App />
            </PersistGate>
          </SocketProvider>
        </NewRideProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
