import { Navigate, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import MyComponents from "./pages/component.page";
import AccountInformation from "./pages/Profile";
import Sidebar from "./components/sidebar/sidebar.sidebar"
// import "/App.css"

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
        path="/components"
        element={<MyComponents />}
      />
      {/* <Route
        path="/profile"
        element=
      /> */}
      <Route
        path="/sidebar"
        element={
          <div className="flex h-screen w-screen gap-6 bg-page p-6">
            <Sidebar />
            <main className="flex-1 rounded-3xl bg-shell p-6 h-screen">{<AccountInformation />}</main>
          </div>
        }
      />

    </Routes>
  )
}

export default App;