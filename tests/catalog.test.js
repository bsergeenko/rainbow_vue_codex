import test from 'node:test'
import assert from 'node:assert/strict'
import { price, priceLabel, searchProducts, variants, sizeLabel, asset } from '../src/lib/catalog.js'
const product = { id: 'test', name: 'Regenmantel', category: 'women', price: 50, imagesByColor: { red: ['/assets/rot.jpg'], blue: ['/assets/blau.jpg'], pink: [] } }
test('Jede bebilderte Farbvariante wird einzeln angezeigt', () => { assert.deepEqual(variants([product]).map(v => v.color), ['red', 'blue']) })
test('Kinderpreise wechseln vom Mindestpreis zum Größenpreis', () => { const kids = { pricesBySize: { '2-3': 25, '4-7': 28, '8-12': 32 } }; assert.equal(price(kids), 25); assert.equal(price(kids, '8-12'), 32); assert.match(priceLabel(kids), /^ab 25/); assert.doesNotMatch(priceLabel(kids, '4-7'), /^ab/); assert.equal(sizeLabel('4-7'), '4–7 Jahre') })
test('Suche berücksichtigt deutsche Synonyme, Großschreibung und passende Farben', () => { assert.equal(searchProducts([product], 'FRAU').length, 2); assert.deepEqual(searchProducts([product], 'Damen ROT').map(v => v.color), ['red']); assert.equal(searchProducts([product], 'Herren').length, 0); assert.equal(searchProducts([product], '').length, 0) })
test('Alle Bildpfade zeigen auf das Backend', () => { assert.equal(asset('/assets/logo.svg'), 'http://localhost:3000/assets/logo.svg') })
