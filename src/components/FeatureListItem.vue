<script setup>
import { getImageUrl } from '@/helpers';

const props = defineProps({
	image: { type: String, required: true },
	text: { type: String, required: true },
	description: { type: String, required: true },
	index: { type: Number, required: true },
});
</script>

<template>
	<div ref="feature" class="feature">
		<h3 class="text">{{ props.text }}</h3>
		<img :src="getImageUrl(props.image)" :alt="props.image" />
		<p class="description">
			Не нужно тратить время, силы и ресурсы на размещение вакансий, проведение
			собеседований, проверку кандидатов на должность уборщицы. За счет больших
			объемов мы можем сделать это эффективнее.
		</p>
	</div>
</template>

<style scoped lang="scss">
.feature {
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 328px;
	padding: 20px 15px 0;
	background-color: $color-gray;
	border-radius: $radius-base;

	&:hover {
		.description {
			opacity: 1;
		}
	}

	.text {
		flex-grow: 1;
		max-width: 230px;
		font-weight: 500;
		font-size: $font-size-h3;
		text-align: center;
	}

	.description {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 30px;
		font-weight: 300;
		color: $color-text-alt;
		background-color: $color-brand;
		opacity: 0;
		transition: opacity $duration-base;
	}
}
</style>
