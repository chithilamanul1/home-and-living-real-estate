import React, { useRef, useState } from 'react'
import { ImagePlusIcon, LinkIcon, XIcon } from 'lucide-react'
import { Property, PropertyCategory, PropertyDraft, PropertyStatus } from '../../types/property'

const categories: PropertyCategory[] = [
    'House',
    'Apartment',
    'Land Plot',
    'Commercial',
    'Farmhouse',
]
const statuses: PropertyStatus[] = ['For Sale', 'For Rent', 'Sold']
const areaUnits: Property['areaUnit'][] = ['Sq Ft', 'Perches', 'Acres']

interface PropertyFormProps {
    initial?: Property
    onSubmit: (draft: PropertyDraft) => void
    onCancel: () => void
}

function toDraft(property?: Property): PropertyDraft {
    return {
        title: property?.title ?? '',
        category: property?.category ?? 'House',
        status: property?.status ?? 'For Sale',
        price: property?.price ?? 0,
        priceSuffix: property?.priceSuffix ?? '',
        address: property?.address ?? '',
        city: property?.city ?? '',
        beds: property?.beds ?? 0,
        baths: property?.baths ?? 0,
        area: property?.area ?? 0,
        areaUnit: property?.areaUnit ?? 'Perches',
        description: property?.description ?? '',
        features: property?.features ?? [],
        images: property?.images ?? [],
        featured: property?.featured ?? false,
    }
}

const fieldClass =
    'mt-1.5 w-full rounded-[16px] bg-mist px-4 py-2.5 text-sm text-ink-900 outline-none transition-shadow duration-150 ease-out placeholder:text-ink-400 focus:ring-1 focus:ring-brand-300'
const labelClass = 'text-[13px] text-ink-500'

export function PropertyForm({ initial, onSubmit, onCancel }: PropertyFormProps) {
    const [draft, setDraft] = useState<PropertyDraft>(() => toDraft(initial))
    const [featureText, setFeatureText] = useState((initial?.features ?? []).join(', '))
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const fileRef = useRef<HTMLInputElement>(null)

    function set<K extends keyof PropertyDraft>(key: K, value: PropertyDraft[K]) {
        setDraft((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => ({ ...prev, [key]: '' }))
    }

    function handleFiles(files: FileList | null) {
        if (!files) return
        Array.from(files).forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setDraft((prev) => ({ ...prev, images: [...prev.images, reader.result as string] }))
                }
            }
            reader.readAsDataURL(file)
        })
        if (fileRef.current) fileRef.current.value = ''
    }

    function addImageUrl() {
        const url = imageUrl.trim()
        if (!url) return
        setDraft((prev) => ({ ...prev, images: [...prev.images, url] }))
        setImageUrl('')
    }

    function removeImage(index: number) {
        setDraft((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const next: Record<string, string> = {}
        if (!draft.title.trim()) next.title = 'Please add a title.'
        if (!draft.city.trim()) next.city = 'Please add the city or area.'
        if (draft.price <= 0) next.price = 'Please enter a price above zero.'
        if (draft.images.length === 0) next.images = 'Please add at least one image.'

        if (Object.keys(next).length > 0) {
            setErrors(next)
            return
        }

        onSubmit({
            ...draft,
            features: featureText
                .split(',')
                .map((f) => f.trim())
                .filter(Boolean),
            priceSuffix: draft.priceSuffix?.trim() ? draft.priceSuffix.trim() : undefined,
        })
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                    <span className={labelClass}>Property title</span>
                    <input
                        value={draft.title}
                        onChange={(e) => set('title', e.target.value)}
                        className={fieldClass}
                        placeholder="Modern House with Garden in Nugegoda"
                    />
                    {errors.title && <span className="mt-1 block text-xs text-red-600">{errors.title}</span>}
                </label>

                <label className="block">
                    <span className={labelClass}>Category</span>
                    <select
                        value={draft.category}
                        onChange={(e) => set('category', e.target.value as PropertyCategory)}
                        className={fieldClass}
                    >
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className={labelClass}>Status</span>
                    <select
                        value={draft.status}
                        onChange={(e) => set('status', e.target.value as PropertyStatus)}
                        className={fieldClass}
                    >
                        {statuses.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className={labelClass}>Price (LKR)</span>
                    <input
                        type="number"
                        min={0}
                        value={draft.price || ''}
                        onChange={(e) => set('price', Number(e.target.value))}
                        className={fieldClass}
                        placeholder="45000000"
                    />
                    {errors.price && <span className="mt-1 block text-xs text-red-600">{errors.price}</span>}
                </label>

                <label className="block">
                    <span className={labelClass}>Price suffix (optional)</span>
                    <input
                        value={draft.priceSuffix ?? ''}
                        onChange={(e) => set('priceSuffix', e.target.value)}
                        className={fieldClass}
                        placeholder="/ Month"
                    />
                </label>

                <label className="block">
                    <span className={labelClass}>Street address</span>
                    <input
                        value={draft.address}
                        onChange={(e) => set('address', e.target.value)}
                        className={fieldClass}
                        placeholder="23 Pagoda Road"
                    />
                </label>

                <label className="block">
                    <span className={labelClass}>City / area</span>
                    <input
                        value={draft.city}
                        onChange={(e) => set('city', e.target.value)}
                        className={fieldClass}
                        placeholder="Nugegoda, Colombo"
                    />
                    {errors.city && <span className="mt-1 block text-xs text-red-600">{errors.city}</span>}
                </label>

                <label className="block">
                    <span className={labelClass}>Bedrooms</span>
                    <input
                        type="number"
                        min={0}
                        value={draft.beds}
                        onChange={(e) => set('beds', Number(e.target.value))}
                        className={fieldClass}
                    />
                </label>

                <label className="block">
                    <span className={labelClass}>Bathrooms</span>
                    <input
                        type="number"
                        min={0}
                        value={draft.baths}
                        onChange={(e) => set('baths', Number(e.target.value))}
                        className={fieldClass}
                    />
                </label>

                <label className="block">
                    <span className={labelClass}>Area</span>
                    <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={draft.area || ''}
                        onChange={(e) => set('area', Number(e.target.value))}
                        className={fieldClass}
                        placeholder="10"
                    />
                </label>

                <label className="block">
                    <span className={labelClass}>Area unit</span>
                    <select
                        value={draft.areaUnit}
                        onChange={(e) => set('areaUnit', e.target.value as Property['areaUnit'])}
                        className={fieldClass}
                    >
                        {areaUnits.map((u) => (
                            <option key={u}>{u}</option>
                        ))}
                    </select>
                </label>

                <label className="block sm:col-span-2">
                    <span className={labelClass}>Description</span>
                    <textarea
                        value={draft.description}
                        onChange={(e) => set('description', e.target.value)}
                        rows={4}
                        className={`${fieldClass} resize-y`}
                        placeholder="Tell people what makes this property special."
                    />
                </label>

                <label className="block sm:col-span-2">
                    <span className={labelClass}>Features</span>
                    <input
                        value={featureText}
                        onChange={(e) => setFeatureText(e.target.value)}
                        className={fieldClass}
                        placeholder="Garden, Parking, Close to school"
                    />
                    <span className="mt-1 block text-xs text-ink-400">Separate each feature with a comma.</span>
                </label>
            </div>

            <fieldset className="rounded-[22px] border border-line p-4">
                <legend className="px-1.5 text-[13px] text-ink-500">Images</legend>

                {draft.images.length > 0 && (
                    <ul className="mb-4 flex flex-wrap gap-3">
                        {draft.images.map((src, i) => (
                            <li key={src.slice(0, 40) + i} className="relative">
                                <img
                                    src={src}
                                    alt={`Property image ${i + 1}`}
                                    className="h-20 w-28 rounded-[14px] object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    aria-label={`Remove image ${i + 1}`}
                                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white transition-colors duration-150 ease-out hover:bg-red-600"
                                >
                                    <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-line px-4 py-3 text-sm font-medium text-ink-700 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-ink-900"
                    >
                        <ImagePlusIcon className="h-4 w-4" aria-hidden="true" />
                        Upload from device
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFiles(e.target.files)}
                        className="sr-only"
                    />

                    <div className="flex gap-2">
                        <label className="flex flex-1 items-center gap-2 rounded-[16px] bg-mist px-4 py-2.5 focus-within:ring-1 focus-within:ring-brand-300">
                            <LinkIcon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                            <span className="sr-only">Image URL</span>
                            <input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Paste an image URL"
                                className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={addImageUrl}
                            className="rounded-[16px] border border-line px-5 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-mist"
                        >
                            Add
                        </button>
                    </div>
                </div>
                {errors.images && <p className="mt-2 text-xs text-red-600">{errors.images}</p>}
            </fieldset>

            <label className="flex items-center gap-3 rounded-[16px] bg-mist px-4 py-3">
                <input
                    type="checkbox"
                    checked={draft.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="h-4 w-4 rounded border-line text-ink-900"
                />
                <span className="text-sm font-medium text-ink-700">
                    Show on homepage
                    <span className="ml-1 font-normal text-ink-400">(featured properties section)</span>
                </span>
            </label>

            <div className="flex flex-wrap gap-3">
                <button
                    type="submit"
                    className="rounded-full bg-ink-900 px-7 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-ink-700"
                >
                    {initial ? 'Save changes' : 'Publish property'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-full border border-line px-7 py-3 text-sm font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-mist"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
