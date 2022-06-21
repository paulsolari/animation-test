<template>
	<div class="top-banner">
		<div class="banner-image">
			<img src="@/assets/images/banner.jpg" alt="image-1" />
		</div>
		<div class="banner-text">
			<h1>Уборка квартир в Киеве</h1>
			<p>
				Мы уберем у вас дома или в офисе. Наведем чистоту после ремонта и
				проведем генеральную уборку.
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.top-banner {
	position: relative;
	display: flex;
	height: 100vh;
	margin-bottom: 73px;

	.banner-image,
	.banner-text {
		width: 50%;

		@include max-width($sm) {
			width: 100%;
		}
	}

	.banner-image {
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.banner-text {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		padding: 0 20px;

		@include max-width($sm) {
			position: absolute;
			top: 45%;
			left: 50%;
			max-width: 390px;
			margin: 0;
			background: #fff;
			padding: 20px;
			border-radius: $radius-base;
			transform: translate(-50%, -50%);
		}
	}

	h1,
	p {
		max-width: 350px;
	}

	h1 {
		margin-bottom: 30px;
		font-weight: 400;
		font-size: $font-size-h1;
		line-height: 1.1;

		@include max-width($md) {
			font-size: $font-size-h1-md;
		}
	}

	p {
		font-size: $font-size-lg;
	}
}
</style>
