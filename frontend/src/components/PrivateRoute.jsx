import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./shared/Loader";
import { useState } from "react";

function PrivateRoute({ publicPage = false }) {
  const { user, isLoading } = useSelector((state) => state.auth);
  if (isLoading == null || isLoading) return <Loader />;
  if (publicPage) return user ? <Navigate to={"/"} /> : <Outlet />;
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
