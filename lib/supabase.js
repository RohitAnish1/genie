// ==========================================
// SUPABASE CLIENT CONFIGURATION
// ==========================================
// This file configures and exports the Supabase client for database operations.
// Supabase provides PostgreSQL database, authentication, real-time subscriptions,
// and storage capabilities for the application.

// Import Supabase client creation function
import { createClient } from '@supabase/supabase-js'

// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================
// Retrieve Supabase configuration from environment variables
// These should be set in .env.local file and Vercel environment variables

// Supabase project URL - unique to your project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// Anonymous/public key - safe to expose in client-side code
// Used for public operations like reading product data
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ==========================================
// SUPABASE CLIENT INSTANCE
// ==========================================
// Create and export the configured Supabase client
// This client handles all database operations throughout the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ==========================================
// USAGE EXAMPLES
// ==========================================
// Import and use this client in components:
// import { supabase } from '@/lib/supabase'
// 
// Fetch products:
// const { data, error } = await supabase.from('products').select('*')
//
// Insert data:
// const { data, error } = await supabase.from('products').insert([{ name: 'Product' }])
//
// Real-time subscriptions:
// supabase.from('products').on('INSERT', handleInsert).subscribe()

// ==========================================
// CONFIGURATION NOTES
// ==========================================
// - URL and key must be prefixed with NEXT_PUBLIC_ to be accessible in browser
// - Row Level Security (RLS) should be configured in Supabase dashboard
// - Image storage configured to allow public access for product images
// - Database schema includes products table with id, name, price, image_url fields
