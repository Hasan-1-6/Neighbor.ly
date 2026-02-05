import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";
import isEmail from "validator/lib/isEmail";

const LoginCard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inpField, setInpField] = useState(isAdmin ? "xyz@gmail.com" : "E1001");
  const [passwordField, setPasswordField] = useState("abcd123");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const url = import.meta.env.VITE_APP_BACKEND_URL;

  const { setRole, setLoggedIn, setUser } = useContext(AppContext);

  useEffect(()=>{   
      setInpField(isAdmin ? 'xyz@gmail.com' : 'E1001')
      setPasswordField('abcd123')
  },[isAdmin])

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isEmail(inpField) && isAdmin) {
      toast.error("Enter a valid Email");
      return;
    }
    if (passwordField.length < 6) {
      toast.error("Password is too short");
      return;
    }
    try {
      setIsLoading(true);
      const fetchUrl = isAdmin
        ? `${url}/api/auth/loginAdmin`
        : `${url}/api/auth/loginUser`;
      const resp = await fetch(`${fetchUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: inpField,
          password: passwordField,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message);
        return;
      }

      setUser(data.user);
      setRole(isAdmin ? "admin" : "user");
      setLoggedIn(true);

      toast.success("logged in succesfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0F4FF] to-[#E6F0FF] relative p-5">
      <AnimatedBackground />
      <div className="login-card">
        <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          {/* Outer circle */}
          <div className="absolute w-full h-full rounded-full border-2 border-primary/30 animate-pulse"></div>

          {/* Middle circle */}
          <div
            className="absolute w-[85%] h-[85%] rounded-full border-2 border-primary/50 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          ></div>

          {/* Inner circle with logo */}
          <div className="w-[70%] h-[70%] bg-[#68d388] rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-[0_5px_15px_rgba(104,211,136,0.3)]">
            S
          </div>
        </div>

        <h1 className="font-semibold text-2xl text-dark mb-2">
          Welcome back 👋🏻 {isAdmin ? `Admin` : `Resident`}
        </h1>
        {isAdmin && (
          <p className="text-[15px] text-secondary mb-9 leading-relaxed">
            Sign in to manage your society
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder={isAdmin ? "E-mail" : "ID"}
              required
              autoComplete="email"
              className="field-input"
              value={inpField}
              onChange={(e) => setInpField(e.target.value)}
            />
            <svg
              className="icon-left"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="field-input"
              value={passwordField}
              onChange={(e) => setPasswordField(e.target.value)}
            />
            <svg
              className="icon-left"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <svg
              className="toggle-pass"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              onClick={togglePassword}
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </div>

          {/* <div className="flex justify-start items-center ml-1 mt-3 mb-6 text-sm">
            <label className="text-secondary flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-primary" />
              Remember me
            </label>
          </div> */}


          <button
            type="submit"
            className="login-btn"
            disabled={isLoading || isSuccess}
            style={{
              background: isSuccess ? "#10B981" : "#68d388",
              pointerEvents: isLoading || isSuccess ? "none" : "auto",
            }}
          >
            {isLoading
              ? "Logging in..."
              : isSuccess
                ? "Login Successful!"
                : "Login"}
          </button>
        </form>
        <h1 className="mt-2">
          {isAdmin ? `Not an admin?` : `Not a user?`}{" "}
          <button
            className="underline text-green-500 cursor-pointer hover:scale-105"
            onClick={() => setIsAdmin((prev) => !prev)}
          >
            Click here
          </button>
        </h1>
      </div>
    </div>
  );
};

export default LoginCard;
