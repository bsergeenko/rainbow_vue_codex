<script setup>
import { computed } from 'vue'
import { asset, colors, categories, subcategories, sizeLabel, designLabel, money, productLink } from '../lib/catalog.js'
import { state, cartProduct, cartPrice } from '../lib/store.js'
const props = defineProps({ items: Array })
const lines = computed(() => props.items.map(item => {
 const product = cartProduct(item), design = state.designs.find(d => d.id === item.designId)
 return { ...item, product, design, image: product?.imagesByColor?.[item.color]?.[0] || design?.image, unitPrice: item.unitPrice ?? cartPrice(item) }
}))
</script>
<template><div class="cart-lines"><article v-for="item in lines" :key="item.itemId || item.productId + item.color + item.size + item.designId" class="cart-line"><RouterLink v-if="item.product" :to="productLink(item.product, item.color)" class="cart-line-image"><img v-if="item.image" :src="asset(item.image)" :alt="item.product.name"></RouterLink><div class="cart-line-content"><span class="eyebrow">{{ categories[item.product?.category] }}</span><RouterLink v-if="item.product" :to="productLink(item.product, item.color)" class="line-product-name">{{ item.product.name }}</RouterLink><span v-else class="line-product-name">{{ item.productName || 'Regenmantel' }}</span><p>{{ colors[item.color] }} <span class="muted">/</span> {{ sizeLabel(item.size) }}</p><div v-if="item.designId" class="line-configuration"><p>Für wen? {{ categories[item.product?.category] }}<template v-if="item.product?.subcategory"> · {{ subcategories[item.product.subcategory] }}</template></p><p class="motif-label"><img v-if="item.design" :src="asset(item.design.image)" alt="">Rückenmotiv: {{ designLabel(item.design) }}</p><p>Taschenwunsch: {{ item.pocketRequest || 'Keine Angabe' }}</p></div><p class="muted">Einzelpreis: {{ money(item.unitPrice) }}</p><slot :item="item"><p>Menge: {{ item.quantity }}</p></slot></div><strong class="line-total">{{ money(item.unitPrice * item.quantity) }}</strong></article></div></template>
