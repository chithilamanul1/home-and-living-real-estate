import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceSuffix: { type: String },
    category: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    area: { type: Number, required: true },
    areaUnit: { type: String, required: true },
    features: [{ type: String }],
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    createdAt: { type: String, required: true },
})

export const Property = mongoose.model('Property', propertySchema)
