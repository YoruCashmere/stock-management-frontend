import { Navigate, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
// import MyComponents from "./pages/component.page";
import AccountInformation from "./pages/Profile";
import AppLayout from "./components/layout/app.layout";
import StockChartTest from "./components/charts/pie/pie.pie";
import SingleProduct from "./pages/singleProduct.page";
// import SingleProduct from "./pages/singleProduct.page";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={<LoginForm />}
      />
      <Route
        path="/profile"
        element={<AccountInformation />}
      />
      <Route element={<AppLayout />}>
        <Route path="/sidebar" element={<StockChartTest></StockChartTest>} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/product" element={<SingleProduct/>} />
      </Route>
    </Routes>
  )
}

export default App;