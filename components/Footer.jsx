// ==========================================
// FOOTER COMPONENT - SITE FOOTER WITH LINKS AND INFO
// ==========================================
// This component provides the main footer for the entire application.
// Contains company information, navigation links, social media links,
// and legal information. Responsive design with multiple column layouts.

// Next.js components for navigation
import Link from "next/link"
// Lucide React icons for social media and contact
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  // ==========================================
  // FOOTER LINKS CONFIGURATION
  // ==========================================
  
  // Quick navigation links
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  // Customer service links
  const customerService = [
    { href: "/help", label: "Help Center" },
    { href: "/returns", label: "Returns" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/track", label: "Track Order" },
  ]

  // Legal and policy links
  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ]

  // Social media links configuration
  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  ]

  return (
    <footer className="bg-blue-900 text-white">
      {/* ========================================== */}
      {/* MAIN FOOTER CONTENT */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ========================================== */}
        {/* RESPONSIVE GRID LAYOUT */}
        {/* ========================================== */}
        {/* 4 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ========================================== */}
          {/* COMPANY INFO SECTION */}
          {/* ========================================== */}
          <div className="space-y-4">
            {/* Company logo/name */}
            <div>
              <h3 className="text-2xl font-bold mb-4">TechStore</h3>
              <p className="text-blue-200">
                Your trusted partner for premium electronics and tech accessories. 
                Quality products, competitive prices, and excellent customer service.
              </p>
            </div>
            
            {/* ========================================== */}
            {/* CONTACT INFORMATION */}
            {/* ========================================== */}
            <div className="space-y-2">
              {/* Email contact */}
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200">info@techstore.com</span>
              </div>
              
              {/* Phone contact */}
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200">+1 (555) 123-4567</span>
              </div>
              
              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200">123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* QUICK LINKS SECTION */}
          {/* ========================================== */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================== */}
          {/* CUSTOMER SERVICE SECTION */}
          {/* ========================================== */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================== */}
          {/* NEWSLETTER SUBSCRIPTION */}
          {/* ========================================== */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-blue-200 mb-4">
              Subscribe to get updates on new products and exclusive deals.
            </p>
            
            {/* Email subscription form */}
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-blue-800 text-white placeholder-blue-300 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SOCIAL MEDIA SECTION */}
        {/* ========================================== */}
        <div className="mt-8 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Social media icons */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                )
              })}
            </div>

            {/* ========================================== */}
            {/* LEGAL LINKS */}
            {/* ========================================== */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* BOTTOM COPYRIGHT BAR */}
      {/* ========================================== */}
      <div className="bg-blue-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
