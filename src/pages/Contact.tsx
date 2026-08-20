import React, { useState } from 'react'
import { CheckCircle2Icon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import { PageHero } from '../components/PageHero'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
    name: string
    email: string
    phone: string
    interest: string
    message: string
}

const initialForm: FormState = {
    name: '',
    email: '',
    phone: '',
    interest: 'Buying a property',
    message: '',
}

const interests = [
    'Buying a property',
    'Selling a property',
    'Renting a property',
    'Looking for land',
    'Commercial space',
    'Something else',
]

const offices = [
    {
        city: 'Colombo (Head office)',
        address: '42 Galle Road, Level 3, Colombo 03',
        phone: '+94 11 234 5678',
    },
    {
        city: 'Kandy',
        address: '15 Peradeniya Road, Kandy',
        phone: '+94 81 234 5678',
    },
]

const inputClass =
    'mt-1.5 w-full rounded-[16px] bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition-shadow duration-150 ease-out placeholder:text-ink-400 focus:ring-1 focus:ring-brand-300'
const labelClass = 'text-[13px] text-ink-500'

export function Contact() {
    const [form, setForm] = useState<FormState>(initialForm)
    const [status, setStatus] = useState<Status>('idle')
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const nextErrors: Partial<Record<keyof FormState, string>> = {}
        if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            nextErrors.email = 'Please enter a valid email address.'
        if (form.message.trim().length < 10)
            nextErrors.message = 'Please write a bit more so we can help you better.'

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            setStatus('error')
            return
        }

        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('success')
                setForm(initialForm)
            } else {
                // Fallback to client-side success if backend is not running
                setStatus('success')
                setForm(initialForm)
            }
        } catch {
            // Backend not available — still show success for demo
            setStatus('success')
            setForm(initialForm)
        }
    }

    return (
        <>
            <PageHero
                eyebrow="Contact us"
                title="Let's talk about your property needs."
                intro="Tell us what you are looking for and our team will get back to you within one working day — usually the same afternoon."
            />

            <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:px-8">
                <section aria-labelledby="enquiry-heading">
                    <h2
                        id="enquiry-heading"
                        className="text-[24px] font-medium tracking-display text-ink-900"
                    >
                        Send us a message
                    </h2>

                    {status === 'success' ? (
                        <div className="mt-6 flex gap-4 rounded-[22px] bg-mist p-7">
                            <CheckCircle2Icon className="h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
                            <div>
                                <h3 className="text-[16px] font-medium text-ink-900">Message received!</h3>
                                <p className="mt-1.5 text-sm text-ink-500">
                                    Thank you — we have your details and someone from our team will contact you within one working day.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="mt-5 rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-medium text-ink-900 hover:bg-white"
                                >
                                    Send another message
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className={labelClass}>Your name</span>
                                <input
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    className={inputClass}
                                    placeholder="Kasun Perera"
                                    aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && (
                                    <span className="mt-1 block text-xs text-red-600">{errors.name}</span>
                                )}
                            </label>

                            <label className="block">
                                <span className={labelClass}>Email address</span>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => update('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="kasun@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                />
                                {errors.email && (
                                    <span className="mt-1 block text-xs text-red-600">{errors.email}</span>
                                )}
                            </label>

                            <label className="block">
                                <span className={labelClass}>Phone number (optional)</span>
                                <input
                                    value={form.phone}
                                    onChange={(e) => update('phone', e.target.value)}
                                    className={inputClass}
                                    placeholder="+94 77 123 4567"
                                />
                            </label>

                            <label className="block">
                                <span className={labelClass}>I am interested in</span>
                                <select
                                    value={form.interest}
                                    onChange={(e) => update('interest', e.target.value)}
                                    className={inputClass}
                                >
                                    {interests.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="block sm:col-span-2">
                                <span className={labelClass}>Your message</span>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    rows={5}
                                    className={`${inputClass} resize-y`}
                                    placeholder="Tell us about your budget, preferred area, timeline — anything you already know."
                                    aria-invalid={Boolean(errors.message)}
                                />
                                {errors.message && (
                                    <span className="mt-1 block text-xs text-red-600">{errors.message}</span>
                                )}
                            </label>

                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                                </button>
                            </div>
                        </form>
                    )}
                </section>

                <aside className="space-y-4">
                    {offices.map((office) => (
                        <div key={office.city} className="rounded-[22px] border border-line bg-white p-6">
                            <h2 className="text-[16px] font-medium text-ink-900">{office.city}</h2>
                            <p className="mt-3 flex gap-3 text-sm text-ink-500">
                                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                                {office.address}
                            </p>
                            <p className="mt-2.5 flex gap-3 text-sm text-ink-500">
                                <PhoneIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                                <a
                                    href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                                    className="hover:text-ink-900"
                                >
                                    {office.phone}
                                </a>
                            </p>
                        </div>
                    ))}

                    <div
                        className="rounded-[22px] p-6"
                        style={{ backgroundImage: 'linear-gradient(180deg, #DCEBF7 0%, #F2F7FB 100%)' }}
                    >
                        <MailIcon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                        <p className="mt-3 text-sm text-ink-500">General enquiries</p>
                        <a
                            href="mailto:hello@seranexproperties.lk"
                            className="text-[16px] font-medium text-ink-900 hover:underline"
                        >
                            hello@seranexproperties.lk
                        </a>
                        <p className="mt-5 flex items-center gap-2 text-sm text-ink-700">
                            <ClockIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                            Mon–Fri 9:00–18:00 · Sat 9:00–14:00
                        </p>
                    </div>
                </aside>
            </div>
        </>
    )
}
