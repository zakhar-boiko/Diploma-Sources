import { FunctionComponent, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useFetchProfile } from "../../features/profile/api/client";
import { PageLoader } from "../PageLoader/PageLoader";
import Layout from "../Layout/Layout";

const ProtectedRoute: FunctionComponent = ({}) => {
  const { data: user, isLoading, refetch, isError } = useFetchProfile();
  const isLoggedIn = user !== undefined && !isError;

  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/auth/sign-in" replace />
      </>
    );
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default ProtectedRoute;
