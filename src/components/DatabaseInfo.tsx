'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Database,
  Server,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  Settings,
  Code,
  Play
} from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase'

export function DatabaseInfo() {
  const [copied, setCopied] = useState('')
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [connectionInfo, setConnectionInfo] = useState<any>(null)

  const supabase = createSupabaseClient()

  useEffect(() => {
    checkSupabaseConnection()
  }, [])

  const checkSupabaseConnection = async () => {
    try {
      // Test Supabase connection
      const { data, error } = await supabase.from('user_profiles').select('count').limit(1)

      if (error) {
        setSupabaseStatus('error')
        setConnectionInfo({ error: error.message })
      } else {
        setSupabaseStatus('connected')
        setConnectionInfo({
          tablesFound: true,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          status: 'Connected successfully'
        })
      }
    } catch (error: any) {
      setSupabaseStatus('error')
      setConnectionInfo({
        error: error.message,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL
      })
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const migrationSQL = `-- Add Agent System to existing VinaJet database
-- Run this migration in your Supabase SQL Editor

-- 1. Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    agent_code TEXT UNIQUE NOT NULL,
    current_tier TEXT NOT NULL DEFAULT 'starter'
        CHECK (current_tier IN ('starter', 'growth', 'prime', 'elite', 'legend')),
    lifetime_tickets INTEGER NOT NULL DEFAULT 0,
    commission_earned DECIMAL(12,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Add agent fields to existing bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS referral_agent_id UUID
    REFERENCES public.agents(id) ON DELETE SET NULL;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS referral_source TEXT
    CHECK (referral_source IN ('login', 'contact_email', 'referral_code'));

-- 3. Create agent commission tracking
CREATE TABLE IF NOT EXISTS public.agent_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    commission_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_commission_eligible BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Continue with full migration...`

  const sampleDataSQL = `-- Sample data for testing
INSERT INTO agents (email, full_name, current_tier, lifetime_tickets, commission_earned) VALUES
('agent@example.com', 'Demo Agent', 'elite', 22, 850000);

-- Add sample bookings and other test data...`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600">Current Database</span>
              <div className="flex items-center gap-2">
                <Badge variant="default">
                  <Server className="h-3 w-3 mr-1" />
                  Supabase
                </Badge>
                {supabaseStatus === 'connected' && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {supabaseStatus === 'error' && (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600">Environment</span>
              <Badge variant="outline">{process.env.NODE_ENV || 'development'}</Badge>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <div className="flex items-center gap-2">
                {supabaseStatus === 'checking' && (
                  <Badge variant="secondary">Checking...</Badge>
                )}
                {supabaseStatus === 'connected' && (
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                )}
                {supabaseStatus === 'error' && (
                  <Badge variant="destructive">Connection Error</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={checkSupabaseConnection}
                  className="h-6 w-6 p-0"
                >
                  🔄
                </Button>
              </div>
            </div>
          </div>

          {connectionInfo && (
            <div className="mt-4">
              {supabaseStatus === 'connected' ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Supabase Connected!</strong> {connectionInfo.status}
                    {connectionInfo.url && (
                      <div className="text-xs text-gray-600 mt-1">
                        URL: {connectionInfo.url}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Connection Failed:</strong> {connectionInfo.error}
                    {connectionInfo.url && (
                      <div className="text-xs mt-1">
                        URL: {connectionInfo.url}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Database Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="environment" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="sample">Sample Data</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
            </TabsList>

            <TabsContent value="environment" className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Environment Variables</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Add these to your <code>.env.local</code> file:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm relative">
                  <code>
                    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br/>
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key<br/>
                    NEXT_PUBLIC_USE_SUPABASE=true
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => copyToClipboard(`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_USE_SUPABASE=true`, 'env')}
                  >
                    {copied === 'env' ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Add Agent System to Existing Database</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Access your existing Supabase project's SQL Editor</li>
                  <li>Verify your project has the basic VinaJet schema (profiles, bookings, etc.)</li>
                  <li>Run the agent system migration from the tabs above</li>
                  <li>Check that agent tables were created successfully</li>
                  <li>Test the connection by refreshing this page</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="schema" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Agent System Migration</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(migrationSQL, 'schema')}
                    >
                      {copied === 'schema' ? (
                        <Check className="h-4 w-4 mr-1 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      Copy SQL
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Run this migration in your existing Supabase database to add agent system:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs max-h-64 overflow-y-auto">
                  <pre>{migrationSQL}</pre>
                </div>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This migration extends your existing VinaJet database. Make sure you have the base schema (profiles, bookings, etc.) before running this.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="sample" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Sample Data</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(sampleDataSQL, 'sample')}
                    >
                      {copied === 'sample' ? (
                        <Check className="h-4 w-4 mr-1 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      Copy SQL
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Insert test data for agents, bookings, and commissions:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs max-h-64 overflow-y-auto">
                  <pre>{sampleDataSQL}</pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="functions" className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Database Functions</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Key functions included in the schema:
                </p>
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-sm">refresh_agent_statistics()</h5>
                    <p className="text-xs text-gray-600">
                      Recalculates all agent statistics, commission totals, and tier eligibility
                    </p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-sm">check_tier_promotions()</h5>
                    <p className="text-xs text-gray-600">
                      Checks and processes automatic tier promotions based on lifetime tickets
                    </p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-sm">update_agent_stats_on_booking_change()</h5>
                    <p className="text-xs text-gray-600">
                      Trigger that automatically updates agent statistics when bookings change
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Quick Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              After setting up the database, test these features:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Agent System</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Register new agent account</li>
                  <li>• Login with demo agent: agent@example.com</li>
                  <li>• View tier progress and commission tracking</li>
                  <li>• Test booking attribution</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">User System</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• User registration and profile creation</li>
                  <li>• OAuth login (Google/Facebook)</li>
                  <li>• Booking management</li>
                  <li>• Commission calculation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
