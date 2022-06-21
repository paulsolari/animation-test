<script setup>
import { getImageUrl } from '@/helpers';
import { onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import CleaningSliderItemTooltip from '@/components/CleaningSliderItemTooltip.vue';

const props = defineProps({
	currentSlideId: { type: Number, required: true },
	isSliderReady: { type: Boolean, required: true },
	id: { type: Number, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	tooltips: { type: Array, default: () => [] },
});

const emit = defineEmits(['transition-start', 'transition-end']);

const slide = ref();

const timeline = gsap.timeline();

watch(
	() => props.isSliderReady,
	() => {
		gsap.to('.slide.current .tooltip', { scale: 1, stagger: 0.1 });
	}
);

watch(
	() => props.currentSlideId,
	(value) => {
		if (value === props.id) {
			timeline
				.to('.slide.current', {
					xPercent: 0,
					duration: 1,
					onStart: () => {
						emit('transition-start');
					},
					onComplete: () => {
						emit('transition-end');
					},
				})
				.to('.slide:not(.current)', {
					xPercent: 100,
					duration: 0,
				})
				.to('.tooltip', {
					scale: 0,
					duration: 0,
				})
				.to('.slide.current .tooltip', {
					scale: 1,
					stagger: 0.1,
				});
		}
	},
	{ flush: 'post' }
);

onMounted(() => {
	gsap.set('.slide:not(.current)', {
		xPercent: 100,
	});

	gsap.set('.tooltip', { scale: 0 });
});
</script>

<template>
	<div
		ref="slide"
		:class="[
			`slide slide-${props.id}`,
			{ current: props.currentSlideId === id },
		]"
	>
		<div class="slide-inner">
			<CleaningSliderItemTooltip
				v-for="(item, index) in tooltips"
				:key="index"
				:tooltip="item"
				:class="`tooltip-${index}`"
			/>
			<img :src="getImageUrl(props.image)" :alt="props.name" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.slide {
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;

	&.current {
		position: relative;
		z-index: 2;
	}

	.slide-inner {
		position: relative;
		width: 100%;
	}

	img {
		width: 100%;
	}

	&.slide {
		.tooltip-0 {
			top: 32%;
			left: 30%;
		}
		.tooltip-1 {
			top: 55%;
			left: 25%;
		}
		.tooltip-2 {
			top: 89%;
			left: 28%;
		}
		.tooltip-3 {
			top: 60%;
			left: 44%;
		}
		.tooltip-4 {
			top: 73%;
			left: 56%;
		}
		.tooltip-5 {
			top: 47%;
			left: 59%;
		}
		.tooltip-6 {
			top: 62%;
			left: 78%;
		}
	}
}
</style>
