<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from '@/animations';

const cleaningInfo = ref();

onMounted(() => {
	gsap.from('.cleaning-info', {
		opacity: 0,
		y: 100,
		scrollTrigger: '.cleaning-info',
	});
});
</script>

<template>
	<div ref="cleaningInfo" class="cleaning-info">
		<h2>Как мы убираем</h2>
		<p>
			Клинер приезжает в назначенное время со всем необходимым и сразу
			приступает к делу. Вам остаётся только оценить результат.
		</p>
	</div>
</template>

<style scoped lang="scss">
.cleaning-info {
	display: flex;
	justify-content: space-between;
	width: 75%;
	margin: 0 auto 52px;

	@include max-width($lg) {
		width: 85%;
	}

	@include max-width($md) {
		display: block;
	}

	@include max-width($sm) {
		width: 100%;
		padding: 20px;
	}

	h2 {
		flex-grow: 1;
		font-weight: 400;
		font-size: $font-size-h2;

		@include max-width($md) {
			margin-bottom: 20px;
		}

		@include max-width($xs) {
			font-size: $font-size-h2-xs;
		}
	}

	p {
		max-width: 420px;
		font-size: $font-size-lg;

		@include max-width($md) {
			max-width: none;
		}
	}
}
</style>
