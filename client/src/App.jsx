import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./Signup";
import { SavedPasswords } from "./SavedPasswords";
import Otp from "./GenerateOTP";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UpcomingBikes from "./pages/upcomingBikes/UpcomingBikes";
import AvailableBikes from "./pages/availableBikes/AvailablesBikes";
import BikeAccessories from "./pages/bikeAccessories/BikeAccessories";
import ServiceRecords from "./pages/serviceRecords/ServiceRecords";
import BikeDetails from "./pages/bikeDetails/BikeDetails";
import EnquiryPage from "./pages/enquiry/EnquiryPage";
import OrderForm from "./pages/order/OrderForm";
import TrackOrder from "./pages/track/TrackOrders";
import ScrollToTop from "./ScrollToTop";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const NAVBAR_ITEMS = [
  { text: "home", path: "/home", component: <HomePage /> },
  { text: "About", path: "/about", component: <AboutPage /> },
  { text: "contact", path: "/contact", component: <ContactPage /> },
  { text: "place order", path: "/orderform", component: <OrderForm /> },
  { text: "Track", path: "/track", component: <TrackOrder /> },
  { text: "profile", path: "/profile", component: <ProfilePage /> },
];

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/forgot", "/passwords"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <> 
   
      <Routes>
      
        <Route index element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="passwords" element={<SavedPasswords />} />
        <Route path="forgot" element={<Otp />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />        
      </Routes>
     
      <ScrollToTop />
      {showNavbar && (
        <div className="app">
          <NavBar ITEMS={NAVBAR_ITEMS} setActivePageIndex={setActivePageIndex} />
          <div className="main-container">
            <Routes>
              {NAVBAR_ITEMS.map((item, index) => (
                <Route key={index} path={item.path} element={item.component} />
              ))}
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/upcoming-bikes" element={<UpcomingBikes />} />
              <Route path="/available-bikes" element={<AvailableBikes />} />
              <Route path="/bike-accessories" element={<BikeAccessories />} />
              <Route path="/service-records" element={<ServiceRecords />} />
              <Route path="/bike-details/:slug" element={<BikeDetails />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
