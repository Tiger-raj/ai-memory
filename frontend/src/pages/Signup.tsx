import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
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
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSignup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Clear previous errors
    setErrors({
      username: undefined,
      password: undefined,
      general: undefined,
    });
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      setSuccessMessage("Account created successfully! Redirecting to sign in...");

      // Redirect to signin page after successful signup
      setTimeout(() => {
        navigate("/signin");
      }, 2000);

      console.log("Signup successful:", response.data);
    } catch (error: unknown) {
      console.error("Signup failed:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        if (errorData.field) {
          // Field-specific validation error
          setErrors({
            [errorData.field]: errorData.message,
          });
        } else if (errorData.error === "User already exists") {
          setErrors({
            username: "This username is already taken",
          });
        } else {
          setErrors({
            general: errorData.error || errorData.message || "Signup failed",
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
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {errors.general && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 break-words leading-relaxed">{errors.general}</div>}

        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 break-words leading-relaxed">{successMessage}</div>}

        <Input placeholder="Username" ref={usernameRef} error={errors.username} />
        <PasswordInput placeholder="Password" ref={passwordRef} error={errors.password} />

        <div className="text-xs text-gray-600 mx-2 mb-4 leading-relaxed">
          <div>Password must be 6-30 characters with:</div>
          <div>• At least one uppercase letter</div>
          <div>• At least one number</div>
          <div>• At least one special character</div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <Button loading={loading} variant="primary" size="md" text={loading ? "Creating Account..." : "Sign Up"} onClick={handleSignup} fullWidth />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Already a user?{" "}
            <Link to="/signin" style={{ color: "#007bff", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
