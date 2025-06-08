import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({
    username: undefined,
    password: undefined,
    general: undefined,
  });
  const [loading, setLoading] = useState(false);

  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Clear previous errors
    setErrors({
      username: undefined,
      password: undefined,
      general: undefined,
    });
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      // redirect to dashboard
      navigate("/dashboard");
      console.log("Signin successful:", response.data);
    } catch (error: unknown) {
      console.error("Signin failed:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        if (errorData.field) {
          // Field-specific validation error
          setErrors({
            [errorData.field]: errorData.message,
          });
        } else if (errorData.error === "Invalid username or password") {
          setErrors({
            general: "Invalid username or password. Please check your credentials and try again.",
          });
        } else {
          setErrors({
            general: errorData.error || errorData.message || "Signin failed",
          });
        }
      } else {
        setErrors({
          general: "Network error. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl w-96 p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {errors.general && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 break-words leading-relaxed">{errors.general}</div>}

        <Input placeholder="Username" ref={usernameRef} error={errors.username} />
        <PasswordInput placeholder="Password" ref={passwordRef} error={errors.password} />

        <div className="flex justify-center items-center mt-4">
          <Button loading={loading} variant="primary" size="md" text={loading ? "Signing In..." : "Sign In"} onClick={handleSignin} fullWidth />
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
