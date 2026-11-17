<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { asset, categories, colors, priceLabel, productLink } from '../lib/catalog.js'
import { state, savedItem, toggleWishlist, notify } from '../lib/store.js'
import Icon from './Icon.vue'
const props = defineProps({ product: Object, color: String })
const router = useRouter(), busy = ref(false)
async function toggle() { if (!state.user) return router.push('/login'); busy.value = true; try { await toggleWishlist(props.product.id, props.color) } catch (e) { notify(e.message, true) } finally { busy.value = false } }
</script>
<template><article class="product-card"><div class="product-card-image"><RouterLink :to="productLink(product, color)" :aria-label="`${product.name} in ${colors[color]}`"><img :src="asset(product.imagesByColor[color][0])" :alt="`${product.name} – ${colors[color]}`" loading="lazy"></RouterLink><button class="icon-button heart-button" :class="{ saved: savedItem(product.id, color) }" :aria-label="savedItem(product.id, color) ? 'Aus Wunschliste entfernen' : 'Zur Wunschliste hinzufügen'" :aria-pressed="!!savedItem(product.id, color)" :disabled="busy" @click="toggle"><Icon name="heart" :filled="!!savedItem(product.id, color)" /></button><span v-if="product.customizable" class="product-tag">Individualisierbar</span></div><div class="product-meta"><span class="eyebrow">{{ categories[product.category] }}</span><RouterLink :to="productLink(product, color)" class="product-name">{{ product.name }}</RouterLink><div class="row between"><span class="muted">{{ colors[color] }}</span><strong>{{ priceLabel(product) }}</strong></div></div></article></template>
