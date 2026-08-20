import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CheckCircle2Icon,
    LockIcon,
    PencilIcon,
    PlusIcon,
    ShieldCheckIcon,
    Trash2Icon,
} from 'lucide-react'
import { PropertyForm } from '../components/admin/PropertyForm'
import { useProperties } from '../contexts/PropertyContext'
import { Property, PropertyDraft } from '../types/property'
import { formatPrice } from '../utils/format'

type Mode = { type: 'list' } | { type: 'create' } | { type: 'edit'; property: Property }

function AdminLogin({ onAuth }: { onAuth: () => void }) {
    const [email, setEmail] = useState('admin@seranexproperties.lk')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (password.length < 4) {
            setError('Please enter a password (for demo: type any 4 or more characters).')
            return
        }
        onAuth()
    }

    return (
        <div className="mx-auto flex max-w-md flex-col px-5 py-24">
            <LockIcon className="h-6 w-6 text-brand-600" aria-hidden="true" />
            <h1 className="mt-6 text-[30px] font-medium tracking-display text-ink-900">
                Admin sign in
            </h1>
            <p className="mt-3 text-sm text-ink-500">
                Properties you add here will appear on the public listings page right away.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                <label className="block">
                    <span className="text-[13px] text-ink-500">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-[16px] bg-mist px-4 py-3 text-sm text-ink-900 outline-none focus:ring-1 focus:ring-brand-300"
                    />
                </label>
                <label className="block">
                    <span className="text-[13px] text-ink-500">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                        className="mt-1.5 w-full rounded-[16px] bg-mist px-4 py-3 text-sm text-ink-900 outline-none focus:ring-1 focus:ring-brand-300"
                        placeholder="••••••••"
                    />
                </label>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="rounded-full bg-ink-900 px-7 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                >
                    Sign in
                </button>
            </form>
        </div>
    )
}

export function Admin() {
    const { properties, addProperty, updateProperty, deleteProperty } = useProperties()
    const [authed, setAuthed] = useState(false)
    const [mode, setMode] = useState<Mode>({ type: 'list' })
    const [toast, setToast] = useState('')
    const [pendingDelete, setPendingDelete] = useState<Property | null>(null)

    const summary = useMemo(
        () => [
            { label: 'Total listings', value: properties.length },
            {
                label: 'For sale',
                value: properties.filter((p) => p.status === 'For Sale').length,
            },
            { label: 'For rent', value: properties.filter((p) => p.status === 'For Rent').length },
            { label: 'Featured', value: properties.filter((p) => p.featured).length },
        ],
        [properties],
    )

    if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />

    function flash(message: string) {
        setToast(message)
        window.setTimeout(() => setToast(''), 3000)
    }

    function handleCreate(draft: PropertyDraft) {
        addProperty(draft)
        setMode({ type: 'list' })
        flash('Property published! It is now live on the properties page.')
    }

    function handleUpdate(id: string, draft: PropertyDraft) {
        updateProperty(id, draft)
        setMode({ type: 'list' })
        flash('Changes saved.')
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="flex items-center gap-2 text-[13px] text-ink-400">
                            <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                            Admin panel
                        </p>
                        <h1 className="mt-3 text-[32px] font-medium tracking-display text-ink-900 lg:text-[40px]">
                            Manage properties
                        </h1>
                    </div>
                    {mode.type === 'list' && (
                        <button
                            type="button"
                            onClick={() => setMode({ type: 'create' })}
                            className="flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                        >
                            <PlusIcon className="h-4 w-4" aria-hidden="true" />
                            Add property
                        </button>
                    )}
                </div>

                {toast && (
                    <div
                        role="status"
                        className="mt-6 flex items-center gap-3 rounded-[16px] bg-mist px-4 py-3 text-sm text-ink-900"
                    >
                        <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" />
                        {toast}
                    </div>
                )}

                {mode.type === 'list' ? (
                    <>
                        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {summary.map((item) => (
                                <div key={item.label} className="rounded-[22px] bg-mist p-6">
                                    <dt className="text-[13px] text-ink-500">{item.label}</dt>
                                    <dd className="mt-1 text-[30px] font-medium tracking-display text-ink-900">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-8 overflow-hidden rounded-[22px] border border-line bg-white">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead>
                                        <tr className="border-b border-line text-[12px] text-ink-400">
                                            <th scope="col" className="px-5 py-3.5 font-normal">Property</th>
                                            <th scope="col" className="px-5 py-3.5 font-normal">Type</th>
                                            <th scope="col" className="px-5 py-3.5 font-normal">Status</th>
                                            <th scope="col" className="px-5 py-3.5 font-normal">Price</th>
                                            <th scope="col" className="px-5 py-3.5 text-right font-normal">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {properties.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-5 py-16 text-center text-sm text-ink-500">
                                                    No properties yet. Click "Add property" to create your first listing.
                                                </td>
                                            </tr>
                                        )}
                                        {properties.map((property) => (
                                            <tr key={property.id} className="border-b border-line last:border-0">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={property.images[0]}
                                                            alt=""
                                                            className="h-12 w-16 rounded-[12px] object-cover"
                                                        />
                                                        <div>
                                                            <Link
                                                                to={`/properties/${property.id}`}
                                                                className="text-sm font-medium text-ink-900 hover:text-brand-600"
                                                            >
                                                                {property.title}
                                                            </Link>
                                                            <p className="text-[12px] text-ink-400">{property.city}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-sm text-ink-500">{property.category}</td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-mist px-3 py-1 text-[12px] text-ink-700">
                                                        {property.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-sm font-medium text-ink-900">
                                                    {formatPrice(property.price, property.priceSuffix)}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setMode({ type: 'edit', property })}
                                                            aria-label={`Edit ${property.title}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-700 transition-colors duration-150 ease-out hover:bg-mist hover:text-ink-900"
                                                        >
                                                            <PencilIcon className="h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPendingDelete(property)}
                                                            aria-label={`Delete ${property.title}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-700 transition-colors duration-150 ease-out hover:border-red-200 hover:text-red-600"
                                                        >
                                                            <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mt-8 rounded-[22px] border border-line bg-white p-6 lg:p-8">
                        <h2 className="text-[24px] font-medium tracking-display text-ink-900">
                            {mode.type === 'edit' ? 'Edit property' : 'Add a new property'}
                        </h2>
                        <p className="mt-2 text-sm text-ink-500">
                            Fill in the details below. Required fields will show a message if left empty.
                        </p>
                        <div className="mt-7">
                            <PropertyForm
                                initial={mode.type === 'edit' ? mode.property : undefined}
                                onCancel={() => setMode({ type: 'list' })}
                                onSubmit={(draft) =>
                                    mode.type === 'edit' ? handleUpdate(mode.property.id, draft) : handleCreate(draft)
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {pendingDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 px-5"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                >
                    <div className="w-full max-w-sm rounded-[22px] bg-white p-7 shadow-lift">
                        <h2 id="delete-title" className="text-[20px] font-medium tracking-display text-ink-900">
                            Delete this property?
                        </h2>
                        <p className="mt-2.5 text-sm text-ink-500">
                            "{pendingDelete.title}" will be removed from the website right away.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPendingDelete(null)}
                                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-900 hover:bg-mist"
                            >
                                Keep it
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    deleteProperty(pendingDelete.id)
                                    setPendingDelete(null)
                                    flash('Property deleted.')
                                }}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
