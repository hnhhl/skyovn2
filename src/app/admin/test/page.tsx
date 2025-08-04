'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function AdminTestPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Not logged in</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Test Page</h1>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>

      {user.role === 'admin' ? (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800">✅ You have admin access!</p>
          <a href="/admin/dashboard" className="text-blue-600 underline">Go to Dashboard</a>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p className="text-red-800">❌ You need admin role to access admin panel</p>
        </div>
      )}
    </div>
  )
}
