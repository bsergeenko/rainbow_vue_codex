<script setup>
defineProps({ name: String, filled: Boolean })
const paths = {
 search: 'm21 21-4.4-4.4M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0',
 user: 'M20 21v-2a7 7 0 0 0-14 0v2M17 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
 bag: 'M5 7h14l2 14H3L5 7ZM8 8V6a4 4 0 0 1 8 0v2',
 arrow: 'M4 12h16m-6-6 6 6-6 6', close: 'm6 6 12 12M6 18 18 6', menu: 'M3 6h18M3 12h18M3 18h18',
 check: 'm5 12 4 4L19 6', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14',
 instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm9 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm2-6h.01',
 facebook: 'M15 22v-9h3l.5-4H15V6.5c0-1.2.4-2 2-2h2V1.2A25 25 0 0 0 16 1c-3 0-5 1.8-5 5v3H8v4h3v9',
 drop: 'M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z', sun: 'M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0'
}
</script>
<template><svg viewBox="0 0 24 24" :fill="filled ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name] || paths.arrow" /></svg></template>
