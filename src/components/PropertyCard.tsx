import React from 'react'
import { Link } from 'react-router-dom'
import { BathIcon, BedIcon, MapPinIcon, RulerIcon } from 'lucide-react'
import { Property } from '../types/property'
import { formatArea, formatPrice } from '../utils/format'

export function PropertyCard({ property }: { property: Property }) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-shadow duration-200 ease-out hover:shadow-card">
            <div className="relative m-2 overflow-hidden rounded-[16px] bg-mist">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-ink-900 backdrop-blur">
                    {property.status}
                </span>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                <p className="text-[13px] text-ink-400">{property.category}</p>
                <h3 className="mt-1.5 text-[17px] font-medium leading-snug tracking-display text-ink-900">
                    <Link
                        to={`/properties/${property.id}`}
                        className="transition-colors duration-150 ease-out hover:text-brand-600"
                    >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {property.title}
                    </Link>
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-[13px] text-ink-500">
                    <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" aria-hidden="true" />
                    {property.address}, {property.city}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-500">
                    <span className="flex items-center gap-1.5">
                        <BedIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                        {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <BathIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                        {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <RulerIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                        {formatArea(property.area, property.areaUnit)}
                    </span>
                </div>

                <p className="mt-auto border-t border-line pt-4 text-[19px] font-medium tracking-display text-ink-900">
                    {formatPrice(property.price, property.priceSuffix)}
                </p>
            </div>
        </article>
    )
}
