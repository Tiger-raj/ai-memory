import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<Dashboard />} /> {/* Assuming share page is also handled by Dashboard */}
        <Route path="/" element={<Signin />} />
        <Route path="*" element={<Signin />} /> {/* Redirect to 404 page for any unknown routes, create 404 page and replace it here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
