import Link from 'next/link'
import { ArrowRight, FileText, Share2, Shield, Zap } from 'lucide-react'
import ColourfulText from '@/components/ui/colourful-text'
import { SparklesCore } from '@/components/ui/sparkles'
import { Meteors } from '@/components/ui/meteors'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col relative overflow-hidden">
      {/* Abstract Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/40 blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-100/40 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-zinc-900">Ajaia Docs</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Sign in
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 text-center relative overflow-hidden bg-zinc-950">
        
        {/* Aceternity Animated Background */}
        <div className="w-full absolute inset-0 h-full z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF" 
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 backdrop-blur-md text-sm font-medium text-zinc-300 mb-8 border border-zinc-800">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Now available in early access
          </div>
          
          <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-sans">
            The intelligent <br className="hidden md:block" /> <ColourfulText text="workspace" /> <br /> for your best work.
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
            Write, edit, and share documents effortlessly. Ajaia Docs combines a premium editing experience with robust security to keep your team aligned and moving fast.
          </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            Start writing for free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a 
            href="#features" 
            className="inline-flex items-center justify-center rounded-full bg-white border border-zinc-200 px-8 py-4 text-base font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 transition-colors w-full sm:w-auto"
          >
            Explore features
          </a>
        </div>

        {/* Product Mockup with Meteor Effect */}
        <div className="mt-20 w-full max-w-5xl relative z-10 group">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-teal-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-700 pointer-events-none"></div>

          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl shadow-2xl p-2 sm:p-4 overflow-hidden text-left">
            {/* Window Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/80 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-xs font-mono text-zinc-400">Quarterly-Roadmap-2026.md</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Saved & Synced
                </span>
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900 bg-blue-600 text-[10px] font-semibold text-white flex items-center justify-center">A</div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900 bg-purple-600 text-[10px] font-semibold text-white flex items-center justify-center">B</div>
                </div>
              </div>
            </div>

            {/* Document Editor Mockup Body */}
            <div className="relative rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-6 sm:p-10 min-h-[360px] overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
                  <FileText className="h-3.5 w-3.5" />
                  Engineering Spec & Strategy
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 font-serif">
                  Ajaia Collaborative Workspace
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  Collaborative document workspace with rich-text editing, persistent documents, file import, and role-based sharing.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                    <span>Rich-text editing with seamless document persistence</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
                    <span>Role-based permissions: Owner, Editor, and Viewer security layers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                    <span>Direct text and Markdown file import</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-zinc-700 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-colors"
                  >
                    Open in Editor
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Meteors Effect in Canvas */}
              <Meteors number={30} />
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Everything you need to write</h2>
            <p className="mt-4 text-lg text-zinc-600">Built for speed, collaboration, and security.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
                <Zap className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Lightning Fast</h3>
              <p className="text-zinc-600">Experience a snappy, frictionless editor that auto-saves your work instantly without interrupting your flow.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
                <Share2 className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Secure Sharing</h3>
              <p className="text-zinc-600">Share documents with specific colleagues. Grant precise viewer or editor permissions with just an email.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Enterprise Security</h3>
              <p className="text-zinc-600">Backed by PostgreSQL and Row-Level Security, your data is cryptographically isolated and completely private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-12 text-center">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Ajaia Docs. Designed for the AI era.
        </p>
      </footer>
    </div>
  )
}
