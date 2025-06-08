import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { SharePage } from "./pages/SharePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<SharePage />} />
        <Route path="/" element={<Signin />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
