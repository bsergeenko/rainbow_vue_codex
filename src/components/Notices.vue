<script setup>defineProps({ error: String, busy: Boolean })</script>
<template><p v-if="error" class="form-error" role="alert">{{ error }}</p><p v-if="busy" class="loading" role="status">Wird geladen …</p></template>
