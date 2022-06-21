<script setup>
import { onMounted, reactive } from 'vue';
import FeatureListItem from '@/components/FeatureListItem.vue';
import { gsap } from '@/animations';

const state = reactive({
	features: [
		{
			image: 'feature-1.png',
			text: 'Тщательно отобранный персонал',
			description:
				'Не нужно тратить время, силы и ресурсы на размещение вакансий, проведение собеседований, проверку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
		},
		{
			image: 'feature-2.png',
			text: 'Качественная эко-химия',
			description:
				'Не нужно тратить время, силы и ресурсы на размещение вакансий, проведение собеседований, проверку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
		},
		{
			image: 'feature-3.png',
			text: 'Контролируем качество',
			description:
				'Не нужно тратить время, силы и ресурсы на размещение вакансий, проведение собеседований, проверку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
		},
		{
			image: 'feature-4.png',
			text: 'Работаем круглосуточно',
			description:
				'Не нужно тратить время, силы и ресурсы на размещение вакансий, проведение собеседований, проверку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
		},
	],
});

onMounted(() => {
	gsap.from('.feature', {
		opacity: 0,
		y: 100,
		scrollTrigger: '.feature-list',
		stagger: 0.1,
	});
});
</script>

<template>
	<div class="feature-list">
		<FeatureListItem
			v-for="(item, index) in state.features"
			:key="index"
			v-bind="{ ...item, index }"
		/>
	</div>
</template>

<style scoped lang="scss">
.feature-list {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 40px;
	max-width: 1440px;
	padding: 0 $spacing-base;
	margin: 0 auto 149px;
	opacity: 1;
	transform: translateY(0);
	transition: opacity 0.5s, transform 0.5s;

	@include max-width($xl) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include max-width($sm) {
		padding: 0 20px;
		gap: 20px;
		margin: 0 auto 70px;
	}

	@include max-width($xs) {
		grid-template-columns: 1fr;
	}
}

.invisible {
	opacity: 0;
	transform: translateY(100px);
}
</style>
