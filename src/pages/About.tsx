import React from 'react'
import { Link } from 'react-router-dom'
import { CompassIcon, HeartHandshakeIcon, ScaleIcon } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { IMAGES } from '../data/properties'

const values = [
    {
        icon: ScaleIcon,
        title: 'We give you straight answers',
        body: 'If a land has a problem or a house is hard to resell, we tell you before you make an offer. No surprises.',
    },
    {
        icon: CompassIcon,
        title: 'We know Sri Lanka well',
        body: 'Our advisors know every area they sell in. We work across the island — from Colombo to Kandy, Galle to Jaffna.',
    },
    {
        icon: HeartHandshakeIcon,
        title: 'Our customers keep coming back',
        body: 'More than half of our business last year came from past customers or people they recommended us to. That says a lot.',
    },
]

const timeline = [
    {
        year: '2016',
        title: 'Started with land sales',
        body: 'Land & Living started as a small team helping families in the Western Province find good land with clean titles.',
    },
    {
        year: '2019',
        title: 'Added house sales',
        body: 'Our customers asked us to help with houses too, so we added a full residential sales team.',
    },
    {
        year: '2022',
        title: 'Rentals and commercial',
        body: 'We started handling rentals and commercial properties — offices, shops and warehouses across Sri Lanka.',
    },
    {
        year: '2026',
        title: '1,500+ properties later',
        body: 'Today we have a dedicated team, offices in multiple cities, and the same rule: nothing gets listed until the title is verified.',
    },
]

const team = [
    { name: 'Property Advisor', role: 'Residential sales', initials: 'PA' },
    { name: 'Land Specialist', role: 'Land & title verification', initials: 'LS' },
    { name: 'Commercial Expert', role: 'Commercial properties', initials: 'CE' },
    { name: 'Rental Manager', role: 'Lettings & management', initials: 'RM' },
]

export function About() {
    return (
        <>
            <PageHero
                eyebrow="About us"
                title="A real estate company built on trust and honesty."
                intro="We started Land & Living because we believe buying property should be simple, safe and stress-free. Every land title is checked, every price is fair, and every customer gets personal attention."
            />

            <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
                <div className="overflow-hidden rounded-[26px]">
                    <img
                        src={IMAGES.villa}
                        alt="A beautiful property listed by Land & Living Real Estate"
                        className="aspect-[21/9] w-full object-cover"
                    />
                </div>

                <div className="mt-20 grid gap-12 md:grid-cols-3">
                    {values.map((value) => (
                        <div key={value.title}>
                            <value.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                            <h2 className="mt-4 text-[19px] font-medium tracking-display text-ink-900">
                                {value.title}
                            </h2>
                            <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{value.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white px-3 sm:px-4">
                <div
                    className="rounded-[26px] px-6 py-16 lg:px-12"
                    style={{ backgroundImage: 'linear-gradient(180deg, #F2F7FB 0%, #E4EFF8 100%)' }}
                >
                    <div className="mx-auto max-w-[1160px]">
                        <h2 className="text-[30px] font-medium tracking-display text-ink-900 lg:text-[40px]">
                            Our journey so far
                        </h2>
                        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                            {timeline.map((item) => (
                                <li key={item.year} className="border-t border-ink-900/15 pt-5">
                                    <p className="text-[13px] text-ink-500">{item.year}</p>
                                    <h3 className="mt-2 text-[18px] font-medium tracking-display text-ink-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
                <h2 className="text-[30px] font-medium tracking-display text-ink-900 lg:text-[40px]">
                    Our team is here to help you
                </h2>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((person) => (
                        <li key={person.name} className="rounded-[22px] border border-line bg-white p-6">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-sm font-medium text-ink-900">
                                {person.initials}
                            </span>
                            <h3 className="mt-5 text-[16px] font-medium text-ink-900">{person.name}</h3>
                            <p className="mt-1 text-[13px] text-ink-500">{person.role}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-white px-3 pb-8 sm:px-4">
                <div
                    className="rounded-[26px] px-6 py-20 text-center"
                    style={{ backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #DCEBF7 100%)' }}
                >
                    <h2 className="mx-auto max-w-xl text-[30px] font-medium leading-[1.1] tracking-display text-ink-900 lg:text-[40px]">
                        Want to talk to us first?
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-[15px] text-ink-700">
                        No pressure. We are happy to answer your questions even if you are not ready to buy or sell yet.
                    </p>
                    <Link
                        to="/contact"
                        className="mt-8 inline-block rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                    >
                        Talk to our team
                    </Link>
                </div>
            </section>
        </>
    )
}
