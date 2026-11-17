<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { state, api } from '../lib/store.js'
import OrderDetails from '../components/OrderDetails.vue'
import Notices from '../components/Notices.vue'
import NotFound from './NotFound.vue'
import Icon from '../components/Icon.vue'
const route = useRoute(), order = ref(state.lastOrder?.id === route.params.id ? state.lastOrder : null), loading = ref(false), error = ref('')
onMounted(async () => { if (!order.value && state.user) { loading.value = true; try { order.value = (await api('/orders')).find(o => o.id === route.params.id) } catch (e) { error.value = e.message } finally { loading.value = false } } })
</script>
<template><section v-if="order" class="page"><div class="order-success"><span class="success-icon"><Icon name="check" /></span><span class="eyebrow">VIEL FREUDE MIT DEINEM LIEBLINGSSTÜCK</span><h1>Danke für deine Bestellung!</h1><p>Deine Bestellnummer: <strong>{{ order.id }}</strong></p></div><OrderDetails :order="order" /><div class="row order-next"><RouterLink to="/" class="button">Zur Startseite</RouterLink><RouterLink v-if="state.user" to="/konto" class="underlined-link">Meine Bestellungen</RouterLink></div></section><section v-else-if="loading || error" class="page"><Notices :busy="loading" :error="error" /></section><NotFound v-else /></template>
