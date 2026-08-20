export type PropertyStatus = 'For Sale' | 'For Rent' | 'Sold'

export type PropertyCategory =
    | 'House'
    | 'Apartment'
    | 'Land Plot'
    | 'Commercial'
    | 'Farmhouse'

export interface Property {
    id: string
    slug?: string
    title: string
    category: PropertyCategory
    status: PropertyStatus
    price: number
    priceSuffix?: string
    address: string
    city: string
    beds: number
    baths: number
    area: number
    areaUnit: 'Sq Ft' | 'Perches' | 'Acres'
    description: string
    features: string[]
    images: string[]
    featured: boolean
    createdAt: string
}

export type PropertyDraft = Omit<Property, 'id' | 'createdAt'>
