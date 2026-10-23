import type { ReactNode } from 'react'

/** Renders a real link when href is set; otherwise an inert, dimmed "coming soon" element. */
export default function ExtLink({ href, className = '', children }: { href?: string; className?: string; children: ReactNode }) {
  if (!href) return <span aria-disabled="true" title="Coming soon" className={`${className} opacity-50`}>{children}</span>
  const external = /^https?:/.test(href)
  return <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
}
