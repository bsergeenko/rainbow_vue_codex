<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { state, refreshWishlist } from '../lib/store.js'
import ProductCard from '../components/ProductCard.vue'
import Notices from '../components/Notices.vue'
const router = useRouter(), loading = ref(false), error = ref('')
onMounted(async () => { if (!state.user) return router.replace('/login'); loading.value = true; try { await refreshWishlist() } catch (e) { error.value = e.message } finally { loading.value = false } })
</script>
<template><section class="page"><RouterLink class="back-link" to="/konto">← Zurück zum Benutzerkonto</RouterLink><div class="page-intro"><span class="eyebrow">FÜR SPÄTER AUFGEHOBEN</span><h1>Deine Wunschliste</h1></div><Notices :busy="loading" :error="error" /><div v-if="state.wishlist.length" class="product-grid"><ProductCard v-for="item in state.wishlist" :key="item.itemId" :product="item.product" :color="item.color" /></div><div v-else-if="!loading && !error" class="empty-state"><p>Deine Wunschliste ist leer.</p><RouterLink to="/damen" class="button">Kollektion entdecken</RouterLink></div></section></template>
