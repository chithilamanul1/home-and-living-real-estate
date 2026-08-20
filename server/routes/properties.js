import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()
const DATA_DIR = join(__dirname, '..', 'data')
const DATA_FILE = join(DATA_DIR, 'properties.json')

// Ensure data directory & file exist
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, '[]', 'utf-8')

function readProperties() {
    try {
        return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    } catch {
        return []
    }
}

function writeProperties(data) {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// GET /api/properties — List all (with optional filters)
router.get('/', (req, res) => {
    let properties = readProperties()
    const { q, category, status, price } = req.query

    if (category && category !== 'All') {
        properties = properties.filter((p) => p.category === category)
    }
    if (status && status !== 'All') {
        properties = properties.filter((p) => p.status === status)
    }
    if (q) {
        const query = String(q).toLowerCase()
        properties = properties.filter((p) => {
            const haystack = `${p.title} ${p.address} ${p.city} ${p.category}`.toLowerCase()
            return haystack.includes(query)
        })
    }
    if (price) {
        const [min, max] = String(price).split('-').map(Number)
        properties = properties.filter((p) => p.price >= min && p.price <= max)
    }

    res.json(properties)
})

// GET /api/properties/:id — Get single property
router.get('/:id', (req, res) => {
    const properties = readProperties()
    const property = properties.find((p) => p.id === req.params.id)
    if (!property) return res.status(404).json({ error: 'Property not found' })
    res.json(property)
})

// POST /api/properties — Create a new property
router.post('/', (req, res) => {
    const properties = readProperties()
    const newProperty = {
        ...req.body,
        id: `p-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
    }
    properties.unshift(newProperty)
    writeProperties(properties)
    res.status(201).json(newProperty)
})

// PUT /api/properties/:id — Update a property
router.put('/:id', (req, res) => {
    const properties = readProperties()
    const index = properties.findIndex((p) => p.id === req.params.id)
    if (index === -1) return res.status(404).json({ error: 'Property not found' })

    properties[index] = { ...properties[index], ...req.body }
    writeProperties(properties)
    res.json(properties[index])
})

// DELETE /api/properties/:id — Delete a property
router.delete('/:id', (req, res) => {
    let properties = readProperties()
    const before = properties.length
    properties = properties.filter((p) => p.id !== req.params.id)
    if (properties.length === before) return res.status(404).json({ error: 'Property not found' })

    writeProperties(properties)
    res.json({ message: 'Deleted successfully' })
})

export default router
