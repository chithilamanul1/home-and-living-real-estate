import React from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRightIcon,
    Building2Icon,
    HomeIcon,
    LandmarkIcon,
    ScaleIcon,
    ShieldCheckIcon,
    StoreIcon,
    UserRoundIcon,
} from 'lucide-react'
import { PropertySearchBar } from '../components/PropertySearchBar'
import { PropertyCard } from '../components/PropertyCard'
import { SectionHeading } from '../components/SectionHeading'
import { useProperties } from '../contexts/PropertyContext'
import { IMAGES } from '../data/properties'

const categories = [
    {
        label: 'Houses',
        blurb: 'Family homes across Sri Lanka',
        icon: HomeIcon,
        image: IMAGES.villa,
        query: 'House',
    },
    {
        label: 'Apartments',
        blurb: 'Ready-to-move flats in the city',
        icon: Building2Icon,
        image: IMAGES.apartment,
        query: 'Apartment',
    },
    {
        label: 'Land Plots',
        blurb: 'Verified land with clear titles',
        icon: LandmarkIcon,
        image: IMAGES.land,
        query: 'Land Plot',
    },
    {
        label: 'Commercial',
        blurb: 'Offices, shops and business spaces',
        icon: StoreIcon,
        image: IMAGES.office,
        query: 'Commercial',
    },
]

const stats = [
    { value: '800+', label: 'Happy customers' },
    { value: '1,500+', label: 'Properties listed' },
    { value: '10+', label: 'Years of experience' },
    { value: '97%', label: 'Customer satisfaction' },
]

const reasons = [
    {
        icon: ShieldCheckIcon,
        title: 'Every title is checked before listing',
        body: 'We check every land title and property deed with the Land Registry before we list it on our site. If the title is not clear, we do not list it. This keeps you safe.',
    },
    {
        icon: UserRoundIcon,
        title: 'One person helps you from start to finish',
        body: 'You will have one dedicated property advisor who handles everything — from the first visit to the final signing. No need to explain your needs to different people each time.',
    },
    {
        icon: ScaleIcon,
        title: 'Our fees are clear from the beginning',
        body: 'We tell you all our fees before we start working together. No hidden charges, no surprises at the end. Everything is written down and agreed upon upfront.',
    },
]

export function Home() {
    const { properties, loading } = useProperties()
    const featured = properties.filter((p) => p.featured).slice(0, 3)
    const showcase = featured.length > 0 ? featured : properties.slice(0, 3)

    return (
        <>
            {/* Hero */}
            <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
                <div
                    className="relative overflow-hidden rounded-[26px]"
                    style={{
                        backgroundImage:
                            'linear-gradient(180deg, #B7DAF2 0%, #C6E1F4 30%, #DCEBF7 55%, #F1F7FB 74%, #FFFFFF 92%)',
                    }}
                >
                    <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20 lg:pt-24">
                        <h1 className="text-[40px] font-medium leading-[1.04] tracking-display text-ink-900 sm:text-[58px] lg:text-[72px]">
                            Find your perfect
                            <br />
                            property in Sri Lanka.
                        </h1>
                        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-700">
                            Houses, land, apartments and commercial spaces — all with verified titles and honest
                            prices. We make buying, selling and renting property easy and safe.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                to="/properties"
                                className="group flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                            >
                                Browse properties
                                <ArrowRightIcon
                                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                            <Link
                                to="/contact"
                                className="rounded-full border border-ink-900/15 bg-white/70 px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-white"
                            >
                                Get a free valuation
                            </Link>
                        </div>
                    </div>

                    <div className="relative -mt-4">
                        <img
                            src={IMAGES.heroVilla}
                            alt="Beautiful modern property in Sri Lanka"
                            className="mx-auto w-full max-w-5xl object-cover"
                        />
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-24"
                            style={{
                                backgroundImage: 'linear-gradient(180deg, #CCE3F5 0%, rgba(204,227,245,0) 100%)',
                            }}
                        />
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
                            style={{
                                backgroundImage: 'linear-gradient(0deg, #FFFFFF 12%, rgba(255,255,255,0) 100%)',
                            }}
                        />
                    </div>
                </div>

                <div className="relative z-20 mx-auto -mt-10 max-w-[1120px] px-2 sm:-mt-16 lg:px-4">
                    <PropertySearchBar />
                </div>
            </section>

            {/* Categories */}
            <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-20 lg:px-8 lg:pt-24">
                <SectionHeading
                    eyebrow="What are you looking for?"
                    title="Choose the type of property you need"
                    action={
                        <Link
                            to="/properties"
                            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-mist"
                        >
                            See all properties
                            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    }
                />

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((cat) => (
                        <li key={cat.label}>
                            <Link
                                to={`/properties?category=${encodeURIComponent(cat.query)}`}
                                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white p-2 transition-shadow duration-200 ease-out hover:shadow-card"
                            >
                                <div className="overflow-hidden rounded-[16px] bg-mist">
                                    <img
                                        src={cat.image}
                                        alt=""
                                        loading="lazy"
                                        className="aspect-[16/11] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                                    <div className="flex items-center gap-2.5">
                                        <cat.icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                                        <h3 className="text-[16px] font-medium tracking-display text-ink-900">
                                            {cat.label}
                                        </h3>
                                    </div>
                                    <p className="mt-1.5 text-[13px] text-ink-500">{cat.blurb}</p>
                                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-ink-900">
                                        Browse
                                        <ArrowRightIcon
                                            className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Featured */}
            <section className="bg-white px-3 sm:px-4">
                <div
                    className="rounded-[26px] px-5 py-16 lg:px-10"
                    style={{ backgroundImage: 'linear-gradient(180deg, #F2F7FB 0%, #E4EFF8 100%)' }}
                >
                    <div className="mx-auto max-w-[1160px]">
                        <SectionHeading
                            eyebrow="Featured properties"
                            title="Hand-picked listings you can trust"
                            action={
                                <Link
                                    to="/properties"
                                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-white/70"
                                >
                                    See all properties
                                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            }
                        />

                        {loading ? (
                            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="h-[400px] animate-pulse rounded-[22px] bg-white/60" />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {showcase.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Why us */}
            <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
                    <div className="overflow-hidden rounded-[26px]">
                        <img
                            src={IMAGES.land}
                            alt="Land plot for sale in Sri Lanka"
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[13px] font-medium text-ink-400">Why choose Seranex Properties?</p>
                        <h2 className="mt-3 text-[30px] font-medium leading-[1.1] tracking-display text-ink-900 lg:text-[40px]">
                            We handle the hard parts so you don't have to.
                        </h2>
                        <ul className="mt-9 space-y-8">
                            {reasons.map((reason) => (
                                <li key={reason.title} className="flex gap-4">
                                    <reason.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                                    <div>
                                        <h3 className="text-[16px] font-medium text-ink-900">{reason.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{reason.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <dl className="mt-20 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="sr-only">{stat.label}</dt>
                            <dd>
                                <span className="block text-[34px] font-medium tracking-display text-ink-900">
                                    {stat.value}
                                </span>
                                <span className="mt-1 block text-[13px] text-ink-500">{stat.label}</span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* CTA */}
            <section className="bg-white px-3 pb-8 sm:px-4">
                <div
                    className="rounded-[26px] px-6 py-20 text-center"
                    style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #DCEBF7 100%)' }}
                >
                    <h2 className="mx-auto max-w-2xl text-[30px] font-medium leading-[1.1] tracking-display text-ink-900 lg:text-[40px]">
                        Ready to find your dream property?
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-700">
                        Get a free property valuation within 48 hours. We will check recent prices in your area
                        and give you an honest answer — no obligation to work with us.
                    </p>
                    <Link
                        to="/contact"
                        className="mt-8 inline-block rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                    >
                        Get a free valuation
                    </Link>
                </div>
            </section>
        </>
    )
}
