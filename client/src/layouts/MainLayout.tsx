import { Link, Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-brand-primary">
            AI 海龟汤
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
