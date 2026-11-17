import { reactive } from 'vue'
import { API, price } from './catalog.js'
export const state = reactive({ user: null, products: [], designs: [], customColors: [], cart: [], wishlist: [], shipping: [], loading: true, loadError: '', toast: null, pending: 0, lastOrder: null, designEntry: 0 })
let toastTimer
export function clearToast() { clearTimeout(toastTimer); state.toast = null }
export function notify(message, error = false) { clearToast(); state.toast = { message, error }; toastTimer = setTimeout(clearToast, 6000) }
export async function api(path, options = {}) {
  state.pending++
  try {
    const response = await fetch(`${API}${path}`, { credentials: 'include', ...options, headers: { 'Content-Type': 'application/json', ...options.headers }, body: options.body === undefined ? undefined : JSON.stringify(options.body) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) { const error = new Error(data.message || 'Die Anfrage konnte nicht abgeschlossen werden. Bitte versuche es erneut.'); error.status = response.status; throw error }
    return data
  } catch (error) {
    if (error instanceof TypeError) throw new Error('Der Shop ist gerade nicht erreichbar. Bitte versuche es erneut.')
    throw error
  } finally { state.pending-- }
}
export async function refreshUser() {
  try { state.user = await api('/me') } catch (error) { if (error.status === 401 || error.status === 404) state.user = null; else throw error }
}
export async function refreshCart() { state.cart = await api('/cart') }
export async function refreshWishlist() { state.wishlist = state.user ? await api('/wishlist') : [] }
export async function loadCatalog() {
  const results = await Promise.allSettled([
    api('/products').then(data => { state.products = data }),
    api('/designs').then(data => { state.designs = Object.entries(data).flatMap(([group, list]) => list.map(d => ({ ...d, group }))) }),
    api('/custom-colors').then(data => { state.customColors = data }),
    api('/shipping-options').then(data => { state.shipping = data })
  ])
  const failed = results.find(result => result.status === 'rejected')
  if (failed) throw failed.reason
}
export async function initialize() {
  state.loading = true; state.loadError = ''
  try { await Promise.all([loadCatalog(), refreshUser(), refreshCart()]); await refreshWishlist() }
  catch (error) { state.loadError = error.message }
  finally { state.loading = false }
}
export const isAdmin = () => ['admin', 'main_admin'].includes(state.user?.role)
export const savedItem = (id, color) => state.wishlist.find(item => item.productId === id && item.color === color)
export async function toggleWishlist(id, color) {
  const saved = savedItem(id, color)
  await api(saved ? `/wishlist/${saved.itemId}` : '/wishlist', { method: saved ? 'DELETE' : 'POST', ...(!saved && { body: { productId: id, color } }) })
  await refreshWishlist()
}
export async function addToCart(body) { await api('/cart', { method: 'POST', body: { ...body, quantity: 1 } }); await refreshCart(); notify('Dein Regenmantel liegt im Warenkorb.') }
export const cartProduct = item => state.products.find(product => product.id === item.productId)
export const cartPrice = item => item.unitPrice ?? price(cartProduct(item), item.size)
export const cartSubtotal = () => state.cart.reduce((sum, item) => sum + cartPrice(item) * item.quantity, 0)
export async function logout() { await api('/logout', { method: 'POST' }); state.user = null; state.wishlist = []; await refreshCart() }
