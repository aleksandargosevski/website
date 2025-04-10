export const slugify = (text) => {
  // Normalize the string to decompose combined letters like "č" into "c" and combining marks.
  const decomposed = text.normalize('NFD')

  // Remove all non-ASCII characters such as diacritics
  const removedDiacritics = decomposed.replace(/[\u0300-\u036f]/g, '')

  // Replace all non-word characters (except '-') with hyphen
  const hyphens = removedDiacritics.replace(/[\s\W-]+/g, '-')

  // Convert to lowercase, trim hyphens from start and end, and replace multiple hyphens with a single one
  const slug = hyphens.toLowerCase().replace(/^-+|-+$/g, '').replace(/--+/g, '-')

  return slug
}

export const formatPrice = (value, currency, locale = 'en-US') => {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const formatNumber = (value, locale = 'en-US') => {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const preloadImages = (images) => {
  images = Array.isArray(images) ? images : [images]

  images.forEach((image) => {
    const img = new Image()
    img.src = image
  })
}
