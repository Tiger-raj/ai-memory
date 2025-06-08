import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      // redirect to dashboard
      navigate("/dashboard");
      console.log("Signin successful:", response.data);
    } catch (error) {
      console.error("Signin failed:", error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-48 p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
        <div className="flex justify-center items-center mt-4">
          <Button loading={false} variant="primary" size="md" text="Sign In" onClick={handleSignin} fullWidth />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Not a user?{" "}
            <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
