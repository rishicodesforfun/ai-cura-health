import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import Index from "./pages/Index";
import Results from "./pages/Results";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Login from "./pages/Login";

function App() {
  const { toast } = useToast();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;