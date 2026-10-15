import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Roles from "./pages/Roles";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import AddRole from "./pages/AddRole";
import EditRole from "./pages/EditRole";
import NotFound from "./pages/NotFound";
function MainLayout({ children }) {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        {/* Sidebar */}
        <Sidebar />

        {/* Layout Page */}
        <div className="layout-page">

          {/* Navbar */}
          <Navbar />

          {/* Content Wrapper */}
          <div className="content-wrapper">

            {/* Content */}
            {children}

            {/* Footer */}
            <Footer />

            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Main Application */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
              <Dashboard />
            </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/roles" element={
            <ProtectedRoute>
              <MainLayout>
                <Roles />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/roles/create" element={
            <ProtectedRoute>
              <MainLayout>
                <AddRole />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/roles/:id/edit" element={
            <ProtectedRoute>
              <MainLayout>
                <EditRole />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Unknown URL */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;