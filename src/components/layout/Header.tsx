import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
]

export function Header() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    return (
        <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur">
            <div className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-8 px-5 lg:px-8">
                <Link to="/" className="shrink-0 text-[19px] font-medium tracking-display text-ink-900">
                    Land<span className="text-brand-500">&</span>Living
                </Link>

                <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-[14px] transition-colors duration-150 ease-out ${isActive ? 'bg-mist text-ink-900' : 'text-ink-500 hover:text-ink-900'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Link
                        to="/admin"
                        className="hidden rounded-full px-4 py-2 text-[14px] text-ink-500 transition-colors duration-150 ease-out hover:text-ink-900 sm:block"
                    >
                        Admin
                    </Link>
                    <Link
                        to="/contact"
                        className="hidden rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700 sm:block"
                    >
                        Get in touch
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-700 lg:hidden"
                    >
                        {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-line bg-white lg:hidden">
                    <nav aria-label="Mobile" className="mx-auto max-w-[1240px] px-5 py-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) =>
                                    `block rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-mist text-ink-900' : 'text-ink-500'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <Link to="/admin" className="block rounded-xl px-3 py-2.5 text-sm text-ink-500">
                            Admin panel
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
