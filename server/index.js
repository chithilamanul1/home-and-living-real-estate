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

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err))

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))

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
