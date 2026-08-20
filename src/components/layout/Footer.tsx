import React from 'react'
import { Link } from 'react-router-dom'
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

const columns = [
    {
        title: 'Company',
        links: [
            { label: 'About us', to: '/about' },
            { label: 'Our services', to: '/services' },
            { label: 'Contact', to: '/contact' },
            { label: 'Admin panel', to: '/admin' },
        ],
    },
    {
        title: 'Properties',
        links: [
            { label: 'All listings', to: '/properties' },
            { label: 'Houses', to: '/properties?category=House' },
            { label: 'Apartments', to: '/properties?category=Apartment' },
            { label: 'Land plots', to: '/properties?category=Land+Plot' },
        ],
    },
]

export function Footer() {
    return (
        <footer className="bg-white px-3 pb-3 sm:px-4 sm:pb-4">
            <div
                className="overflow-hidden rounded-[26px] px-6 pb-8 pt-14 sm:px-10"
                style={{
                    backgroundImage: 'linear-gradient(0deg, #B7DAF2 0%, #D9EAF6 45%, #F2F7FB 100%)',
                }}
            >
                <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
                    <div>
                        <p className="text-[22px] font-medium tracking-display text-ink-900">
                            Land<span className="text-brand-600">&</span>Living
                        </p>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-700">
                            Your trusted real estate partner in Sri Lanka. We help you buy, sell and rent land,
                            homes and commercial spaces — with clear titles and honest advice.
                        </p>
                    </div>

                    {columns.map((col) => (
                        <div key={col.title}>
                            <h2 className="text-[13px] font-medium text-ink-400">{col.title}</h2>
                            <ul className="mt-4 space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-ink-700 transition-colors duration-150 ease-out hover:text-ink-900"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h2 className="text-[13px] font-medium text-ink-400">Get in touch</h2>
                        <ul className="mt-4 space-y-3 text-sm text-ink-700">
                            <li className="flex gap-3">
                                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                                42 Galle Road, Level 3
                                <br />
                                Colombo 03, Sri Lanka
                            </li>
                            <li className="flex gap-3">
                                <PhoneIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                                <a href="tel:+94112345678" className="hover:text-ink-900">
                                    +94 11 234 5678
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <MailIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                                <a href="mailto:hello@landandliving.lk" className="hover:text-ink-900">
                                    hello@landandliving.lk
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mx-auto mt-12 flex max-w-[1160px] flex-col gap-2 border-t border-white/60 pt-5 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Land and Living Real Estate. All rights reserved.</p>
                    <p>Licensed property broker · Sri Lanka</p>
                </div>
            </div>
        </footer>
    )
}
