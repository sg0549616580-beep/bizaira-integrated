import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import CreatePage from "./pages/CreatePage";
import DashboardPage from "./pages/DashboardPage";
import AIMessagesPage from "./pages/AIMessagesPage";
import BusinessAnalyticsPage from "./pages/BusinessAnalyticsPage";
import TimeOptimizerPage from "./pages/TimeOptimizerPage";
import ProductPhotoStudioPage from "./pages/ProductPhotoStudioPage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import JournalPage from "./pages/JournalPage";

const App = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/create/product-photos" element={<ProductPhotoStudioPage />} />
      <Route path="/create/messages" element={<AIMessagesPage />} />
      <Route path="/create/analytics" element={<BusinessAnalyticsPage />} />
      <Route path="/create/time" element={<TimeOptimizerPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/accessibility" element={<AccessibilityStatement />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppLayout>
);

export default App;
