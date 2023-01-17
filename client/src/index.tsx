import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//@ts-ignore
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";
import { removeAuthData } from "./features/auth";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
declare global {
  interface Window {
    bc: BroadcastChannel;
  }
}
const bc = new BroadcastChannel("test_channel");
const queryClient = new QueryClient();
window.bc = bc;
bc.onmessage = (event) => {
  let data = event.data;
  if (data.type === "loggedin") {
    // console.log({ data });

    window.location.href = "/";
  }
  if (data.type === "loggedout") {
    // console.log({ data });
    store.dispatch(removeAuthData());
    window.location.href = "/login";

    // localStorage.removeItem('token')
    // window.location.reload()
  }
};
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
