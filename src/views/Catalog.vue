<script setup>
import { computed, ref } from 'vue'
import { categories, variants } from '../lib/catalog.js'
import { state } from '../lib/store.js'
import ProductCard from '../components/ProductCard.vue'
const props = defineProps({ category: String }), filter = ref('all')
const cards = computed(() => variants(state.products.filter(p => p.category === props.category && (filter.value === 'all' || p.subcategory === filter.value))))
</script>
<template><section class="page"><div class="breadcrumb"><RouterLink to="/">Startseite</RouterLink><span>/</span>{{ categories[category] }}</div><div class="catalog-heading"><div><span class="eyebrow">FARBE FÜR DEINEN ALLTAG</span><h1>{{ categories[category] }}</h1><p class="muted">Dein Lieblingsmantel wartet schon auf den nächsten Regen.</p></div><span class="catalog-count">{{ cards.length }} Varianten</span></div><div v-if="category === 'kids'" class="filter-tabs" aria-label="Kinderprodukte filtern"><button v-for="(label, value) in { all: 'Alle', girls: 'Mädchen', boys: 'Jungen' }" :key="value" :class="{ selected: filter === value }" :aria-pressed="filter === value" @click="filter = value">{{ label }}</button></div><div class="product-grid"><ProductCard v-for="card in cards" :key="card.product.id + card.color" v-bind="card" /></div><p v-if="!cards.length" class="empty-state">Keine Produkte gefunden.</p></section></template>
