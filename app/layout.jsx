// ==========================================
// ROOT LAYOUT COMPONENT - GLOBAL APP WRAPPER
// ==========================================
// This is the root layout that wraps all pages in the application.
// It provides global styling, context providers, and navigation structure.
// Uses Inter font for consistent typography across the application.

// Google Fonts import for typography
import { Inter } from "next/font/google"
// Global CSS styles
import "./globals.css"
// Navigation components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
// Client-side context providers (Cart context, etc.)
import ClientProviders from "@/components/ClientProviders"

// ==========================================
// FONT CONFIGURATION
// ==========================================
// Configure Inter font with Latin subset for optimal loading
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    // HTML document structure with language attribute for accessibility
    <html lang="en">
      <body 
        className={inter.className} 
        // Suppress hydration warning for browser extensions that modify DOM
        suppressHydrationWarning={true}
      >
        {/* ========================================== */}
        {/* GLOBAL CONTEXT PROVIDERS */}
        {/* ========================================== */}
        {/* Wrap app with client-side providers (Cart context, etc.) */}
        <ClientProviders>
          {/* ========================================== */}
          {/* MAIN APPLICATION STRUCTURE */}
          {/* ========================================== */}
          {/* Flexbox layout: header, main content, footer */}
          <div className="min-h-screen flex flex-col">
            {/* ========================================== */}
            {/* GLOBAL NAVIGATION HEADER */}
            {/* ========================================== */}
            <Navbar />
            
            {/* ========================================== */}
            {/* MAIN CONTENT AREA */}
            {/* ========================================== */}
            {/* flex-1 makes main content expand to fill available space */}
            <main className="flex-1">{children}</main>
            
            {/* ========================================== */}
            {/* GLOBAL FOOTER */}
            {/* ========================================== */}
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
