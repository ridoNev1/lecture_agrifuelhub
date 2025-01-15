import "./App.css";
import {
  Billing,
  ConfirmPickup,
  CreateOrder,
  Homepage,
  Login,
  Manufacture,
  OrderSummary,
  Profile,
  SplashScreen,
} from "./pages/export";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/billing" element={<Billing />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/detail-order" element={<OrderSummary />}></Route>
        <Route path="/add-order" element={<CreateOrder />}></Route>

        <Route path="/manufacture" element={<Manufacture />}></Route>
        <Route path="/confirm-pickup" element={<ConfirmPickup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
