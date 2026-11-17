<script setup>
import { provide, ref } from 'vue'
const emit = defineEmits(['submit'])
const attempted = ref(false)
provide('formAttempted', attempted)
function submit(event) {
  attempted.value = true
  if (event.target.checkValidity()) emit('submit', event)
  else event.target.querySelector(':invalid')?.focus()
}
</script>
<template><form novalidate @submit.prevent="submit"><slot /></form></template>
