import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from './context/AuthContext';

// Import your existing components
import Navbar from "./component/Navbar/NavBar";
import Footer from "./component/Footer/Footer";

const App = () => {
  const location = useLocation();

  // Check if the current path is /profile
  const isProfilePage = location.pathname === '/profile';

  return (
    <React.Fragment>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {!isProfilePage && (
            <Navbar 
              navClass="navbar-light"
              imglight={false}
            />
          )}
          <Routes>
            {routes.map((route, idx) => (
              <Route path={route.path} element={route.component} key={idx} />
            ))}
          </Routes>
        </Suspense>
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;