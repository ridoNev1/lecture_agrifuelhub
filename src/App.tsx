import "./App.css";
import AuthGuard from "@/components/layout/AuthGuard";
import {
  Billing,
  CompleteProduction,
  ConfirmPickup,
  CostInput,
  CreateOrder,
  Homepage,
  Login,
  Manufacture,
  OrderSummary,
  Profile,
  SplashScreen,
} from "@/pages/export";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/homepage"
          element={
            <AuthGuard>
              <Homepage />
            </AuthGuard>
          }
        />
        <Route
          path="/billing"
          element={
            <AuthGuard>
              <Billing />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path="/detail-order"
          element={
            <AuthGuard>
              <OrderSummary />
            </AuthGuard>
          }
        />
        <Route
          path="/add-order"
          element={
            <AuthGuard>
              <CreateOrder />
            </AuthGuard>
          }
        />
        <Route
          path="/manufacture"
          element={
            <AuthGuard>
              <Manufacture />
            </AuthGuard>
          }
        />
        <Route
          path="/confirm-pickup"
          element={
            <AuthGuard>
              <ConfirmPickup />
            </AuthGuard>
          }
        />
        <Route
          path="/cost-input"
          element={
            <AuthGuard>
              <CostInput />
            </AuthGuard>
          }
        />
        <Route
          path="/complete-production"
          element={
            <AuthGuard>
              <CompleteProduction />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
