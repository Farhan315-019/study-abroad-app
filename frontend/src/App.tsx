import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FindUniversity from "./pages/FindUniversity";
import UniversityDetail from "./pages/UniversityDetail";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Countries from "./pages/Countries";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Applications from "./pages/Applications";
import PrintPackage from "./pages/PrintPackage";
import AdminVerify from "./pages/AdminVerify";
import Collaborate from "./pages/Collaborate";
import StudyIn from "./pages/StudyIn";
import HowItWorks from "./pages/HowItWorks";
import VisaGuides from "./pages/VisaGuides";
import SopTemplates from "./pages/SopTemplates";
import Community from "./pages/Community";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";

const STANDALONE_PATHS = ["/login", "/register"];

function AppLayout() {
  const { pathname } = useLocation();
  const standalone = STANDALONE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <>
      {!standalone && <Navbar />}
      <AppRoutes />
      {!standalone && <Footer />}
    </>
  );
}

function AppRoutes() {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/universities" element={<PageTransition><FindUniversity /></PageTransition>} />
        <Route path="/universities/:id" element={<PageTransition><UniversityDetail /></PageTransition>} />
        <Route path="/scholarships" element={<PageTransition><Scholarships /></PageTransition>} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition><Profile /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="/recommendations" element={<PageTransition><Recommendations /></PageTransition>} />
        <Route path="/countries" element={<PageTransition><Countries /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><Chat /></PageTransition>} />
        <Route path="/collaborate" element={<PageTransition><Collaborate /></PageTransition>} />
        <Route path="/study/:country" element={<PageTransition><StudyIn /></PageTransition>} />
        <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
        <Route path="/visa-guides" element={<PageTransition><VisaGuides /></PageTransition>} />
        <Route path="/sop-templates" element={<PageTransition><SopTemplates /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/press" element={<PageTransition><Press /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTransition><Settings /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <PageTransition><Applications /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/print"
          element={
            <ProtectedRoute>
              <PageTransition><PrintPackage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <PageTransition><AdminVerify /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
