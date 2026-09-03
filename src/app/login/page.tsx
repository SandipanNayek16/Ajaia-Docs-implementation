import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Ajaia Docs</h1>
          <p className="text-sm text-zinc-500 mt-2">Sign in to your account</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              placeholder="alice@ajaia-demo.com"
              defaultValue="alice@ajaia-demo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              placeholder="••••••••"
              defaultValue="demo-password-123"
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-colors"
          >
            Sign in
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-xs font-medium text-zinc-500 mb-3 text-center uppercase tracking-wider">Demo Accounts</p>
          <div className="space-y-3">
            <div className="rounded-md bg-zinc-50 p-3 text-xs text-zinc-600 border border-zinc-100">
              <span className="font-semibold block mb-1">Alice (Owner)</span>
              Email: alice@ajaia-demo.com<br/>
              Password: demo-password-123
            </div>
            <div className="rounded-md bg-zinc-50 p-3 text-xs text-zinc-600 border border-zinc-100">
              <span className="font-semibold block mb-1">Bob (Collaborator)</span>
              Email: bob@ajaia-demo.com<br/>
              Password: demo-password-123
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
