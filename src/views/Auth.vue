<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api, refreshUser, refreshCart, refreshWishlist, isAdmin, notify } from '../lib/store.js'
import { personData, personFields } from '../lib/catalog.js'
import Field from '../components/Field.vue'
import ValidatedForm from '../components/ValidatedForm.vue'
import Notices from '../components/Notices.vue'
import Icon from '../components/Icon.vue'
const route = useRoute(), router = useRouter(), registering = computed(() => route.path === '/registrieren'), data = reactive({ ...personData(), password: '', confirm: '' }), busy = ref(false), error = ref('')
async function submit() {
  error.value = ''; if (registering.value && data.password !== data.confirm) { error.value = 'Die Passwörter stimmen nicht überein.'; return }
  busy.value = true
  try {
    if (registering.value) { const { confirm, ...body } = data; await api('/register', { method: 'POST', body }); await router.push({ path: '/login', query: route.query }); notify('Deine Registrierung war erfolgreich. Du kannst dich jetzt anmelden.') }
    else { await api('/login', { method: 'POST', body: { email: data.email, password: data.password } }); await refreshUser(); await Promise.all([refreshCart(), refreshWishlist()]); await router.push(isAdmin() ? '/admin/produkte' : route.query.von === 'warenkorb' ? '/warenkorb' : '/konto') }
  } catch (e) { error.value = !registering.value && e.status === 401 ? 'E-Mail-Adresse oder Passwort ist falsch.' : e.message }
  finally { busy.value = false }
}
</script>
<template><section class="auth-page page"><aside class="auth-aside"><span class="eyebrow">WILLKOMMEN BEI RAINBOW.DESIGN</span><h2>Schön, dass<br>du <em>da bist.</em></h2><p>Deine Lieblingsmäntel. Deine Designs.<br>Alles an einem Ort.</p><span class="auth-flower" aria-hidden="true">✳</span></aside><div class="auth-content"><span class="eyebrow">DEIN BENUTZERKONTO</span><h1>{{ registering ? 'Registrieren' : 'Anmelden' }}</h1><p class="muted">{{ registering ? 'Erstelle dein Konto und speichere deine Lieblingsstücke.' : 'Melde dich mit deiner E-Mail-Adresse an.' }}</p><ValidatedForm :key="route.path" @submit="submit"><template v-if="registering"><div class="form-grid"><Field v-for="field in personFields.slice(0, 2)" :key="field.name" v-model="data[field.name]" v-bind="field" required /></div><Field v-model="data.email" label="E-Mail-Adresse" type="email" autocomplete="email" required /></template><Field v-else v-model="data.email" label="E-Mail-Adresse" type="email" autocomplete="email" required /><Field v-model="data.password" label="Passwort" type="password" :autocomplete="registering ? 'new-password' : 'current-password'" required /><template v-if="registering"><Field v-model="data.confirm" label="Passwortbestätigung" type="password" autocomplete="new-password" :match="data.password" required /><h3 class="form-section-title">Deine Adresse <span class="muted">(optional)</span></h3><div class="form-grid"><Field v-for="field in personFields.slice(3)" :key="field.name" v-model="data[field.name]" v-bind="field" :class="{ 'span-2': field.name === 'street' }" /></div></template><Notices :error="error" /><p class="field-note">* Pflichtfelder</p><button class="button full-width" :disabled="busy">{{ busy ? 'Einen Moment …' : registering ? 'Konto erstellen' : 'Anmelden' }}<Icon name="arrow" /></button></ValidatedForm><p class="auth-switch">{{ registering ? 'Du hast schon ein Konto?' : 'Du bist neu hier?' }} <RouterLink :to="{ path: registering ? '/login' : '/registrieren', query: route.query }">{{ registering ? 'Anmelden' : 'Registrieren' }}</RouterLink></p></div></section></template>
