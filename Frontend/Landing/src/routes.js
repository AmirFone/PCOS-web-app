import React from 'react';
import Layout1 from "./pages/Layout1/Layout1";
import Login from "./component/Login";
import Profile from "./component/Profile";
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const routes = [
  { path: "/", component: <Layout1 /> },
  { path: "/features", component: <Layout1 /> }, // You might want to create separate components for these
  { path: "/success", component: <Layout1 /> },
  { path: "/resources", component: <Layout1 /> },
  { path: "/contact", component: <Layout1 /> },
  { path: "/login", component: <Login /> },
  { path: "/profile", component: <RequireAuth><Profile /></RequireAuth> },
];

export default routes;