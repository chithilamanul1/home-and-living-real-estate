import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPinIcon, SearchIcon } from 'lucide-react'
import { PropertyCategory } from '../types/property'

const categories: (PropertyCategory | 'All Types')[] = [
    'All Types',
    'House',
    'Apartment',
    'Land Plot',
    'Commercial',
    'Farmhouse',
]

const priceBands = [
    { label: 'Any price', value: '' },
    { label: 'Up to Rs. 5M', value: '0-5000000' },
    { label: 'Rs. 5M – Rs. 15M', value: '5000000-15000000' },
    { label: 'Rs. 15M – Rs. 50M', value: '15000000-50000000' },
    { label: 'Rs. 50M – Rs. 100M', value: '50000000-100000000' },
    { label: 'Rs. 100M+', value: '100000000-99999999999' },
]

const tabs = ['Buy', 'Rent', 'Commercial'] as const

export function PropertySearchBar() {
    const navigate = useNavigate()
    const [tab, setTab] = useState<(typeof tabs)[number]>('Buy')
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState<string>('All Types')
    const [price, setPrice] = useState('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const params = new URLSearchParams()
        if (location.trim()) params.set('q', location.trim())
        if (category !== 'All Types') params.set('category', category)
        if (price) params.set('price', price)
        if (tab === 'Rent') params.set('status', 'For Rent')
        if (tab === 'Buy') params.set('status', 'For Sale')
        if (tab === 'Commercial') params.set('category', 'Commercial')
        navigate(`/properties?${params.toString()}`)
    }

    return (
        <div className="rounded-[22px] border border-line bg-white p-2 shadow-lift">
            <div className="flex gap-1 px-2 pt-1" role="tablist" aria-label="Search intent">
                {tabs.map((item) => (
                    <button
                        key={item}
                        type="button"
                        role="tab"
                        aria-selected={tab === item}
                        onClick={() => setTab(item)}
                        className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-out ${tab === item ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-900'
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-2 p-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
                <label className="rounded-[16px] bg-mist px-4 py-2.5 focus-within:ring-1 focus-within:ring-brand-300">
                    <span className="block text-[11px] text-ink-400">Location</span>
                    <span className="flex items-center gap-2">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Colombo, Kandy, Galle..."
                            className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
                        />
                        <MapPinIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                    </span>
                </label>

                <label className="rounded-[16px] bg-mist px-4 py-2.5 focus-within:ring-1 focus-within:ring-brand-300">
                    <span className="block text-[11px] text-ink-400">Property type</span>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent text-sm text-ink-900 outline-none"
                    >
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </label>

                <label className="rounded-[16px] bg-mist px-4 py-2.5 focus-within:ring-1 focus-within:ring-brand-300">
                    <span className="block text-[11px] text-ink-400">Price range</span>
                    <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-transparent text-sm text-ink-900 outline-none"
                    >
                        {priceBands.map((band) => (
                            <option key={band.label} value={band.value}>
                                {band.label}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-[16px] bg-ink-900 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                >
                    <SearchIcon className="h-4 w-4" aria-hidden="true" />
                    Search
                </button>
            </form>
        </div>
    )
}
