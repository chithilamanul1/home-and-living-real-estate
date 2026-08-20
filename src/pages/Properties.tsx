import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { PropertyCard } from '../components/PropertyCard'
import { PageHero } from '../components/PageHero'
import { useProperties } from '../contexts/PropertyContext'
import { PropertyCategory, PropertyStatus } from '../types/property'

const categoryOptions: (PropertyCategory | 'All')[] = [
    'All',
    'House',
    'Apartment',
    'Land Plot',
    'Commercial',
    'Farmhouse',
]

const statusOptions: (PropertyStatus | 'All')[] = ['All', 'For Sale', 'For Rent', 'Sold']

const sortOptions = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
]

const fieldClass = 'rounded-[16px] bg-mist px-4 py-2.5 focus-within:ring-1 focus-within:ring-brand-300'

export function Properties() {
    const { properties, loading } = useProperties()
    const [params, setParams] = useSearchParams()
    const [sort, setSort] = useState('newest')

    const query = params.get('q') ?? ''
    const category = params.get('category') ?? 'All'
    const status = params.get('status') ?? 'All'
    const price = params.get('price') ?? ''

    function setParam(key: string, value: string) {
        const next = new URLSearchParams(params)
        if (!value || value === 'All') next.delete(key)
        else next.set(key, value)
        setParams(next, { replace: true })
    }

    const results = useMemo(() => {
        const [min, max] = price ? price.split('-').map(Number) : [0, Infinity]
        const filtered = properties.filter((p) => {
            if (category !== 'All' && p.category !== category) return false
            if (status !== 'All' && p.status !== status) return false
            if (p.price < min || p.price > max) return false
            if (query) {
                const haystack = `${p.title} ${p.address} ${p.city} ${p.category}`.toLowerCase()
                if (!haystack.includes(query.toLowerCase())) return false
            }
            return true
        })

        return [...filtered].sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price
            if (sort === 'price-desc') return b.price - a.price
            return b.createdAt.localeCompare(a.createdAt)
        })
    }, [properties, category, status, price, query, sort])

    return (
        <>
            <PageHero
                eyebrow="All Properties"
                title="Browse our verified property listings."
                intro="Use the filters below to find what you need. Every property on this page has been checked by our team."
            />

            <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
                <div className="grid gap-2 rounded-[22px] border border-line bg-white p-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
                    <label className={`flex items-center gap-2 ${fieldClass}`}>
                        <SearchIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                        <span className="sr-only">Search properties</span>
                        <input
                            value={query}
                            onChange={(e) => setParam('q', e.target.value)}
                            placeholder="Search by name, city or area"
                            className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
                        />
                    </label>

                    <label className={fieldClass}>
                        <span className="block text-[11px] text-ink-400">Type</span>
                        <select
                            value={category}
                            onChange={(e) => setParam('category', e.target.value)}
                            className="w-full bg-transparent text-sm text-ink-900 outline-none"
                        >
                            {categoryOptions.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </label>

                    <label className={fieldClass}>
                        <span className="block text-[11px] text-ink-400">Status</span>
                        <select
                            value={status}
                            onChange={(e) => setParam('status', e.target.value)}
                            className="w-full bg-transparent text-sm text-ink-900 outline-none"
                        >
                            {statusOptions.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </label>

                    <label className={fieldClass}>
                        <span className="block text-[11px] text-ink-400">Sort by</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full bg-transparent text-sm text-ink-900 outline-none"
                        >
                            {sortOptions.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <p className="mt-6 text-sm text-ink-500" aria-live="polite">
                    {loading
                        ? 'Loading properties…'
                        : `${results.length} ${results.length === 1 ? 'property' : 'properties'} found`}
                </p>

                {loading ? (
                    <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-[400px] animate-pulse rounded-[22px] bg-mist" />
                        ))}
                    </div>
                ) : results.length === 0 ? (
                    <div className="mt-5 rounded-[26px] bg-mist px-6 py-20 text-center">
                        <SlidersHorizontalIcon className="mx-auto h-7 w-7 text-ink-400" aria-hidden="true" />
                        <h2 className="mt-4 text-[20px] font-medium tracking-display text-ink-900">
                            No properties match your search
                        </h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
                            Try changing the price range or property type. We add new listings every week.
                        </p>
                        <button
                            type="button"
                            onClick={() => setParams(new URLSearchParams(), { replace: true })}
                            className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {results.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
