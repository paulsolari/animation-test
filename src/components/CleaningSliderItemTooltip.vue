<script setup>
import { reactive } from 'vue';

const props = defineProps({
	tooltip: { type: String, default: '' },
});

const state = reactive({
	isActive: false,
});
</script>

<template>
	<div :class="['tooltip', { active: state.isActive }]">
		<button
			class="tooltip-button"
			@mouseenter="state.isActive = true"
			@mouseleave="state.isActive = false"
		></button>
		<div class="tooltip-halo"></div>
		<div class="tooltip-popup">{{ props.tooltip }}</div>
	</div>
</template>

<style scoped lang="scss">
.tooltip {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	width: 30px;
	height: 30px;
	border-radius: 100%;

	@include max-width($sm) {
		width: 20px;
		height: 20px;
	}

	&.active {
		z-index: 3;

		.tooltip-button {
			transform: rotate(-45deg);
		}

		.tooltip-halo {
			transform: scale(0) !important;
		}

		.tooltip-popup {
			transform: translate(-50%, 0) scale(1);
		}
	}
}

.tooltip-halo {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: $color-brand;
	border-radius: 100%;
	opacity: 0.25;
	transform: scale(1.7);
	transition: transform $duration-base;
}

.tooltip-button {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	background-color: $color-brand;
	border-radius: 100%;
	transition: transform $duration-base;

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		background-color: #fff;
	}

	&::before {
		width: 2px;
		height: 12px;
		margin: -6px 0 0 -1px;
	}

	&::after {
		width: 12px;
		height: 2px;
		margin: -1px 0 0 -6px;
	}
}

.tooltip-popup {
	position: absolute;
	bottom: calc(100% + 20px);
	left: 50%;
	z-index: 3;
	padding: 8px 10px;
	text-align: center;
	font-size: $font-size-md;
	white-space: nowrap;
	background-color: #fff;
	border-radius: calc(#{$radius-base} / 2);
	transform: translate(-50%, 20px) scale(0);
	transition: transform $duration-base;

	&::before {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -6px;
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 6px solid #fff;
	}
}
</style>
