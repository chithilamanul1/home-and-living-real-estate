import React from 'react'

interface PageHeroProps {
    eyebrow: string
    title: React.ReactNode
    intro?: string
    children?: React.ReactNode
}

export const SKY_PANEL =
    'linear-gradient(180deg, #B7DAF2 0%, #C9E3F5 34%, #DFEDF8 62%, #FFFFFF 96%)'

export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
    return (
        <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
            <div
                className="overflow-hidden rounded-[26px] px-6 pb-16 pt-16 text-center sm:pb-20 sm:pt-20"
                style={{ backgroundImage: SKY_PANEL }}
            >
                <p className="text-[13px] font-medium text-ink-500">{eyebrow}</p>
                <h1 className="mx-auto mt-4 max-w-3xl text-[36px] font-medium leading-[1.06] tracking-display text-ink-900 sm:text-[52px]">
                    {title}
                </h1>
                {intro && (
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-700">{intro}</p>
                )}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    )
}
