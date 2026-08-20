import { Router } from 'express'
import { Enquiry } from '../models/Enquiry.js'

const router = Router()

// POST /api/contact — Submit a contact enquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email and message are required.' })
        }

        const enquiry = new Enquiry({
            id: `e-${Date.now()}`,
            name,
            email,
            phone: phone || '',
            interest: interest || '',
            message,
            createdAt: new Date().toISOString(),
            read: false,
        })

        await enquiry.save()
        console.log(`📩 New enquiry from ${name} (${email})`)

        res.status(201).json({ message: 'Enquiry received. We will get back to you soon.' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit enquiry', details: err.message })
    }
})

// GET /api/contact — List all enquiries (admin use)
router.get('/', async (_req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 })
        res.json(enquiries)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch enquiries' })
    }
})

export default router
