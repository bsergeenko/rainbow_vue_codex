import { test, expect } from '@playwright/test'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
let catalog, designs, customColors, shipping
const user = { id: 'test-user', firstName: 'Mara', lastName: 'Winter', email: 'mara@example.test', role: 'user', address: { street: 'Regenweg 4', postalCode: '10115', city: 'Berlin', country: 'Deutschland' } }
test.beforeAll(async ({ request }) => {
  const get = async path => { const r = await request.get(`http://localhost:3000/${path}`); expect(r.ok()).toBeTruthy(); return r.json() }
  ;[catalog, designs, customColors, shipping] = await Promise.all(['products', 'designs', 'custom-colors', 'shipping-options'].map(get))
})
async function setup(page, options = {}) {
  const data = { user: options.user || null, cart: structuredClone(options.cart || []), wishlist: [], orders: structuredClone(options.orders || []), admins: options.admins || [], requests: [], products: structuredClone(catalog), contacts: [], ...options }
  await page.route('http://localhost:3000/**', async route => {
    const req = route.request(), path = new URL(req.url()).pathname, method = req.method(), body = req.postDataJSON()
    if (path.startsWith('/assets/')) return route.continue()
    data.requests.push({ path, method, body })
    const send = (json, status = 200) => route.fulfill({ status, contentType: 'application/json', json })
    if (method === 'GET') {
      if (path === '/products') return send(data.products)
      if (path.startsWith('/products/')) return send(data.products.find(p => p.id === path.split('/')[2]) || { message: 'Produkt nicht gefunden.' }, data.products.some(p => p.id === path.split('/')[2]) ? 200 : 404)
      if (path === '/designs') return send(designs)
      if (path === '/custom-colors') return send(customColors)
      if (path === '/shipping-options') return send(shipping)
      if (path === '/me') return send(data.user || { message: 'Nicht eingeloggt.' }, data.user ? 200 : 401)
      if (path === '/cart') return send(data.cart)
      if (path === '/wishlist') return send(data.wishlist)
      if (path === '/orders') return send(data.orders)
      if (path === '/users') return send([user])
      if (path === '/admins') return send(data.admins)
    }
    if (path === '/login') { if (body.password === 'falsch') return send({ message: 'Ungültig' }, 401); data.user = options.loginUser || structuredClone(user); return send(data.user) }
    if (path === '/register') return send({ id: 'registered' }, 201)
    if (path === '/logout' || (path === '/me' && method === 'DELETE')) { data.user = null; return send({ message: 'Erfolgreich' }) }
    if (path === '/me' && method === 'PUT') { data.user = { ...data.user, ...body, address: { street: body.street, postalCode: body.postalCode, city: body.city, country: body.country } }; return send(data.user) }
    if (path === '/me/password') return send({ message: 'Erfolgreich' })
    if (path === '/cart' && method === 'POST') { data.cart.push({ ...body, itemId: 'item-' + data.cart.length }); return send(data.cart.at(-1), 201) }
    if (path.startsWith('/cart/')) { const id = path.split('/')[2]; if (method === 'DELETE') data.cart = data.cart.filter(item => item.itemId !== id); else data.cart.find(item => item.itemId === id).quantity = body.quantity; return send({}) }
    if (path === '/wishlist' && method === 'POST') { data.wishlist.push({ ...body, itemId: 'wish-1', product: data.products.find(p => p.id === body.productId) }); return send({}) }
    if (path.startsWith('/wishlist/') && method === 'DELETE') { data.wishlist = []; return send({}) }
    if (path === '/orders' && method === 'POST') { const items = body.items.map(item => { const p = data.products.find(p => p.id === item.productId); return { ...item, unitPrice: p.pricesBySize?.[item.size] ?? p.price } }); const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0); const shippingCost = shipping.find(s => s.id === body.shippingMethod).price; const order = { ...body, items, id: 'order-test-1', createdAt: new Date().toISOString(), status: 'new', userId: data.user?.id || null, subtotal, shippingCost, total: subtotal + shippingCost }; data.orders.push(order); data.cart = []; if (body.saveAddress) data.user.address = { ...body.customer }; return send(order, 201) }
    if (/\/orders\/[^/]+\/(cancel|status)$/.test(path)) { const order = data.orders.find(o => o.id === path.split('/')[2]); order.status = path.endsWith('/cancel') ? 'cancelled' : body.status; return send(order) }
    if (path === '/contact') { data.contacts.push(body); return send({ message: 'Erfolgreich' }) }
    if (path.startsWith('/products/') && method === 'PUT') { Object.assign(data.products.find(p => p.id === path.split('/')[2]), body); return send(data.products.find(p => p.id === path.split('/')[2])) }
    if (path === '/admins' && method === 'POST') { data.admins.push({ ...body, id: 'admin-new', role: 'admin', createdAt: new Date().toISOString() }); return send(data.admins.at(-1)) }
    if (path.startsWith('/admins/')) { const id = path.split('/')[2]; if (method === 'DELETE') data.admins = data.admins.filter(a => a.id !== id); else Object.assign(data.admins.find(a => a.id === id), body); return send({}) }
    return send({ message: 'Unerwarteter Endpunkt: ' + method + ' ' + path }, 500)
  })
  return data
}
const line = () => ({ itemId: 'cart-1', productId: 'women-raincoat', color: 'red', size: 'M', quantity: 2, designId: null, pocketRequest: '' })
const order = status => ({ id: 'order-123', userId: user.id, customer: { ...user, ...user.address }, items: [{ ...line(), unitPrice: 50 }], subtotal: 100, shippingMethod: 'standard', shippingCost: 4.99, total: 104.99, paymentMethod: 'card', status, createdAt: '2026-11-10T12:00:00Z' })
test('Startseite: bereitgestellte Assets, Navigation und responsive Darstellung', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message))
  await setup(page); await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Rainbow Design bringt')
  await expect(page.locator('.category-tile')).toHaveCount(4)
  await expect(page.locator('.home-design-card')).toHaveCount(4)
  await expect(page.locator('.category-tile img').first()).toHaveJSProperty('complete', true)
  await page.screenshot({ path: '.local/home-desktop.png', fullPage: true })
  for (const width of [768, 390, 320]) { await page.setViewportSize({ width, height: 900 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy(); await expect(page.getByRole('link', { name: 'Wunschliste', exact: true })).toBeVisible() }
  await page.screenshot({ path: '.local/home-mobile.png', fullPage: true })
  await page.getByRole('button', { name: 'Menü öffnen' }).click(); await page.getByRole('navigation', { name: 'Mobile Hauptnavigation' }).getByRole('link', { name: 'Kinder', exact: true }).click(); await expect(page).toHaveURL('/kinder')
  expect(errors).toEqual([])
})
test('Kategorien, Kinderfilter und Suche zeigen die richtigen Farbvarianten', async ({ page }) => {
  await setup(page); await page.goto('/kinder')
  await expect(page.locator('.product-card')).toHaveCount(catalog.filter(p => p.category === 'kids').reduce((n,p) => n + Object.keys(p.imagesByColor).length, 0))
  await page.getByRole('button', { name: 'Jungen', exact: true }).click(); await expect(page.locator('.product-card')).toHaveCount(Object.keys(catalog.find(p => p.subcategory === 'boys').imagesByColor).length)
  await expect(page.locator('.product-meta strong').first()).toContainText('ab')
  await page.getByRole('button', { name: 'Suche öffnen' }).click(); await page.getByLabel('Wonach suchst du?').fill('FRAU aquablau')
  await expect(page.locator('.search-result')).toHaveCount(1); await page.locator('.search-result').click(); await expect(page).toHaveURL(/farbe=aquablue/)
  await expect(page.getByRole('button', { name: 'Aquablau', exact: true })).toHaveAttribute('aria-pressed', 'true')
})
test('Produkt: Pflichtgröße, Galerie, Kinderpreis und korrektes Warenkorb-Payload', async ({ page }) => {
  const data = await setup(page); await page.goto('/produkt/kids-raincoat-girls?farbe=blue')
  await page.getByRole('button', { name: 'In den Warenkorb', exact: true }).click(); await expect(page.getByText('Bitte wähle eine Größe aus.')).toBeVisible(); expect(data.cart).toHaveLength(0)
  await page.getByRole('button', { name: 'Ansicht 2 anzeigen' }).click(); await expect(page.locator('.main-product-image img')).toHaveAttribute('src', /front/)
  await page.getByRole('button', { name: '8–12 Jahre', exact: true }).click(); await expect(page.locator('.large-price')).toContainText('32,00')
  await page.getByRole('button', { name: 'In den Warenkorb', exact: true }).click(); await expect(page.getByRole('status').filter({ hasText: 'liegt im Warenkorb' })).toBeVisible()
  expect(data.cart[0]).toMatchObject({ productId: 'kids-raincoat-girls', color: 'blue', size: '8-12', quantity: 1 })
  await expect(page.locator('.cart-count')).toHaveText('1')
  await page.goto('/produkt/women-trenchcoat'); await expect(page.locator('.custom-callout')).toHaveCount(0)
})
test('Dein Design: Katalog, freie Motivverwendung, fehlende Vorschau und neuer Einstieg', async ({ page }) => {
  const data = await setup(page); await page.goto('/dein-design')
  await expect(page.locator('.design-card')).toHaveCount(designs.adult.length + designs.kids.length)
  await page.getByRole('button', { name: 'Kinder', exact: true }).click(); await expect(page.locator('.design-card')).toHaveCount(designs.kids.length)
  await page.locator('.design-card').first().click(); await page.getByRole('button', { name: 'Herren', exact: true }).click(); await page.getByRole('button', { name: 'Magenta', exact: true }).click()
  await expect(page.getByText('Für diese Farbe ist kein Vorschaubild vorhanden.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'M', exact: true }).click(); await page.getByLabel('Taschendesign').fill('Kleine Sterne')
  await page.getByRole('button', { name: 'In den Warenkorb', exact: true }).click(); await expect(page.locator('.cart-count')).toHaveText('1')
  expect(data.cart[0]).toMatchObject({ productId: 'men-raincoat', designId: designs.kids[0].id, color: 'magenta', size: 'M', pocketRequest: 'Kleine Sterne' })
  await page.getByRole('navigation', { name: 'Hauptnavigation', exact: true }).getByRole('link', { name: 'Dein Design', exact: true }).click(); await expect(page.locator('.design-card')).toHaveCount(designs.adult.length + designs.kids.length)
  await page.goto('/'); await page.locator('.home-design-card').nth(2).click(); await expect(page.locator('.selected-design img')).toHaveAttribute('src', /adult\/designe03.jpg/); await expect(page.locator('.config-summary')).toContainText('Bitte auswählen')
  await page.getByRole('button', { name: 'Kinder', exact: true }).click(); await page.getByRole('button', { name: 'Jungen', exact: true }).click(); await page.getByRole('button', { name: 'Aquablau', exact: true }).click(); await page.getByRole('button', { name: '4–7 Jahre', exact: true }).click(); await expect(page.locator('.summary-price')).toContainText('28,00'); await page.getByRole('button', { name: 'In den Warenkorb', exact: true }).click(); await expect(page.locator('.cart-count')).toHaveText('2'); expect(data.cart[1]).toMatchObject({ productId: 'kids-raincoat-boys', size: '4-7', designId: designs.adult[2].id, pocketRequest: '' })
})
test('Wunschliste erfordert Login und speichert die ausgewählte Farbe', async ({ page }) => {
  const data = await setup(page); await page.goto('/produkt/women-raincoat?farbe=red'); await page.getByRole('button', { name: 'Zur Wunschliste hinzufügen' }).click(); await expect(page).toHaveURL('/login')
  await page.getByLabel('E-Mail-Adresse').fill(user.email); await page.getByLabel(/^Passwort\s*\*?$/).fill('falsch'); await page.getByRole('button', { name: 'Anmelden', exact: true }).click(); await expect(page.getByRole('alert')).toHaveText('E-Mail-Adresse oder Passwort ist falsch.')
  await page.getByLabel(/^Passwort\s*\*?$/).fill('richtig'); await page.getByRole('button', { name: 'Anmelden', exact: true }).click(); await expect(page).toHaveURL('/konto')
  await page.goto('/produkt/women-raincoat?farbe=red'); await page.getByRole('button', { name: 'Zur Wunschliste hinzufügen' }).click(); await expect(page.getByRole('button', { name: 'Aus Wunschliste entfernen' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('link', { name: 'Wunschliste', exact: true }).click(); await expect(page.locator('.product-card')).toHaveCount(1); expect(data.wishlist[0].color).toBe('red')
  await page.getByRole('button', { name: 'Aus Wunschliste entfernen' }).click(); await expect(page.getByText('Deine Wunschliste ist leer.')).toBeVisible()
})
test('Registrierung prüft Passwörter und sendet keine Bestätigung', async ({ page }) => {
  const data = await setup(page); await page.goto('/registrieren')
  for (const [label,value] of [['Vorname','Mara'],['Nachname','Winter'],['E-Mail-Adresse',user.email],['Passwort','sicher'],['Passwortbestätigung','anders']]) await page.getByLabel(new RegExp('^' + label + '\\s*\\*?$')).fill(value)
  await page.getByRole('button', { name: 'Konto erstellen' }).click(); await expect(page.getByText('Die Passwörter stimmen nicht überein.').first()).toBeVisible(); expect(data.requests.some(r => r.path === '/register')).toBeFalsy()
  await page.getByLabel('Passwortbestätigung').fill('sicher'); await page.getByRole('button', { name: 'Konto erstellen' }).click(); await expect(page).toHaveURL('/login')
  expect(data.requests.find(r => r.path === '/register').body).not.toHaveProperty('confirm'); await expect(page.getByText('Deine Registrierung war erfolgreich.', { exact: false })).toBeVisible()
})
test('Warenkorb: Menge, Löschen und Rückkehr nach Anmeldung', async ({ page }) => {
  const data = await setup(page, { cart: [line()] }); await page.goto('/warenkorb')
  await expect(page.locator('.cart-count')).toHaveText('2'); await page.getByRole('button', { name: /Menge.*erhöhen/ }).click(); await expect(page.locator('.quantity-control span')).toHaveText('3')
  await page.locator('.cart-login').getByRole('link', { name: 'Anmelden' }).click(); await page.getByLabel('E-Mail-Adresse').fill(user.email); await page.getByLabel(/^Passwort\s*\*?$/).fill('sicher'); await page.getByRole('button', { name: 'Anmelden', exact: true }).click(); await expect(page).toHaveURL('/warenkorb'); await expect(page.locator('.quantity-control span')).toHaveText('3')
  await page.getByRole('button', { name: 'Löschen', exact: true }).click(); await expect(page.getByText('Dein Warenkorb ist leer.')).toBeVisible(); expect(data.cart).toHaveLength(0); await expect(page.getByRole('link', { name: 'Zur Kasse', exact: true })).toHaveCount(0)
  await page.goto('/kasse'); await expect(page).toHaveURL('/warenkorb')
})
test('Checkout: gültige Pflichtdaten, Versandpreis und keine Übertragung von Kartendaten', async ({ page }) => {
  const data = await setup(page, { user: structuredClone(user), cart: [line()] }); await page.goto('/kasse')
  await expect(page.getByLabel('Vorname')).toHaveValue('Mara'); await page.getByRole('button', { name: 'Zahlungspflichtig bestellen' }).click(); expect(data.orders).toHaveLength(0)
  await page.getByLabel('Kartennummer').fill('4242424242424242'); await page.getByLabel('Ablaufdatum').fill('12/28'); await page.getByLabel('Sicherheitscode').fill('123'); await page.getByLabel('Standardversand').check(); await page.getByLabel('Diese Adresse in meinem Konto speichern').check()
  await page.getByRole('button', { name: 'Zahlungspflichtig bestellen' }).click(); await expect(page.getByRole('heading', { name: 'Danke für deine Bestellung!' })).toBeVisible(); await expect(page.locator('.cart-count')).toHaveCount(0)
  const body = data.requests.find(r => r.path === '/orders' && r.method === 'POST').body; expect(body.paymentMethod).toBe('card'); expect(body.saveAddress).toBe(true); expect(JSON.stringify(body)).not.toContain('424242'); expect(JSON.stringify(body)).not.toContain('12/28'); expect(body.customer.street).toBe('Regenweg 4'); await expect(page.getByText('104,99', { exact: false }).first()).toBeVisible()
  await page.getByRole('link', { name: 'Meine Bestellungen', exact: true }).click(); await expect(page.getByText('order-test-1', { exact: true })).toBeVisible()
})
test('Konto: Bearbeitung, Stornierung, Passwortänderung und bestätigte Kontolöschung', async ({ page }) => {
  const data = await setup(page, { user: structuredClone(user), orders: [order('new')] }); await page.goto('/konto')
  await expect(page.locator('#persoenliche-daten input')).toHaveCount(0); await page.getByRole('button', { name: 'Bearbeiten', exact: true }).click(); await page.getByLabel('Vorname').fill('Maria'); await page.getByRole('button', { name: 'Speichern', exact: true }).click(); await expect(page.getByRole('heading', { level: 1 })).toContainText('Maria')
  await page.getByRole('button', { name: 'Details ansehen' }).click(); page.once('dialog', dialog => dialog.accept()); await page.getByRole('button', { name: 'Bestellung stornieren' }).click(); await expect(page.locator('.order-row .status-badge')).toHaveText('Storniert'); await expect(page.getByText('einschließlich Versandkosten wird auf die ursprünglich verwendete Zahlungsmethode zurückerstattet.', { exact: false })).toBeVisible(); expect(data.orders[0].status).toBe('cancelled')
  await page.getByRole('button', { name: 'Passwort ändern', exact: true }).click(); await page.getByLabel('Aktuelles Passwort').fill('alt'); await page.getByLabel(/^Neues Passwort\s*\*?$/).fill('neu'); await page.getByLabel('Neues Passwort bestätigen').fill('neu'); await page.getByRole('button', { name: 'Passwort speichern' }).click(); await expect(page.getByText('Dein Passwort wurde geändert.')).toBeVisible(); expect(data.requests.find(r => r.path === '/me/password').body).toEqual({ currentPassword: 'alt', newPassword: 'neu' })
  page.once('dialog', dialog => dialog.accept()); await page.getByRole('button', { name: 'Konto löschen' }).click(); await expect(page).toHaveURL('/'); expect(data.user).toBeNull(); expect(data.orders).toHaveLength(1)
})
test('Kontakt: vorausgefüllte Daten, leeres Formular nach Senden, temporäre Meldung', async ({ page }) => {
  const data = await setup(page, { user: structuredClone(user) }); await page.goto('/kontakt'); await expect(page.getByLabel('Name', { exact: false }).first()).toHaveValue('Mara Winter'); await page.getByLabel('Betreff').fill('Mein Motiv'); await page.getByLabel(/^Nachricht\s*\*?$/).fill('Hallo Rainbow!'); await page.getByRole('button', { name: 'Nachricht senden' }).click(); await expect(page.getByText('Vielen Dank für deine Nachricht.')).toBeVisible(); await expect(page.getByLabel('Betreff')).toHaveValue(''); expect(data.contacts).toHaveLength(1)
  await page.getByRole('navigation', { name: 'Hauptnavigation', exact: true }).getByRole('link', { name: 'Damen', exact: true }).click(); await expect(page.getByText('Vielen Dank für deine Nachricht.')).toHaveCount(0)
})
test('Admin: eigenständige Oberfläche, Produkte bearbeiten, Bestellkontext und Rollenrechte', async ({ page }) => {
  const admin = { ...user, id: 'admin-1', role: 'admin' }; const main = { ...user, id: 'main', role: 'main_admin', firstName: 'Hauptadmin' }
  const data = await setup(page, { loginUser: admin, admins: [main, admin], orders: [order('new'), { ...order('cancelled'), id: 'order-cancelled' }] }); await page.goto('/login'); await page.getByLabel('E-Mail-Adresse').fill(admin.email); await page.getByLabel(/^Passwort\s*\*?$/).fill('sicher'); await page.getByRole('button', { name: 'Anmelden', exact: true }).click(); await expect(page).toHaveURL('/admin/produkte'); await expect(page.locator('.site-footer, .desktop-nav')).toHaveCount(0)
  await page.getByRole('button', { name: 'Bearbeiten', exact: true }).first().click(); await page.getByLabel('Produktname').fill('Neuer Regenmantel'); await page.getByRole('button', { name: 'Speichern', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Neuer Regenmantel', exact: true })).toBeVisible(); expect(data.products[0].name).toBe('Neuer Regenmantel')
  await page.getByRole('link', { name: 'Bestellungen', exact: true }).click(); await page.getByRole('button', { name: 'Details ansehen' }).first().click(); await expect(page.getByRole('navigation', { name: 'Admin-Navigation' })).toBeVisible(); await expect(page.locator('.order-details')).toContainText('Zugeordneter Benutzer:'); await page.getByLabel('Bestellstatus ändern').selectOption('shipped'); await expect(page.locator('.order-row .status-badge').first()).toHaveText('Versendet')
  await page.getByRole('button', { name: 'Details ansehen' }).last().click(); await expect(page.locator('.expanded-order .status-edit')).toHaveCount(0)
  await page.getByRole('link', { name: 'Benutzer', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Mara Winter' })).toBeVisible(); await expect(page.locator('.order-card')).toHaveCount(2); await expect(page.getByRole('button', { name: 'Bearbeiten', exact: true })).toHaveCount(0)
  await page.getByRole('link', { name: 'Administratoren', exact: true }).click(); await expect(page.getByRole('button', { name: 'Administrator anlegen', exact: false })).toHaveCount(0); await expect(page.getByRole('button', { name: 'Bearbeiten', exact: true })).toHaveCount(1); await expect(page.getByRole('button', { name: 'Löschen', exact: true })).toHaveCount(0)
})
test('Hauptadministrator kann Administratoren erstellen und fremde Konten löschen', async ({ page }) => {
  const main = { ...user, id: 'main', role: 'main_admin' }; const data = await setup(page, { user: main, admins: [main] }); await page.goto('/admin/administratoren'); await page.getByRole('button', { name: 'Administrator anlegen', exact: false }).click(); await page.getByLabel('Vorname').fill('Alex'); await page.getByLabel('Nachname').fill('Sommer'); await page.getByLabel('E-Mail-Adresse').fill('alex@example.test'); await page.getByLabel(/^Passwort\s*\*?$/).fill('sicher'); await page.getByRole('button', { name: 'Administrator anlegen', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Alex Sommer' })).toBeVisible(); expect(data.admins.at(-1).role).toBe('admin')
  page.once('dialog', dialog => dialog.accept()); await page.getByRole('button', { name: 'Löschen', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Alex Sommer' })).toHaveCount(0)
})
test('Fehlerfälle: 404, unbekanntes Produkt und Backend-Ausfall', async ({ page }) => {
  await setup(page); await page.goto('/gibt-es-nicht'); await expect(page.getByText('404 · Seite nicht gefunden')).toBeVisible(); await page.goto('/produkt/gibt-es-nicht'); await expect(page.getByText('404 · Seite nicht gefunden')).toBeVisible()
  await page.route('http://localhost:3000/products', route => route.abort()); await page.goto('/'); await expect(page.getByText('Der Shop ist gerade nicht erreichbar.', { exact: false })).toBeVisible(); await expect(page.getByRole('button', { name: 'Erneut versuchen' })).toBeVisible()
})
test('Gastbestellung: Formularprüfung und Bestellung ohne Benutzerzuordnung', async ({ page }) => {
  const data = await setup(page, { cart: [line()] }); await page.goto('/kasse')
  for (const [label, value] of [['Vorname','Mara'],['Nachname','Winter'],['E-Mail-Adresse',user.email],['Straße und Hausnummer','Regenweg 4'],['Postleitzahl','10115'],['Ort','Berlin'],['Land','Deutschland']]) await page.getByLabel(label).fill(value)
  await expect(page.getByLabel('Diese Adresse in meinem Konto speichern')).toHaveCount(0); await page.getByLabel('Kartennummer').fill('4242424242424242'); await page.getByLabel('Ablaufdatum').fill('13/28'); await page.getByLabel('Sicherheitscode').fill('123'); await page.getByLabel('Standardversand').check(); await page.getByRole('button', { name: 'Zahlungspflichtig bestellen' }).click(); expect(data.orders).toHaveLength(0); await expect(page.getByText('Format MM/YY, zum Beispiel 12/28')).toBeVisible()
  await page.getByLabel('Ablaufdatum').fill('12/28'); await page.getByRole('button', { name: 'Zahlungspflichtig bestellen' }).click(); await expect(page.getByRole('heading', { name: 'Danke für deine Bestellung!' })).toBeVisible(); expect(data.orders[0].userId).toBeNull(); expect(data.requests.find(r => r.path === '/orders' && r.method === 'POST').body).not.toHaveProperty('saveAddress')
})
test('Alle Shopseiten bleiben auf schmalen Displays innerhalb des Bildschirms', async ({ page }) => {
  await setup(page, { user: structuredClone(user), cart: [line()], orders: [order('new')] })
  for (const path of ['/damen', '/herren', '/kinder', '/hunde', '/produkt/women-raincoat', '/dein-design?motiv=adult-design-01', '/warenkorb', '/kasse', '/konto', '/kontakt', '/wunschliste', '/registrieren']) {
    await page.setViewportSize({ width: 320, height: 850 })
    await page.goto(path)
    await expect(page.locator('.loading-page')).toHaveCount(0)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBeTruthy()
  }
  await page.goto('/produkt/women-raincoat?farbe=red')
  await page.screenshot({ path: '.local/product-mobile.png', fullPage: true })
})
test('requirements.md bleibt unverändert', async () => {
  expect(createHash('sha256').update(await readFile('requirements.md')).digest('hex')).toBe('60da65760b339134a73840bb2aee13b8bd157a7cc2e29d8f58347543f158a5f9')
})


