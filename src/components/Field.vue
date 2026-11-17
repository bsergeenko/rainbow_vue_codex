<script setup>
import { computed, inject, ref, watch, useId } from 'vue'
const props = defineProps({ modelValue: [String, Number], label: String, type: { type: String, default: 'text' }, required: Boolean, pattern: String, hint: String, autocomplete: String, min: [String, Number], step: [String, Number], inputmode: String, match: String })
const emit = defineEmits(['update:modelValue'])
const id = useId(), el = ref(), touched = ref(false), invalid = ref(false)
const attempted = inject('formAttempted', ref(false))
const mismatch = computed(() => props.match !== undefined && props.modelValue !== props.match)
const empty = computed(() => props.modelValue === undefined || props.modelValue === null || String(props.modelValue).trim() === '')
const error = computed(() => (touched.value || attempted.value) && (invalid.value || mismatch.value))
function validate() { if (el.value) { el.value.setCustomValidity(mismatch.value ? 'Die Passwörter stimmen nicht überein.' : props.required && empty.value ? 'Bitte fülle dieses Feld aus.' : ''); invalid.value = !el.value.validity.valid } }
watch([() => props.modelValue, mismatch, attempted], validate, { flush: 'post' })
function input(event) { emit('update:modelValue', event.target.value); invalid.value = !event.target.validity.valid }
</script>
<template><div class="field" :class="{ 'field-error': error }"><label :for="id">{{ label }}<span v-if="required" aria-hidden="true"> *</span></label><textarea v-if="type === 'textarea'" :id="id" ref="el" :value="modelValue" :required="required" :aria-invalid="!!error" :aria-describedby="error || hint ? id + '-hint' : undefined" rows="5" @input="input" @blur="touched = true; validate()" @invalid.prevent="invalid = true" /><input v-else :id="id" ref="el" :type="type" :value="modelValue" :required="required" :pattern="pattern" :autocomplete="autocomplete" :min="min" :step="step" :inputmode="inputmode" :aria-invalid="!!error" :aria-describedby="error || hint ? id + '-hint' : undefined" @input="input" @blur="touched = true; validate()" @invalid.prevent="invalid = true"><small v-if="error" :id="id + '-hint'" class="error-text">{{ mismatch ? 'Die Passwörter stimmen nicht überein.' : empty ? 'Bitte fülle dieses Feld aus.' : type === 'email' ? 'Bitte gib eine gültige E-Mail-Adresse ein.' : hint || 'Bitte prüfe deine Eingabe.' }}</small><small v-else-if="hint" :id="id + '-hint'">{{ hint }}</small></div></template>

