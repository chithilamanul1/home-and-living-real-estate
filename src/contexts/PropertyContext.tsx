import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Property, PropertyDraft } from '../types/property'

interface PropertyContextValue {
    properties: Property[]
    loading: boolean
    addProperty: (draft: PropertyDraft) => Promise<Property>
    updateProperty: (id: string, draft: PropertyDraft) => Promise<void>
    deleteProperty: (id: string) => Promise<void>
    getProperty: (id: string) => Property | undefined
}

const PropertyContext = createContext<PropertyContextValue | null>(null)

export function PropertyProvider({ children }: { children: React.ReactNode }) {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProperties = useCallback(async () => {
        try {
            const res = await fetch('/api/properties')
            if (res.ok) {
                const data = await res.json()
                setProperties(data)
            }
        } catch (err) {
            console.error('Failed to fetch properties:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProperties()
    }, [fetchProperties])

    const addProperty = useCallback(async (draft: PropertyDraft) => {
        const res = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(draft),
        })
        if (!res.ok) throw new Error('Failed to create property')
        const created = await res.json()
        setProperties((prev) => [created, ...prev])
        return created
    }, [])

    const updateProperty = useCallback(async (id: string, draft: PropertyDraft) => {
        const res = await fetch(`/api/properties/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(draft),
        })
        if (!res.ok) throw new Error('Failed to update property')
        const updated = await res.json()
        setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
    }, [])

    const deleteProperty = useCallback(async (id: string) => {
        const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete property')
        setProperties((prev) => prev.filter((p) => p.id !== id))
    }, [])

    const getProperty = useCallback(
        (id: string) => properties.find((p) => p.id === id || p.slug === id),
        [properties],
    )

    const value = useMemo(
        () => ({
            properties,
            loading,
            addProperty,
            updateProperty,
            deleteProperty,
            getProperty,
        }),
        [properties, loading, addProperty, updateProperty, deleteProperty, getProperty],
    )

    return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
}

export function useProperties() {
    const ctx = useContext(PropertyContext)
    if (!ctx) throw new Error('useProperties must be used within a PropertyProvider')
    return ctx
}
