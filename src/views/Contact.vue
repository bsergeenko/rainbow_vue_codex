<script setup>
import { reactive, ref } from 'vue'
import { api, state, notify } from '../lib/store.js'
import { social } from '../lib/catalog.js'
import Field from '../components/Field.vue'
import ValidatedForm from '../components/ValidatedForm.vue'
import Notices from '../components/Notices.vue'
import Icon from '../components/Icon.vue'
const form = reactive({ name: state.user ? `${state.user.firstName} ${state.user.lastName}` : '', email: state.user?.email || '', subject: '', message: '' }), busy = ref(false), error = ref(''), formKey = ref(0)
async function submit() { busy.value = true; error.value = ''; try { await api('/contact', { method: 'POST', body: { ...form } }); Object.keys(form).forEach(key => { form[key] = '' }); formKey.value++; notify('Vielen Dank für deine Nachricht.') } catch (e) { error.value = e.message } finally { busy.value = false } }
</script>
<template><section class="page contact-layout"><div class="contact-intro"><span class="eyebrow">KONTAKT</span><h1>Ein guter Tag,<br>um <em>Hallo</em><br>zu sagen.</h1><p>Eine Frage zu deinem Regenmantel<br>oder zu deinem individuellen Design?<br>Wir freuen uns auf deine Nachricht.</p><div class="contact-social"><a :href="social.instagram" target="_blank" rel="noopener noreferrer"><Icon name="instagram" />Instagram ↗</a><a :href="social.facebook" target="_blank" rel="noopener noreferrer"><Icon name="facebook" />Facebook ↗</a></div></div><div class="contact-form"><h2>Schreib uns</h2><ValidatedForm :key="formKey" @submit="submit"><Field v-model="form.name" label="Name" autocomplete="name" required /><Field v-model="form.email" label="E-Mail-Adresse" type="email" autocomplete="email" required /><Field v-model="form.subject" label="Betreff" required /><Field v-model="form.message" label="Nachricht" type="textarea" required /><p class="field-note">* Pflichtfelder</p><Notices :error="error" /><button class="button full-width" :disabled="busy">{{ busy ? 'Wird gesendet …' : 'Nachricht senden' }}<Icon name="arrow" /></button></ValidatedForm></div></section></template>
