import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    ArrowLeftIcon,
    BathIcon,
    BedIcon,
    CalendarIcon,
    CheckIcon,
    MapPinIcon,
    PhoneIcon,
    RulerIcon,
} from 'lucide-react'
import { useProperties } from '../contexts/PropertyContext'
import { formatArea, formatPrice } from '../utils/format'

export function PropertyDetail() {
    const { id } = useParams()
    const { getProperty, loading } = useProperties()
    const property = id ? getProperty(id) : undefined
    const [active, setActive] = useState(0)

    if (loading) {
        return (
            <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
                <div className="h-[420px] animate-pulse rounded-[26px] bg-mist" />
            </div>
        )
    }

    if (!property) {
        return (
            <div className="mx-auto max-w-[1240px] px-5 py-28 text-center lg:px-8">
                <h1 className="text-[30px] font-medium tracking-display text-ink-900">
                    Property not found
                </h1>
                <p className="mt-3 text-sm text-ink-500">
                    This property may have been sold or removed by the owner.
                </p>
                <Link
                    to="/properties"
                    className="mt-7 inline-block rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white hover:bg-ink-700"
                >
                    Back to all properties
                </Link>
            </div>
        )
    }

    const images = property.images.length > 0 ? property.images : ['']

    return (
        <div className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
            <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-sm text-ink-500 transition-colors duration-150 ease-out hover:text-ink-900"
            >
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                All properties
            </Link>

            <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                <div>
                    <div className="overflow-hidden rounded-[26px] bg-mist">
                        <img
                            src={images[active]}
                            alt={property.title}
                            className="aspect-[16/10] w-full object-cover"
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="mt-3 flex gap-3">
                            {images.map((src, i) => (
                                <button
                                    key={src.slice(0, 40) + i}
                                    type="button"
                                    onClick={() => setActive(i)}
                                    aria-label={`View image ${i + 1}`}
                                    aria-current={active === i}
                                    className={`h-20 w-28 overflow-hidden rounded-[14px] transition-opacity duration-150 ease-out ${active === i ? 'ring-2 ring-ink-900' : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="mt-9 flex flex-wrap items-center gap-2 text-[13px] text-ink-500">
                        <span className="rounded-full bg-mist px-3 py-1">{property.status}</span>
                        <span className="rounded-full bg-mist px-3 py-1">{property.category}</span>
                    </div>

                    <h1 className="mt-4 text-[32px] font-medium leading-tight tracking-display text-ink-900 lg:text-[40px]">
                        {property.title}
                    </h1>
                    <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-500">
                        <MapPinIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                        {property.address}, {property.city}
                    </p>

                    <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-4">
                        {[
                            { icon: BedIcon, label: 'Bedrooms', value: String(property.beds) },
                            { icon: BathIcon, label: 'Bathrooms', value: String(property.baths) },
                            {
                                icon: RulerIcon,
                                label: 'Area',
                                value: formatArea(property.area, property.areaUnit),
                            },
                            { icon: CalendarIcon, label: 'Listed on', value: property.createdAt },
                        ].map((item) => (
                            <div key={item.label}>
                                <dt className="flex items-center gap-2 text-[13px] text-ink-400">
                                    <item.icon className="h-4 w-4" aria-hidden="true" />
                                    {item.label}
                                </dt>
                                <dd className="mt-1.5 text-[17px] font-medium text-ink-900">{item.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <section className="mt-10">
                        <h2 className="text-[22px] font-medium tracking-display text-ink-900">
                            About this property
                        </h2>
                        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-500">
                            {property.description}
                        </p>
                    </section>

                    {property.features.length > 0 && (
                        <section className="mt-10">
                            <h2 className="text-[22px] font-medium tracking-display text-ink-900">Features</h2>
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                {property.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2.5 text-sm text-ink-700">
                                        <CheckIcon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div
                        className="rounded-[26px] p-7"
                        style={{ backgroundImage: 'linear-gradient(180deg, #DCEBF7 0%, #F2F7FB 100%)' }}
                    >
                        <p className="text-[13px] text-ink-500">Asking price</p>
                        <p className="mt-1 text-[34px] font-medium tracking-display text-ink-900">
                            {formatPrice(property.price, property.priceSuffix)}
                        </p>

                        <div className="mt-7 flex items-center gap-3 rounded-[18px] bg-white/80 p-3.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-sm font-medium text-white">
                                SP
                            </span>
                            <div>
                                <p className="text-sm font-medium text-ink-900">Seranex Properties Team</p>
                                <p className="text-[12px] text-ink-500">Property advisor</p>
                            </div>
                        </div>

                        <a
                            href="tel:+94112345678"
                            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                        >
                            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                            Call us about this property
                        </a>
                        <Link
                            to="/contact"
                            className="mt-2.5 flex items-center justify-center rounded-full border border-ink-900/15 bg-white/70 px-5 py-3.5 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-white"
                        >
                            Book a visit
                        </Link>
                        <p className="mt-5 text-center text-[12px] text-ink-400">
                            Reference {property.id.toUpperCase()}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
