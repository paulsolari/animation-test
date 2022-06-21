<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheOrderButton from '@/components/TheOrderButton.vue';
import TopBanner from '@/components/TopBanner.vue';
import FeatureList from '@/components/FeatureList.vue';
import CleaningInfo from '@/components/CleaningInfo.vue';
import CleaningSlider from '@/components/CleaningSlider.vue';
import { useWindowResize, useMediaQuery } from '@/composables';
import { provide } from 'vue';

const isDesktop = useMediaQuery('(min-width: 1025px)');
const { width } = useWindowResize();

provide('isDesktop', isDesktop);
provide('width', width);
</script>

<template>
	<TheHeader />
	<main>
		<TheOrderButton />
		<TopBanner />
		<FeatureList />
		<CleaningInfo />
		<CleaningSlider />
	</main>
</template>

<style lang="scss">
#app {
	font: #{$font-size-base} / 1.3 $font-base;
	letter-spacing: 0.02em;
	color: $color-text-base;
}
</style>
