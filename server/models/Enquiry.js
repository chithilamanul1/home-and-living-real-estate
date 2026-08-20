import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    interest: { type: String, default: '' },
    message: { type: String, required: true },
    createdAt: { type: String, required: true },
    read: { type: Boolean, default: false },
})

export const Enquiry = mongoose.model('Enquiry', enquirySchema)
