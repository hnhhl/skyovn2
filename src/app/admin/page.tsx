export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600">Admin Panel Works!</h1>
      <p className="text-gray-600 mt-2">This is the admin main page.</p>

      <div className="mt-6 space-y-2">
        <div>
          <a href="/admin/dashboard" className="text-blue-600 underline font-medium">
            → Admin Dashboard
          </a>
        </div>
        <div>
          <a href="/admin/test" className="text-blue-600 underline font-medium">
            → Admin Test Page
          </a>
        </div>
        <div>
          <a href="/admin/agents" className="text-blue-600 underline font-medium">
            → Agents Management
          </a>
        </div>
        <div>
          <a href="/admin/booking-hold" className="text-blue-600 underline font-medium">
            → Booking Hold
          </a>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Debug Info:</h3>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server'}</p>
        <p>Page renders successfully!</p>
      </div>
    </div>
  )
}
