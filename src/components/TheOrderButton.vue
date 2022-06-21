<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from '@/animations';

const btnContainer = ref(null);

function animateElement(selector, x, y) {
	gsap.to(selector, { x, y, duration: 1, ease: 'expo.out' });
}

function unStickButton() {
	animateElement('.order-button', 0, 0);
	animateElement('.order-button-text', 0, 0);
}

function stickButton(event) {
	const { offsetX, offsetY, target } = event;
	const x = offsetX - target.offsetWidth / 2;
	const y = offsetY - target.offsetHeight / 2;
	animateElement('.order-button', x, y);
	animateElement('.order-button-text', x / 4, y / 4);
}

onMounted(() => {
	gsap.to('.order-button-inner', {
		yPercent: 40,
		scale: 0.7,
		scrollTrigger: {
			trigger: '.order-button-container',
			start: `${btnContainer.value.offsetHeight * 2} bottom`,
			toggleActions: 'play none reverse none',
			scrub: 1,
			end: () => {
				return `${
					document.documentElement.offsetHeight -
					(btnContainer.value.offsetTop + btnContainer.value.offsetHeight / 2)
				} bottom`;
			},
			onLeave: () => {
				gsap.to('.order-button-container', {
					yPercent: 80,
					scale: 0,
				});
			},
			onEnterBack: () => {
				gsap.to('.order-button-container', {
					yPercent: 0,
					scale: 1,
				});
			},
		},
	});
});
</script>

<template>
	<div ref="btnContainer" class="order-button-container">
		<div class="order-button-inner">
			<button
				class="order-button"
				@mouseleave="unStickButton"
				@mousemove="stickButton"
			>
				<span class="order-button-text">
					<span>
						Заказать
						<br />
						уборку
					</span>
				</span>
			</button>
		</div>
	</div>
</template>

<style lang="scss">
.order-button-container {
	position: fixed;
	z-index: 11;
	bottom: 10px;
	left: 50%;
	margin-left: calc(-195px / 2);
	width: 195px;
	height: 195px;
	border-radius: 100%;

	@include max-width($md) {
		width: 150px;
		height: 150px;
		margin-left: calc(-150px / 2);
	}

	@include max-width($sm) {
		width: 120px;
		height: 120px;
		margin-left: calc(-120px / 2);
	}
}

.order-button-inner,
.order-button {
	width: 100%;
	height: 100%;
}

.order-button {
	text-transform: uppercase;
	font-weight: 600;
	font-size: $font-size-lg;
	line-height: 1.3;
	letter-spacing: 0.03em;
	color: #fff;
	border-radius: 100%;

	@include max-width($md) {
		font-size: $font-size-md;
	}

	@include max-width($sm) {
		font-size: $font-size-sm;
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}

	&::before {
		background-color: $color-brand;
		transition: transform $duration-base;
	}

	&::after {
		border: 1px solid darken($color-gray, 10%);
		opacity: 0;
		transform: scale(0.9);
		transition: transform calc(#{$duration-base} * 4),
			opacity calc(#{$duration-base} * 4);
	}

	&:hover {
		&::before {
			transform: scale(1.2);
		}

		&::after {
			opacity: 1;
			transform: scale(1.6);
		}
	}

	.order-button-text {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		span {
			animation: rotate-button 10s linear infinite;
		}
	}

	@keyframes rotate-button {
		0% {
			transform: rotate(0);
		}

		25% {
			transform: rotate(45deg);
		}

		50% {
			transform: rotate(0);
		}

		75% {
			transform: rotate(-45deg);
		}

		100% {
			transform: rotate(0);
		}
	}
}
</style>
