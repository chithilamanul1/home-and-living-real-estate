import { Router } from 'express'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomBytes } from 'crypto'
import { Property } from '../models/Property.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()
const UPLOADS_DIR = join(__dirname, '..', '..', 'public', 'uploads')

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true })

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

function processImages(images) {
    if (!Array.isArray(images)) return []
    return images.map((img) => {
        if (typeof img === 'string' && img.startsWith('data:image')) {
            const matches = img.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/)
            if (!matches) return img
            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
            const data = matches[2]
            const buffer = Buffer.from(data, 'base64')
            const filename = `${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`
            const filepath = join(UPLOADS_DIR, filename)
            writeFileSync(filepath, buffer)
            return `/uploads/${filename}`
        }
        return img
    })
}

// GET /api/properties — List all (with optional filters)
router.get('/', async (req, res) => {
    try {
        const { q, category, status, price } = req.query
        let query = {}

        if (category && category !== 'All') query.category = category
        if (status && status !== 'All') query.status = status
        if (price) {
            const [min, max] = String(price).split('-').map(Number)
            query.price = { $gte: min, $lte: max }
        }
        if (q) {
            const searchRegex = new RegExp(String(q), 'i')
            query.$or = [
                { title: searchRegex },
                { address: searchRegex },
                { city: searchRegex },
                { category: searchRegex }
            ]
        }

        const properties = await Property.find(query).sort({ createdAt: -1 })
        res.json(properties)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch properties' })
    }
})

// GET /api/properties/:idOrSlug — Get single property by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
    try {
        const param = req.params.idOrSlug
        const property = await Property.findOne({ $or: [{ id: param }, { slug: param }] })
        if (!property) return res.status(404).json({ error: 'Property not found' })
        res.json(property)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch property' })
    }
})

// POST /api/properties — Create a new property
router.post('/', async (req, res) => {
    try {
        const body = req.body
        const slug = generateSlug(body.title || 'property')
        const images = processImages(body.images || [])

        const newProperty = new Property({
            ...body,
            slug,
            images,
            id: `p-${Date.now()}`,
            createdAt: new Date().toISOString().slice(0, 10),
        })

        await newProperty.save()
        res.status(201).json(newProperty)
    } catch (err) {
        res.status(500).json({ error: 'Failed to create property', details: err.message })
    }
})

// PUT /api/properties/:id — Update a property
router.put('/:id', async (req, res) => {
    try {
        const body = req.body
        const property = await Property.findOne({ id: req.params.id })
        if (!property) return res.status(404).json({ error: 'Property not found' })

        const slug = body.title ? generateSlug(body.title) : property.slug
        const images = processImages(body.images || property.images)

        const updatedProperty = await Property.findOneAndUpdate(
            { id: req.params.id },
            { ...body, slug, images },
            { new: true }
        )
        res.json(updatedProperty)
    } catch (err) {
        res.status(500).json({ error: 'Failed to update property', details: err.message })
    }
})

// DELETE /api/properties/:id — Delete a property
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Property.findOneAndDelete({ id: req.params.id })
        if (!deleted) return res.status(404).json({ error: 'Property not found' })
        res.json({ message: 'Deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete property' })
    }
})

export default router
