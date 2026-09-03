import { login } from './actions'
import { FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      {/* Left Pane: Branding & Abstract Design */}
      <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-zinc-950 p-12 flex-col justify-between relative overflow-hidden text-white">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="h-6 w-6 text-zinc-950" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Ajaia Docs</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-sm mb-10">
          <h2 className="text-4xl font-medium tracking-tight leading-tight mb-6 text-zinc-100">
            Write,<br />
            Collaborate,<br />
            <span className="text-zinc-400">Ship Faster.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            The intelligent workspace designed for high-performance teams.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-zinc-500 font-medium">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Systems Operational
        </div>
      </div>

      {/* Right Pane: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32 bg-white py-12 md:py-0 relative">
        <div className="w-full max-w-[400px] mx-auto">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="md:hidden flex items-center gap-2 mb-12">
            <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900">Ajaia Docs</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
            <p className="text-zinc-500 text-base">Enter your credentials to access your workspace.</p>
          </div>

          <form action={login} className="space-y-6">
            
            {searchParams.error && (
              <div className="p-3 bg-red-50/50 border border-red-200 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                {searchParams.error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 block" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="alice@ajaia-demo.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-900 block" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 text-white rounded-xl font-medium shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20 active:scale-[0.98] transition-all group"
            >
              Sign In
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <a href="#" className="font-semibold text-zinc-900 hover:underline">
                Request access
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
