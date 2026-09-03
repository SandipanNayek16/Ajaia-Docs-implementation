import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://plnerqnhrtsdwcfgutia.supabase.co',
  'sb_publishable_nZj62yOgUAHbTHZfVk3wZA_VxMZDkFf'
)

async function testLogin() {
  console.log('Attempting to log in as Alice...')
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'alice@ajaia-demo.com',
    password: 'demo-password-123'
  })

  if (error) {
    console.error('Login failed:', error.message)
    process.exit(1)
  } else {
    console.log('Login successful! User ID:', data.user?.id)
  }
}

testLogin()
