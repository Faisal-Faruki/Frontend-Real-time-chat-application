import { Routes, Route, Navigate } from 'react-router';
import HomePages from './pages/HomePages';
import PageLoader from './components/PageLoader';
import SignupPages from './pages/SignupPages';
import LoginPages from './pages/LoginPages';
import NotificationPage from './pages/NotificationPage';
import CallPages from './pages/CallPages';
import ChatPages from './pages/ChatPages';
import OnboardingPage from './pages/OnboardingPage';
import { Toaster } from 'react-hot-toast';
import useAuthUser from './hooks/useAuthUser';
import Layout from './components/Layout';
import { useThemeStore } from './store/useThemeStore';


//This is Authenticated App Component code 

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

const {theme} = useThemeStore();

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route 
          path='/' 
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
              <HomePages />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPages />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPages />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
              <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPages />
              
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
               <Layout showSidebar={false}>
              <ChatPages />
              </Layout> 
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      
      <Toaster />
    </div>
  )
}

export default App