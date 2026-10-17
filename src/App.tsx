import { Navigate, Routes,Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import MyComponents from "./pages/component.page";
import AccountInformation from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route 
        path="/login"
        element={<LoginForm/>}
        />
      <Route
      path="/components"
      element={<MyComponents/>}
      />
      <Route 
      path="/profile"
        element={<AccountInformation/>}
      />
    </Routes>
  )
}

export default App;