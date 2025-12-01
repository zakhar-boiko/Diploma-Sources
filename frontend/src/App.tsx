import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./lib/theme/theme";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import GigsPage from "./pages/GigsPage/GigsPage";
import GigPostPage from "./pages/GigPostPage/GigPostPage";
import GigPage from "./pages/GigPage/GigPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import CandidatesPage from "./pages/CandidatesPage/CandidatesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Provider } from 'react-redux';
import { reduxStore } from "./store/store";

const queryClient = new QueryClient();

export const App = () => (
  <Provider store={reduxStore}>
     <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route element={<SignInPage />} path={"sign-in"} />

          <Route element={<SignUpPage />} path={"sign-up"} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users">
            <Route path=":id" element={<UserProfilePage />} />
            <Route path="candidates" element={<CandidatesPage />} />
          </Route>

          <Route path="gigs">
            <Route index element={<GigsPage />} />
            <Route path="add" element={<GigPostPage />} />
            <Route path=":id" element={<GigPage />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  </QueryClientProvider>
  </Provider>
 
);
