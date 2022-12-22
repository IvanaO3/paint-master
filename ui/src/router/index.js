import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PainView } from "../view/PainView";
import { Login } from "../view/Login";
import { Register } from "../view/Register";
import { Board } from "../view/Board";
import { ProtectedRoute } from "./ProtectedRoute";
import { App } from "../view/App";

export const Router = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <PainView />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
