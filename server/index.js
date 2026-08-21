import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import propertiesRouter from './routes/properties.js'
import contactRouter from './routes/contact.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:fvquwo6ronfruznx@test-memoryapp-whqlxd:27017/?authSource=admin&directConnection=true'

let cachedDb = null

async function connectToDatabase() {
    if (cachedDb) return cachedDb
    const db = await mongoose.connect(MONGO_URI)
    cachedDb = db
    console.log('✅ Connected to MongoDB')
    return db
}

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Ensure database is connected before handling any API routes
app.use('/api', async (req, res, next) => {
    try {
        await connectToDatabase()
        next()
    } catch (err) {
        console.error('❌ MongoDB connection error:', err)
        res.status(500).json({
            error: 'Database connection failed',
            details: 'The server could not connect to the MongoDB database. Please ensure the MONGO_URI environment variable is set correctly in Vercel.',
            errorMessage: err.message
        })
    }
})

// API Routes
app.use('/api/properties', propertiesRouter)
app.use('/api/contact', contactRouter)

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Seranex Properties API server running on http://localhost:${PORT}`)
    })
}

export default app;
