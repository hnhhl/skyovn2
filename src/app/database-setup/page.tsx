'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DatabaseInfo } from '@/components/DatabaseInfo'
import { ArrowLeft, Database } from 'lucide-react'

export default function DatabaseSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-800">Database Setup</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/agent/login" className="text-orange-600 hover:text-orange-700">
                Agent Portal
              </Link>
              <Link href="/test-api" className="text-red-600 hover:text-red-700">
                Test API
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Add Agent System to VinaJet Database
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Extend your existing VinaJet Supabase database with the agent commission system.
            This migration adds agent tables, commission tracking, and tier management to your current schema.
          </p>
        </div>

        <DatabaseInfo />

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🚀 Migration Guide
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Access your existing Supabase project's SQL Editor</li>
              <li>Copy the migration SQL from the "Schema" tab above</li>
              <li>Run the migration to add agent tables</li>
              <li>Verify your environment variables are set</li>
              <li>Set <code>NEXT_PUBLIC_USE_SUPABASE=true</code></li>
              <li>Test agent registration and login</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🏗️ Database Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                5-tier agent hierarchy (Starter → Legend)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Automatic commission calculation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Quarterly tracking with grace periods
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Real-time tier promotions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Booking attribution & tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Row-level security (RLS)
              </li>
            </ul>
          </div>
        </div>

        {/* Test Links */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🧪 Test the System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/agent/register">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Register New Agent
              </Button>
            </Link>
            <Link href="/agent/login">
              <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                Login Demo Agent
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Book Test Flight
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Demo agent credentials: <code>agent@example.com</code> (Elite tier with sample data)
          </p>
        </div>
      </div>
    </div>
  )
}
