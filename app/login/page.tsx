"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #f5f5ff 0%, #eef2ff 50%, #f0f0f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(45, 43, 127, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: "18px",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              background: isLogin ? "#fff" : "#fafafa",
              color: isLogin ? "#2D2B7F" : "#999",
              borderBottom: isLogin ? "3px solid #2D2B7F" : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: "18px",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              background: !isLogin ? "#fff" : "#fafafa",
              color: !isLogin ? "#2D2B7F" : "#999",
              borderBottom: !isLogin ? "3px solid #2D2B7F" : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "36px 32px" }}>
          {/* Logo Area */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <FaUser style={{ color: "#fff", fontSize: "24px" }} />
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 4px 0",
              }}
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                margin: 0,
              }}
            >
              {isLogin
                ? "Sign in to your Sri Saradi Scientific account"
                : "Register for a new account"}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Register-only fields */}
            {!isLogin && (
              <>
                {/* Full Name */}
                <div style={{ marginBottom: "18px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#444",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <span
                      style={{
                        padding: "0 14px",
                        color: "#999",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      style={{
                        flex: 1,
                        padding: "13px 14px 13px 0",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "18px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#444",
                      marginBottom: "6px",
                    }}
                  >
                    Phone Number
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        padding: "0 14px",
                        color: "#999",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      style={{
                        flex: 1,
                        padding: "13px 14px 13px 0",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    padding: "0 14px",
                    color: "#999",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "13px 14px 13px 0",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    color: "#333",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    padding: "0 14px",
                    color: "#999",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  style={{
                    flex: 1,
                    padding: "13px 14px 13px 0",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    color: "#333",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    padding: "0 14px",
                    background: "none",
                    border: "none",
                    color: "#999",
                    cursor: "pointer",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#444",
                    marginBottom: "6px",
                  }}
                >
                  Confirm Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      padding: "0 14px",
                      color: "#999",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    style={{
                      flex: 1,
                      padding: "13px 14px 13px 0",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      padding: "0 14px",
                      background: "none",
                      border: "none",
                      color: "#999",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember me / Forgot password (Login only) */}
            {isLogin && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#666",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      accentColor: "#2D2B7F",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "#2D2B7F",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Terms checkbox (Register only) */}
            {!isLogin && (
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#666",
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      accentColor: "#2D2B7F",
                      width: "16px",
                      height: "16px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  />
                  I agree to the{" "}
                  <a
                    href="/terms-of-service"
                    style={{ color: "#2D2B7F", textDecoration: "underline" }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    style={{ color: "#2D2B7F", textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-submit-btn"
              style={{
                width: "100%",
                padding: "15px",
                background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: "0 4px 16px rgba(45, 43, 127, 0.3)",
              }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              margin: "28px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
            <span style={{ fontSize: "13px", color: "#999" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
          </div>

          {/* Social Login Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              className="social-login-btn"
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#444",
                transition: "all 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              className="social-login-btn"
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#444",
                transition: "all 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Bottom switch */}
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#888",
              marginTop: "24px",
              marginBottom: 0,
            }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#2D2B7F",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
