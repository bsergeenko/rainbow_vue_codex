<script setup>
import { reactive, ref } from 'vue'
import { api, notify } from '../lib/store.js'
import Field from './Field.vue'
import ValidatedForm from './ValidatedForm.vue'
import Notices from './Notices.vue'
const form = reactive({ currentPassword: '', newPassword: '', confirm: '' }), busy = ref(false), error = ref(''), formKey = ref(0)
async function submit() { if (form.newPassword !== form.confirm) { error.value = 'Die Passwörter stimmen nicht überein.'; return } busy.value = true; error.value = ''; try { await api('/me/password', { method: 'PUT', body: { currentPassword: form.currentPassword, newPassword: form.newPassword } }); Object.keys(form).forEach(key => { form[key] = '' }); formKey.value++; notify('Dein Passwort wurde geändert.') } catch (e) { error.value = e.message } finally { busy.value = false } }
</script>
<template><ValidatedForm :key="formKey" class="password-form" @submit="submit"><Field v-model="form.currentPassword" type="password" label="Aktuelles Passwort" autocomplete="current-password" required /><Field v-model="form.newPassword" type="password" label="Neues Passwort" autocomplete="new-password" required /><Field v-model="form.confirm" type="password" label="Neues Passwort bestätigen" autocomplete="new-password" :match="form.newPassword" required /><Notices :error="error" /><button class="button" :disabled="busy">{{ busy ? 'Wird gespeichert …' : 'Passwort speichern' }}</button></ValidatedForm></template>
