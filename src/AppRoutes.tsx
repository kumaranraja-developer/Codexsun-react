import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import NotFound from "./Components/NotFound";
import Admin from "./pages/app/Admin";
import { AuthProvider } from "./pages/auth/AuthContext";

import "animate.css";

// function ProtectedRoute({ children }: { children: ReactNode }) {
//   const { token } = useAuth();
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// }

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/dashboard/:component?"
          element={
            // <ProtectedRoute>
              <Admin />
            // </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
