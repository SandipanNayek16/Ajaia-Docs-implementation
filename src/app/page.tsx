import Link from 'next/link'
import { ArrowRight, FileText, Share2, Shield, Zap } from 'lucide-react'
import ColourfulText from '@/components/ui/colourful-text'
import { SparklesCore } from '@/components/ui/sparkles'
import * as motion from 'motion/react-client'

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
        <motion.img
          src="https://assets.aceternity.com/linear-demo.webp"
          alt=""
          className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }} 
        />

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

        {/* Product Mockup Image Placeholder */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-zinc-800 bg-black/50 backdrop-blur-sm shadow-2xl p-2 sm:p-4 rotate-1 hover:rotate-0 transition-transform duration-500 relative z-10">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm overflow-hidden aspect-[16/9] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-black"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-zinc-600 gap-4">
              <FileText className="h-16 w-16" />
              <p className="font-medium text-lg text-zinc-400">Beautiful editing interface</p>
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
