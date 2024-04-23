import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from '@/pages/index'
import Session from '@/pages/session'

import { DatabaseProvider } from "./contexts/database";
import { Toaster } from "./components/ui/toaster";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/session",
    element: <Session />,
  },
  {
    path: "/session/:token",
    element: <Session />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DatabaseProvider>
      <RouterProvider router={router} />
      <Toaster />
    </DatabaseProvider>
  </React.StrictMode>
);
