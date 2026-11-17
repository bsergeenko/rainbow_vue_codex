<script setup>
import { computed } from 'vue'
import { asset, categories, categoryPaths } from '../lib/catalog.js'
import { state } from '../lib/store.js'
import Icon from '../components/Icon.vue'
const homeDesigns = computed(() => state.designs.filter(d => d.group === 'adult').slice(0, 4))
</script>
<template>
  <section class="home-hero"><div class="hero-kicker"><span class="little-line"></span> FÜR REGEN GEMACHT. FÜR DICH GESTALTET.</div><h1>Rainbow Design bringt<br> <em>Farbe</em> in Regentage<span class="hero-spark" aria-hidden="true">✳</span></h1><div class="hero-bottom"><p>Handgefertigte Regenmäntel.<br>So besonders wie du.</p><a href="#kollektion" class="round-link">Entdecke die Kollektion <span><Icon name="arrow" /></span></a></div><div class="hero-orbit" aria-hidden="true"></div></section>
  <section id="kollektion" class="home-categories"><RouterLink v-for="(label, key) in categories" :key="key" :to="categoryPaths[key]" class="category-tile"><img :src="asset(`/assets/home/${key}.jpg`)" :alt="`Regenmäntel für ${label}`" fetchpriority="high"><div class="category-overlay"><h2>{{ label }}</h2><span class="category-arrow"><Icon name="arrow" /></span></div></RouterLink></section>
  <div class="craft-strip"><span><Icon name="drop" /> Bereit für Regentage</span><span><Icon name="heart" /> Von Hand gefertigt</span><span><Icon name="sun" /> Mit deinem Lieblingsmotiv</span></div>
  <section class="home-design section-space"><div class="section-heading"><div><span class="eyebrow">DEIN DESIGN</span><h2>Dein Regenmantel,<br> <em>dein Design.</em></h2></div><div class="section-heading-side"><p>Finde dein Lieblingsmotiv und mach<br>deinen Regenmantel einzigartig.</p><RouterLink to="/dein-design" class="underlined-link">Dein Design gestalten <Icon name="arrow" /></RouterLink></div></div><div class="home-design-grid"><RouterLink v-for="(design, index) in homeDesigns" :key="design.id" :to="{ path: '/dein-design', query: { motiv: design.id } }" class="home-design-card"><div><img :src="asset(design.image)" :alt="`Rückenmotiv ${index + 1} auswählen`" loading="lazy"><span class="design-select"><Icon name="plus" /></span></div><span><span class="muted">0{{ index + 1 }}</span> Ein Motiv. Deine Geschichte.<Icon name="arrow" /></span></RouterLink></div></section>
  <section id="ueber-uns" class="about-section"><div class="about-symbol" aria-hidden="true"><span>r</span><i>✳</i></div><div><span class="eyebrow">ÜBER UNS</span><h2>Ein Mantel.<br>Viele kleine <em>Besonderheiten.</em></h2><p>Rainbow.design steht für handgefertigte Regenmäntel mit individuellen Details. Farben, Rückenmotive und liebevoll gestaltete Taschen machen jedes Stück besonders.</p><RouterLink to="/kontakt" class="underlined-link">Lass uns in Kontakt bleiben <Icon name="arrow" /></RouterLink></div></section>
</template>

