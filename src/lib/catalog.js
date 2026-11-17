export const API = 'http://localhost:3000'
export const asset = path => path ? `${API}${path}` : ''
export const categories = { women: 'Damen', men: 'Herren', kids: 'Kinder', dogs: 'Hunde' }
export const categoryPaths = { women: '/damen', men: '/herren', kids: '/kinder', dogs: '/hunde' }
export const subcategories = { girls: 'Mädchen', boys: 'Jungen' }
export const colors = { black: 'Schwarz', red: 'Rot', blue: 'Blau', aquablue: 'Aquablau', turquoise: 'Türkis', pink: 'Rosa', yellow: 'Gelb', plum: 'Pflaume', green: 'Grün', grey: 'Grau', magenta: 'Magenta', beige: 'Beige', brown: 'Braun', orange: 'Orange', silver: 'Silber' }
export const swatches = { black: '#27282c', red: '#c94446', blue: '#385caa', aquablue: '#8acadd', turquoise: '#3baba6', pink: '#e7b8c5', yellow: '#e9c956', plum: '#784659', green: '#658c68', grey: '#9b9b98', magenta: '#b63f81', beige: '#d7c6ab', brown: '#8b6046', orange: '#dd813c', silver: '#c5c9cc' }
export const statuses = { new: 'Bestätigt', processing: 'In Bearbeitung', shipped: 'Versendet', delivered: 'Zugestellt', cancelled: 'Storniert' }
export const roles = { user: 'Benutzer', admin: 'Administrator', main_admin: 'Hauptadministrator' }
export const money = value => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(value || 0))
export const sizeLabel = size => ({ '2-3': '2–3 Jahre', '4-7': '4–7 Jahre', '8-12': '8–12 Jahre' }[size] || size)
export const price = (product, size) => product?.pricesBySize ? (product.pricesBySize[size] ?? Math.min(...Object.values(product.pricesBySize))) : (product?.price ?? 0)
export const priceLabel = (product, size) => `${product?.pricesBySize && !size ? 'ab ' : ''}${money(price(product, size))}`
export const imageColors = product => Object.keys(product?.imagesByColor || {}).filter(color => product.imagesByColor[color]?.length)
export const variants = products => products.flatMap(product => imageColors(product).map(color => ({ product, color })))
export const productLink = (product, color) => ({ path: `/produkt/${product.id}`, query: { farbe: color } })
export const designLabel = design => design ? `Motiv ${design.id.split('-').at(-1)} · ${design.id.startsWith('adult') ? 'Erwachsene' : 'Kinder'}` : 'Keine Angabe'
export const dateLabel = value => new Date(value).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
export function searchProducts(products, query) {
  const terms = query.trim().toLocaleLowerCase('de').split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  const synonyms = { women: 'damen frau frauen', men: 'herren mann männer', kids: 'kinder kind mädchen jungen', dogs: 'hunde hund' }
  return variants(products).filter(({ product, color }) => {
    const text = `${product.name} ${synonyms[product.category]} ${colors[color] || color}`.toLocaleLowerCase('de')
    return terms.every(term => text.includes(term))
  })
}
export const social = { instagram: 'https://www.instagram.com/rainbow.georgiandesign?stkn=dGE4M3drcmIxYndu', facebook: 'https://www.facebook.com/rainbow.georgiandesign' }
export const personFields = [
  { name: 'firstName', label: 'Vorname', autocomplete: 'given-name' },
  { name: 'lastName', label: 'Nachname', autocomplete: 'family-name' },
  { name: 'email', label: 'E-Mail-Adresse', type: 'email', autocomplete: 'email' },
  { name: 'street', label: 'Straße und Hausnummer', autocomplete: 'street-address' },
  { name: 'postalCode', label: 'Postleitzahl', autocomplete: 'postal-code' },
  { name: 'city', label: 'Ort', autocomplete: 'address-level2' },
  { name: 'country', label: 'Land', autocomplete: 'country-name' }
]
export const personData = user => Object.fromEntries(personFields.map(f => [f.name, user?.[f.name] ?? user?.address?.[f.name] ?? '']))
