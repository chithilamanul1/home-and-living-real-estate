import React from 'react'

interface SectionHeadingProps {
    eyebrow: string
    title: React.ReactNode
    action?: React.ReactNode
    align?: 'left' | 'center'
    className?: string
}

export function SectionHeading({
    eyebrow,
    title,
    action,
    align = 'left',
    className = '',
}: SectionHeadingProps) {
    if (align === 'center') {
        return (
            <div className={`text-center ${className}`}>
                <p className="text-[13px] font-medium text-ink-400">{eyebrow}</p>
                <h2 className="mx-auto mt-3 max-w-2xl text-[30px] font-medium leading-[1.1] tracking-display text-ink-900 lg:text-[40px]">
                    {title}
                </h2>
                {action && <div className="mt-7 flex justify-center">{action}</div>}
            </div>
        )
    }

    return (
        <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
            <div>
                <p className="text-[13px] font-medium text-ink-400">{eyebrow}</p>
                <h2 className="mt-3 max-w-xl text-[30px] font-medium leading-[1.1] tracking-display text-ink-900 lg:text-[40px]">
                    {title}
                </h2>
            </div>
            {action}
        </div>
    )
}
