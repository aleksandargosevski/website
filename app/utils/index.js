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

export const formatDate = (date, options = { year: 'numeric', month: 'short', day: '2-digit' }) => {
  return new Date(date).toLocaleDateString('en-GB', options)
}

export const padNumber = (value, length = 3) => String(value).padStart(length, '0')

export const readingTime = (body, wordsPerMinute = 230) => {
  const collectText = (node) => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.slice(2).map(collectText).join(' ')
    return ''
  }
  const text = (body?.value ?? []).map(collectText).join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

const tones = ['butter', 'mint', 'bubblegum', 'sky', 'lilac']

const tagTones = {
  css: 'sky',
  sass: 'bubblegum',
  grid: 'bubblegum',
  programming: 'lilac',
  architecture: 'lilac',
  ai: 'lilac',
  git: 'butter',
  javascript: 'butter',
  backbonejs: 'butter',
  vim: 'mint',
  neovim: 'mint',
  productivity: 'mint',
  ansible: 'mint',
  devops: 'mint',
}

export const tagTone = (tag = '') => {
  if (tagTones[tag]) return tagTones[tag]
  const hash = [...tag].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return tones[hash % tones.length]
}

const tagIcons = {
  programming: 'lucide:braces',
  architecture: 'lucide:blocks',
  ai: 'lucide:sparkles',
  css: 'lucide:palette',
  sass: 'mdi:sass',
  grid: 'lucide:layout-grid',
  git: 'lucide:git-commit-horizontal',
  javascript: 'mdi:language-javascript',
  backbonejs: 'lucide:layers',
  vim: 'lucide:square-terminal',
  neovim: 'lucide:square-terminal',
  productivity: 'lucide:zap',
  ansible: 'mdi:ansible',
  devops: 'lucide:server',
}

export const tagIcon = tag => tagIcons[tag] ?? 'lucide:file-text'

export const postIcon = (tags = []) => {
  const specific = tags.find(tag => tag !== 'programming') ?? tags[0]
  return tagIcon(specific)
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
