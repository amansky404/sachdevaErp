const defaultLocale = 'en-IN'
const defaultCurrency = 'INR'

export function formatCurrency(value: number, currency = defaultCurrency, locale = defaultLocale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export function formatNumber(value: number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatPercent(value: number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value)
}

export function formatDateTime(value: Date, locale = defaultLocale) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(value)
}
