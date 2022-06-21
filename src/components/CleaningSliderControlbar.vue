<script setup>
import { inject, watch } from 'vue';
import { ScrollTrigger, gsap } from '@/animations';

const props = defineProps({
	currentSlideId: { type: Number, required: true },
	animationSlide: { type: Boolean, required: true },
	slides: { type: Array, required: true },
});

const emit = defineEmits(['update:current-slide-id']);

const isDesktop = inject('isDesktop');

watch(isDesktop, (value) => {
	if (!value) {
		gsap.set('.controlbar', { clearProps: true });
		return;
	}

	gsap.set('.controlbar', { opacity: 0, xPercent: -100 });
	gsap.set('.controlbar h4', { xPercent: -50 });
	gsap.set('.controlbar li', { xPercent: -50 });

	ScrollTrigger.create({
		trigger: '.cleaning-slider',
		start: 'top center',
		end: 'top center',
		once: true,
		onEnter: () => {
			gsap.to('.controlbar', { opacity: 1, xPercent: 0 });
			gsap.to('.controlbar h4', { xPercent: 0 });
			gsap.to('.controlbar li', { xPercent: 0, stagger: 0.1 });
		},
	});
});

function changeSlide(id) {
	if (!props.animationSlide) {
		emit('update:current-slide-id', id);
	}
}
</script>

<template>
	<div class="controlbar">
		<h4>Как мы убираем</h4>
		<ul class="controls">
			<li
				v-for="{ id, name } in props.slides"
				:key="id"
				:class="{ current: props.currentSlideId === id }"
				@click="changeSlide(id)"
			>
				<span>{{ name }}</span>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.controlbar {
	position: absolute;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 25%;
	height: 100%;
	padding: 30px 0;
	color: $color-text-alt;
	background-color: $color-brand;

	@include max-width($md) {
		position: absolute;
		top: 10px;
		z-index: 22;
		width: 100%;
		height: auto;
		padding: 0;
		background: none;
	}

	h4 {
		padding-left: 60px;
		font-weight: 600;

		@include max-width($lg) {
			padding-left: 40px;
		}

		@include max-width($md) {
			display: none;
		}
	}

	.controls {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding-left: 60px;
		font-size: 44px;

		@include max-width($xl) {
			font-size: 34px;
		}

		@include max-width($lg) {
			padding-left: 40px;
			font-size: 28px;
		}

		@include max-width($md) {
			flex-direction: row;
			padding: 0;
			gap: 10px;
			font-size: 0;
		}

		li {
			display: flex;
			align-items: center;
			overflow: hidden;
			margin-bottom: 20px;
			opacity: 0.7;
			cursor: pointer;
			transition: opacity $duration-base;

			@include max-width($md) {
				width: 20px;
				height: 20px;
				margin: 0;
				background-color: #fff;
				border-radius: 100%;
				opacity: 0.5;
				border: 1px solid $color-black;
			}

			&::before {
				content: '\2192';
				display: flex;
				align-items: center;
				width: 54px;
				height: 44px;
				margin-left: -54px;
				transition: margin-left calc(#{$duration-slider} / 2) $duration-slider;

				@include max-width($xl) {
					width: 44px;
					height: 34px;
					margin-left: -44px;
				}

				@include max-width($lg) {
					width: 38px;
					height: 28px;
					margin-left: -38px;
				}

				@include max-width($md) {
					content: none;
				}
			}

			&:hover,
			&.current {
				opacity: 1;
			}

			&.current {
				&::before {
					margin-left: 0;
				}
			}
		}
	}
}
</style>
