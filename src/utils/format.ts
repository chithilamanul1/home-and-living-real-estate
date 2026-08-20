export function formatPrice(price: number, suffix?: string): string {
    const value = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        maximumFractionDigits: 0,
    }).format(price)
    // Intl may render "LKR" — replace with "Rs."
    const display = value.replace(/LKR\s?/, 'Rs. ')
    return suffix ? `${display} ${suffix}` : display
}

export function formatArea(area: number, unit: string): string {
    return `${new Intl.NumberFormat('en-LK').format(area)} ${unit}`
}
