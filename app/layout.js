"use client"; // enable client-side hooks
import { useState, useEffect } from "react";
import "./globals.css";


export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // to avoid flicker

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          // Your /me route returns { user } when authenticated
          setLoggedIn(!!data.user); // loggedIn = true if user exists
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

    async function handleLogout() {
      await fetch("/api/auth/logout", { method: "POST" });
      setLoggedIn(false); // immediately update UI
      window.location.href = "/"; // redirect to home
    }


  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        {/* Header */}
        <header className="bg-blue-700 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="font-bold text-xl">School Portal</h1>
            <div className="space-x-4">
              <a href="/addSchool" className="hover:underline">
                Add School
              </a>
              <a href="/showSchools" className="hover:underline">
                Show Schools
              </a>
              {!loading &&
                (!loggedIn ? (
                  <a href="/login" className="hover:underline">
                    Login
                  </a>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="hover:underline"
                  >
                    Logout
                  </button>
                ))}
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="container mx-auto py-6 flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          © {new Date().getFullYear()} School Portal
        </footer>
      </body>
    </html>
  );
}
