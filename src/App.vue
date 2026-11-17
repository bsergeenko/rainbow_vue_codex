<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { asset, categories, categoryPaths, productLink, priceLabel, searchProducts, social } from './lib/catalog.js'
import { state, initialize, isAdmin, logout, notify } from './lib/store.js'
import Icon from './components/Icon.vue'
const route = useRoute(), router = useRouter(), searchOpen = ref(false), menuOpen = ref(false), query = ref(''), searchInput = ref()
const links = [...Object.entries(categories).map(([key, label]) => ({ label, to: categoryPaths[key] })), { label: 'Dein Design', to: '/dein-design' }, { label: 'Über uns', to: '/#ueber-uns' }, { label: 'Kontakt', to: '/kontakt' }]
const cartCount = computed(() => state.cart.reduce((sum, item) => sum + item.quantity, 0))
const results = computed(() => searchProducts(state.products, query.value))
const adminMode = computed(() => isAdmin())
function enterLink(link) { if (link.to === '/dein-design' && route.path === '/dein-design') state.designEntry++ }
async function openSearch() { searchOpen.value = !searchOpen.value; if (searchOpen.value) { menuOpen.value = false; await nextTick(); searchInput.value?.focus() } }
watch(() => route.fullPath, () => { searchOpen.value = false; menuOpen.value = false; query.value = '' })
watch([() => state.loading, () => state.user, () => route.fullPath], () => { if (!state.loading && isAdmin() && !route.path.startsWith('/admin/')) router.replace('/admin/produkte') })
async function signOut() { try { await logout(); router.push('/') } catch (e) { notify(e.message, true) } }
onMounted(initialize)
</script>
<template>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>
  <template v-if="!adminMode">
    <div class="announcement"><span>Handgefertigt. Individuell. Für deine Regentage.</span><Icon name="drop" /></div>
    <header class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="brand" aria-label="Rainbow.design – Startseite"><img :src="asset('/assets/logo.svg')" alt="Rainbow.design"></RouterLink>
        <nav class="desktop-nav" aria-label="Hauptnavigation"><RouterLink v-for="link in links" :key="link.label" :to="link.to" active-class="" exact-active-class="" :class="{ 'nav-current': route.fullPath === link.to }" @click="enterLink(link)">{{ link.label }}</RouterLink></nav>
        <div class="header-actions">
          <button class="icon-button" aria-label="Suche öffnen" :aria-expanded="searchOpen" aria-controls="shop-search" @click="openSearch"><Icon name="search" /></button>
          <RouterLink class="icon-button" :to="state.user ? '/konto' : '/login'" aria-label="Benutzerkonto"><Icon name="user" /></RouterLink>
          <RouterLink class="icon-button" :to="state.user ? '/wunschliste' : '/login'" aria-label="Wunschliste"><Icon name="heart" /></RouterLink>
          <RouterLink class="icon-button cart-icon" to="/warenkorb" :aria-label="`Warenkorb${cartCount ? ', ' + cartCount + ' Artikel' : ''}`"><Icon name="bag" /><span v-if="cartCount" class="cart-count">{{ cartCount }}</span></RouterLink>
          <button class="icon-button mobile-menu-button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'" @click="menuOpen = !menuOpen; searchOpen = false"><Icon :name="menuOpen ? 'close' : 'menu'" /></button>
        </div>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Mobile Hauptnavigation"><RouterLink v-for="link in links" :key="link.label" :to="link.to" @click="enterLink(link); menuOpen = false">{{ link.label }}<Icon name="arrow" /></RouterLink></nav>
      <section v-if="searchOpen" id="shop-search" class="search-panel" aria-label="Produktsuche" @keydown.esc="searchOpen = false">
        <div class="search-inner"><label for="search-products" class="eyebrow">Wonach suchst du?</label><div class="search-input-row"><Icon name="search" /><input id="search-products" ref="searchInput" v-model="query" type="search" placeholder="Regenmantel, Damen, Blau …" autocomplete="off"><button class="icon-button" aria-label="Suche schließen" @click="searchOpen = false"><Icon name="close" /></button></div>
          <div class="search-results" aria-live="polite"><template v-if="query.trim()"><RouterLink v-for="result in results" :key="result.product.id + result.color" :to="productLink(result.product, result.color)" class="search-result"><img :src="asset(result.product.imagesByColor[result.color][0])" alt=""><span>{{ result.product.name }}<small>{{ categories[result.product.category] }}</small></span><strong>{{ priceLabel(result.product) }}</strong></RouterLink><p v-if="!results.length">Keine Produkte gefunden.</p></template><p v-else class="muted">Entdecke deinen neuen Lieblingsmantel.</p></div>
        </div>
      </section>
    </header>
  </template>
  <header v-else class="admin-header"><RouterLink to="/admin/produkte" class="admin-brand">Rainbow.design <span>Verwaltung</span></RouterLink><nav aria-label="Admin-Navigation"><RouterLink to="/admin/produkte">Produkte</RouterLink><RouterLink to="/admin/benutzer">Benutzer</RouterLink><RouterLink to="/admin/bestellungen">Bestellungen</RouterLink><RouterLink to="/admin/administratoren">Administratoren</RouterLink><button class="text-button" @click="signOut">Abmelden</button></nav></header>
  <div v-if="state.pending && !state.loading" class="request-indicator" role="status">Wird geladen …</div>
  <div v-if="state.toast" class="toast" :class="{ 'toast-error': state.toast.error }" :role="state.toast.error ? 'alert' : 'status'"><span>{{ state.toast.message }}</span><button class="icon-button" aria-label="Hinweis schließen" @click="state.toast = null"><Icon name="close" /></button></div>
  <main id="main" tabindex="-1"><div v-if="state.loading" class="page loading-page" role="status"><span class="spinner"></span>Dein Shop wird geladen …</div><div v-else-if="state.loadError" class="page empty-state"><h1>Eine kleine Regenpause.</h1><p role="alert">{{ state.loadError }}</p><button class="button" @click="initialize">Erneut versuchen</button></div><RouterView v-else :key="route.path + (route.path === '/dein-design' ? route.fullPath + state.designEntry : '')" /></main>
  <footer v-if="!adminMode" class="site-footer"><div class="footer-top"><RouterLink to="/" class="footer-brand"><img :src="asset('/assets/logo.svg')" alt="Rainbow.design – Startseite"></RouterLink><p>Ein bisschen Regen.<br><em>Ganz viel Persönlichkeit.</em></p><nav aria-label="Footer-Navigation"><RouterLink v-for="link in links" :key="link.label" :to="link.to" active-class="" exact-active-class="" :class="{ 'nav-current': route.fullPath === link.to }" @click="enterLink(link)">{{ link.label }}</RouterLink></nav><div class="social-links"><a :href="social.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram (neuer Tab)"><Icon name="instagram" /></a><a :href="social.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook (neuer Tab)"><Icon name="facebook" /></a></div></div><div class="footer-bottom"><span>© Rainbow.design</span><span>Mit Liebe gemacht. Bei jedem Wetter.</span><a href="#main">Nach oben ↑</a></div></footer>
</template>

