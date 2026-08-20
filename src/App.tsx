import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { PropertyProvider } from './contexts/PropertyContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Properties } from './pages/Properties'
import { PropertyDetail } from './pages/PropertyDetail'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import { Admin } from './pages/Admin'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [pathname])
    return null
}

export function App() {
    return (
        <PropertyProvider>
            <BrowserRouter>
                <ScrollToTop />
                <div className="flex min-h-screen w-full flex-col bg-white">
                    <Header />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/properties" element={<Properties />} />
                            <Route path="/properties/:id" element={<PropertyDetail />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </PropertyProvider>
    )
}
