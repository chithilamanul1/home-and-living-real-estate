import React from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRightIcon,
    BuildingIcon,
    FileSearchIcon,
    KeyRoundIcon,
    LandmarkIcon,
    ScrollTextIcon,
    TrendingUpIcon,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'

const services = [
    {
        icon: LandmarkIcon,
        title: 'Land buying & selling',
        body: 'We help you find, value and buy land across Sri Lanka. Every plot is checked for clear title, proper survey and valid documents before we list it.',
        points: ['Title verification', 'Land survey', 'Transfer support'],
        featured: true,
    },
    {
        icon: KeyRoundIcon,
        title: 'House sales',
        body: 'Full service for selling or buying a house — we handle visits, price talks and all the paperwork for you.',
        points: ['Property photos included', 'Guided property visits'],
    },
    {
        icon: BuildingIcon,
        title: 'Commercial property',
        body: 'Offices, shops, warehouses and more. We help you find the right space for your business, whether buying or renting.',
        points: ['Lease help', 'Rent reviews'],
    },
    {
        icon: ScrollTextIcon,
        title: 'Rentals & management',
        body: 'We find good tenants, collect rent and handle repairs. You relax while we take care of your property.',
        points: ['Tenant checking', 'Monthly reports'],
    },
    {
        icon: FileSearchIcon,
        title: 'Property valuations',
        body: 'Need to know what your property is worth? We give you a written valuation based on recent sales in your area.',
        points: ['48-hour turnaround', 'Accepted by banks'],
    },
    {
        icon: TrendingUpIcon,
        title: 'Investment advice',
        body: 'Thinking of investing in property? We help you understand returns, pick the right area and plan your next move.',
        points: ['Return calculations', 'Area analysis'],
    },
]

const steps = [
    {
        title: 'Tell us what you need',
        body: 'A quick chat about your budget, timeline and what kind of property you are looking for.',
    },
    {
        title: 'We find options for you',
        body: 'We send you a shortlist of properties that match, with honest notes about the good and bad points of each.',
    },
    {
        title: 'We check everything',
        body: 'Title search, survey and legal checks are done before you commit any money.',
    },
    {
        title: 'We close the deal',
        body: 'We work with lawyers and banks to make sure everything is done on time and you get your keys on the agreed date.',
    },
]

export function Services() {
    return (
        <>
            <PageHero
                eyebrow="Our services"
                title="Everything you need, from the first visit to the final signature."
                intro="Six services, one team, one advisor for you. You never have to explain your needs to a different person."
            />

            <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
                <div className="grid gap-4 lg:grid-cols-3">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className={`flex flex-col rounded-[22px] p-7 ${service.featured
                                    ? 'bg-ink-900 text-white lg:row-span-2 lg:p-9'
                                    : 'border border-line bg-white'
                                }`}
                        >
                            <service.icon
                                className={`h-5 w-5 ${service.featured ? 'text-brand-200' : 'text-brand-600'}`}
                                aria-hidden="true"
                            />
                            <h2
                                className={`mt-5 font-medium tracking-display ${service.featured ? 'text-[28px]' : 'text-[19px] text-ink-900'
                                    }`}
                            >
                                {service.title}
                            </h2>
                            <p
                                className={`mt-3 text-sm leading-relaxed ${service.featured ? 'text-white/70' : 'text-ink-500'
                                    }`}
                            >
                                {service.body}
                            </p>
                            <ul
                                className={`mt-6 space-y-2 text-[13px] ${service.featured ? 'text-white/70' : 'text-ink-500'
                                    }`}
                            >
                                {service.points.map((point) => (
                                    <li key={point} className="flex items-center gap-2">
                                        <span
                                            className={`h-1 w-1 rounded-full ${service.featured ? 'bg-brand-200' : 'bg-brand-600'
                                                }`}
                                        />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/contact"
                                className={`mt-auto inline-flex items-center gap-1.5 pt-8 text-[13px] font-medium ${service.featured ? 'text-white' : 'text-ink-900'
                                    }`}
                            >
                                Ask us about this
                                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-white px-3 pb-8 sm:px-4">
                <div
                    className="rounded-[26px] px-6 py-16 lg:px-12"
                    style={{ backgroundImage: 'linear-gradient(180deg, #F2F7FB 0%, #DCEBF7 100%)' }}
                >
                    <div className="mx-auto max-w-[1160px]">
                        <h2 className="text-[30px] font-medium tracking-display text-ink-900 lg:text-[40px]">
                            How it works
                        </h2>
                        <ol className="mt-12 grid gap-10 md:grid-cols-4">
                            {steps.map((step, i) => (
                                <li key={step.title} className="border-t border-ink-900/15 pt-5">
                                    <p className="text-[13px] text-ink-500">Step {i + 1}</p>
                                    <h3 className="mt-2 text-[18px] font-medium tracking-display text-ink-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </>
    )
}
