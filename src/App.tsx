import { Navigate, Routes,Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import MyComponents from "./pages/component.page";
import AccountInformation from "./pages/Profile";
// import SidebarRail from "./components/sidebar/rails.sidebar";
import Sidebar from "./components/sidebar/sidebar.sidebar";
import SidebarNavigator from "./components/sidebar/navigator.sidebar";
import Logo from "./components/sidebar/logo.sidebar";

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
      <Route
        path="/sidebar"
        element={<Sidebar expanded={true}/>}
      />
       <Route
        path="/sidebarNavigator"
        element={<SidebarNavigator expanded={true} />}
      /> 
       <Route
        path="/logo"
        element={<Logo expanded={true} />}
      /> 
    </Routes>
  )
}

export default App;