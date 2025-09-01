import "./globals.css";

export const metadata = {
  title: "School Management",
  description: "Web Dev Assignment - Add and Show Schools",
};

export default function RootLayout({ children }) {
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
              <a href="/addSchool" className="hover:underline ">
                Add School
              </a>
              <a href="/showSchools" className="hover:underline">
                Show Schools
              </a>
            </div>
          </nav>
        </header>

        {/* Main content takes available space */}
        <main className="container mx-auto py-6 flex-grow ">{children}</main>

        {/* Footer sticks at bottom */}
        <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 left-0 w-full">
          © {new Date().getFullYear()} School Portal
        </footer>
      </body>
    </html>
  );
}
