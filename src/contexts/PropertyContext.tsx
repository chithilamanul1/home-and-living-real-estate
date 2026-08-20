import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Property, PropertyDraft } from '../types/property'
import { seedProperties } from '../data/properties'

const STORAGE_KEY = 'landandliving.properties.v1'

interface PropertyContextValue {
    properties: Property[]
    loading: boolean
    addProperty: (draft: PropertyDraft) => Property
    updateProperty: (id: string, draft: PropertyDraft) => void
    deleteProperty: (id: string) => void
    getProperty: (id: string) => Property | undefined
}

const PropertyContext = createContext<PropertyContextValue | null>(null)

function readStorage(): Property[] | null {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as Property[]
        return Array.isArray(parsed) ? parsed : null
    } catch {
        return null
    }
}

export function PropertyProvider({ children }: { children: React.ReactNode }) {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = readStorage()
        setProperties(stored ?? seedProperties)
        setLoading(false)
    }, [])

    useEffect(() => {
        if (loading) return
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
        } catch {
            /* storage unavailable */
        }
    }, [properties, loading])

    const addProperty = useCallback((draft: PropertyDraft) => {
        const created: Property = {
            ...draft,
            id: `p-${Date.now()}`,
            createdAt: new Date().toISOString().slice(0, 10),
        }
        setProperties((prev) => [created, ...prev])
        return created
    }, [])

    const updateProperty = useCallback((id: string, draft: PropertyDraft) => {
        setProperties((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...draft } : p)),
        )
    }, [])

    const deleteProperty = useCallback((id: string) => {
        setProperties((prev) => prev.filter((p) => p.id !== id))
    }, [])

    const getProperty = useCallback(
        (id: string) => properties.find((p) => p.id === id),
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
