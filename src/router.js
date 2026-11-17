import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Catalog from './views/Catalog.vue'
import Product from './views/Product.vue'
import Design from './views/Design.vue'
import Auth from './views/Auth.vue'
import Account from './views/Account.vue'
import Cart from './views/Cart.vue'
import Checkout from './views/Checkout.vue'
import Contact from './views/Contact.vue'
import Wishlist from './views/Wishlist.vue'
import Order from './views/Order.vue'
import Admin from './views/Admin.vue'
import NotFound from './views/NotFound.vue'
import { clearToast } from './lib/store.js'
export const router = createRouter({ history: createWebHistory(), scrollBehavior(to) { return to.hash ? { el: to.hash, top: 110, behavior: 'smooth' } : { top: 0 } }, routes: [
  { path: '/', component: Home, meta: { title: 'Farbe für Regentage' } },
  ...Object.entries({ damen: 'women', herren: 'men', kinder: 'kids', hunde: 'dogs' }).map(([path, category]) => ({ path: `/${path}`, component: Catalog, props: { category } })),
  { path: '/produkt/:id', component: Product }, { path: '/dein-design', component: Design, meta: { title: 'Dein Design' } },
  { path: '/login', component: Auth }, { path: '/registrieren', component: Auth }, { path: '/konto', component: Account },
  { path: '/warenkorb', component: Cart }, { path: '/kasse', component: Checkout }, { path: '/kontakt', component: Contact },
  { path: '/wunschliste', component: Wishlist }, { path: '/bestellung/:id', component: Order },
  { path: '/admin', redirect: '/admin/produkte' }, { path: '/admin/:section', component: Admin },
  { path: '/:pathMatch(.*)*', component: NotFound }
] })
router.beforeEach(() => { clearToast() })
router.afterEach(to => { document.title = `${to.meta.title || 'Shop'} · Rainbow.design` })
