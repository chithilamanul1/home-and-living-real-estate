import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()
const DATA_DIR = join(__dirname, '..', 'data')
const DATA_FILE = join(DATA_DIR, 'enquiries.json')

// Ensure data directory & file exist
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, '[]', 'utf-8')

function readEnquiries() {
    try {
        return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    } catch {
        return []
    }
}

function writeEnquiries(data) {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// POST /api/contact — Submit a contact enquiry
router.post('/', (req, res) => {
    const { name, email, phone, interest, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required.' })
    }

    const enquiry = {
        id: `e-${Date.now()}`,
        name,
        email,
        phone: phone || '',
        interest: interest || '',
        message,
        createdAt: new Date().toISOString(),
        read: false,
    }

    const enquiries = readEnquiries()
    enquiries.unshift(enquiry)
    writeEnquiries(enquiries)

    console.log(`📩 New enquiry from ${name} (${email})`)

    res.status(201).json({ message: 'Enquiry received. We will get back to you soon.' })
})

// GET /api/contact — List all enquiries (admin use)
router.get('/', (_req, res) => {
    const enquiries = readEnquiries()
    res.json(enquiries)
})

export default router
