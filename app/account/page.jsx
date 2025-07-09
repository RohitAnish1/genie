"use client"

import { useState } from "react"
import { User, Package, MapPin, CreditCard, Settings } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "orders", name: "Orders", icon: Package },
    { id: "addresses", name: "Addresses", icon: MapPin },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  const orders = [
    {
      id: "#12345",
      date: "2024-01-15",
      status: "Delivered",
      total: 149.99,
      items: 3,
    },
    {
      id: "#12344",
      date: "2024-01-10",
      status: "Shipped",
      total: 79.99,
      items: 1,
    },
    {
      id: "#12343",
      date: "2024-01-05",
      status: "Processing",
      total: 199.99,
      items: 2,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" defaultValue="John" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Doe" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue="john.doe@example.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" defaultValue="1990-01-01" className="input-field" />
                </div>
                <button type="submit" className="btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order History</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-lg">{order.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-lg font-semibold">${order.total}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Ordered on {order.date}</span>
                      <span>
                        {order.items} item{order.items !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="btn-secondary text-sm">View Details</button>
                      <button className="btn-secondary text-sm">Track Order</button>
                      {order.status === "Delivered" && <button className="btn-secondary text-sm">Reorder</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <button className="btn-primary">Add New Address</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">Home</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">Work</h3>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p>John Doe</p>
                    <p>456 Business Ave</p>
                    <p>New York, NY 10002</p>
                    <p>United States</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <button className="btn-primary">Add New Card</button>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-semibold">**** **** **** 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        MC
                      </div>
                      <div>
                        <p className="font-semibold">**** **** **** 5678</p>
                        <p className="text-sm text-gray-600">Expires 08/26</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>Email notifications for order updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>SMS notifications for shipping updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Marketing emails and promotions</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span>Allow personalized recommendations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Share data with partners for better experience</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <button className="btn-secondary">Change Password</button>
                    <button className="btn-secondary">Download My Data</button>
                    <button className="text-red-600 hover:text-red-800">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
