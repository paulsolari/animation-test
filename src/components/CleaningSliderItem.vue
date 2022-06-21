<script setup>
import { getImageUrl } from '@/helpers';
import CleaningSliderItemTooltip from '@/components/CleaningSliderItemTooltip.vue';

const props = defineProps({
	currentSlideId: { type: Number, required: true },
	previousSlideId: { type: Number, required: true },
	id: { type: Number, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	tooltips: { type: Array, default: () => [] },
});
</script>

<template>
	<div
		ref="slide"
		:class="[
			`slide slide-${props.id}`,
			{ current: props.currentSlideId === id },
			{
				previous:
					props.previousSlideId === id &&
					props.previousSlideId !== props.currentSlideId,
			},
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

	&.previous {
		z-index: 1;
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
