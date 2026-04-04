import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="rounded-2xl bg-brand-card p-8 text-center shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-brand-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold">页面不存在</h1>
      <p className="mt-3 text-brand-subtext">你访问的页面未找到，请返回首页继续游戏。</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-brand-primary px-5 py-3 font-semibold text-white hover:opacity-90"
      >
        返回首页
      </Link>
    </section>
  )
}
