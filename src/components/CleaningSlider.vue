<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { ScrollTrigger, gsap } from '@/animations';
import CleaningSliderControlbar from '@/components/CleaningSliderControlbar.vue';
import CleaningSliderItem from '@/components/CleaningSliderItem.vue';

const state = reactive({
	isSliderReady: false,
	currentSlideId: 1,
	previousSlideId: 1,
	animationSlide: false,
	slides: [
		{
			id: 1,
			name: 'Кухня',
			image: 'slide-1.jpg',
			tooltips: [
				'Чистим фасад вытяжки',
				'Чистим плиту',
				'Моем пол',
				'Выносим мусор',
				'Протираем столешницу',
				'Моем фасады кухонных гарнитуров',
				'Моем посуду',
			],
		},
		{
			id: 2,
			name: 'Ванная',
			image: 'slide-2.jpg',
			tooltips: [
				'Чистим фасад вытяжки',
				'Чистим плиту',
				'Моем пол',
				'Выносим мусор',
				'Протираем столешницу',
				'Моем фасады кухонных гарнитуров',
				'Моем посуду',
			],
		},
		{
			id: 3,
			name: 'Комнаты',
			image: 'slide-3.webp',
			tooltips: [
				'Чистим фасад вытяжки',
				'Чистим плиту',
				'Моем пол',
				'Выносим мусор',
				'Протираем столешницу',
				'Моем фасады кухонных гарнитуров',
				'Моем посуду',
			],
		},
		{
			id: 4,
			name: 'Прихожая',
			image: 'slide-4.webp',
			tooltips: [
				'Чистим фасад вытяжки',
				'Чистим плиту',
				'Моем пол',
				'Выносим мусор',
				'Протираем столешницу',
				'Моем фасады кухонных гарнитуров',
				'Моем посуду',
			],
		},
	],
});

const slider = ref();

const isDesktop = inject('isDesktop');
const width = inject('width');

const trigger = {
	trigger: '.cleaning-slider',
	start: 'top center',
	end: 'top center',
	once: true,
};

watch(isDesktop, (value) => {
	if (value) {
		ScrollTrigger.create({
			...trigger,
			onEnter: () => {
				gsap.to(window, {
					scrollTo: document.body.offsetHeight - window.innerHeight,
				});

				gsap.to('.slider', {
					scrollTrigger: trigger,
					x:
						document.documentElement.clientWidth -
						slider.value.clientWidth -
						slider.value.offsetLeft,
					onComplete: () => {
						state.isSliderReady = true;
					},
				});
			},
		});
	} else {
		gsap.set('.slider', { clearProps: 'x' });
		state.isSliderReady = true;
	}
});

watch(width, () => {
	if (state.isSliderReady) {
		gsap.to('.slider', {
			x:
				document.documentElement.clientWidth -
				slider.value.clientWidth -
				slider.value.offsetLeft,
		});
	}
});

watch(
	() => state.isSliderReady,
	() => {
		gsap.to('.slide.current .tooltip', { scale: 1, stagger: 0.1 });
	}
);

watch(
	() => state.currentSlideId,
	(value, oldValue) => {
		state.previousSlideId = oldValue;

		gsap.to('.slide.current', {
			clipPath: 'inset(0 0 0 0%)',
			duration: 1,
			onStart: () => {
				state.animationSlide = true;
			},
			onComplete: () => {
				state.animationSlide = false;

				gsap.to('.slide.previous', {
					clipPath: 'inset(0 0 0 100%)',
				});

				gsap.to('.slide.previous .tooltip', {
					scale: 0,
					duration: 0,
				});

				gsap.to('.slide.current .tooltip', {
					scale: 1,
					stagger: 0.1,
				});
			},
		});
	},
	{ flush: 'post' }
);

onMounted(() => {
	gsap.from('.cleaning-slider', {
		opacity: 0,
		y: 100,
		scrollTrigger: '.cleaning-slider',
	});

	gsap.set('.slide:not(.current)', {
		clipPath: 'inset(0 0 0 100%)',
	});

	gsap.set('.tooltip', { scale: 0 });
});
</script>

<template>
	<div ref="cleaningSlider" class="cleaning-slider">
		<CleaningSliderControlbar
			v-model:current-slide-id="state.currentSlideId"
			:animation-slide="state.animationSlide"
			:slides="state.slides"
		/>
		<div ref="slider" :class="['slider', { ready: state.isSliderReady }]">
			<CleaningSliderItem
				v-for="item in state.slides"
				:key="item.id"
				v-bind="{
					...item,
					currentSlideId: state.currentSlideId,
					previousSlideId: state.previousSlideId,
				}"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.cleaning-slider {
	position: relative;
	display: flex;
	height: 100vh;

	@include max-width($md) {
		height: auto;
	}

	.slider {
		position: relative;
		overflow: hidden;
		width: 75%;
		margin: 0 auto;

		@include max-width($md) {
			width: 100%;
		}
	}
}
</style>
