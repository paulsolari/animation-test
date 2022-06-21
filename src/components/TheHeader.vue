<script setup>
import { reactive } from 'vue';

const state = reactive({
	showMobileNav: false,
	activeSwitchItem: 'home',
	switchItems: [
		{ name: 'home', text: 'Дом' },
		{ name: 'office', text: 'Офис' },
	],
	navItems: [
		{ url: '#', text: 'После ремонта' },
		{ url: '#', text: 'Генеральная уборка' },
		{ url: '#', text: 'Регулярная уборка' },
		{ url: '#', text: 'Мойка окон' },
	],
});
</script>

<template>
	<header>
		<a href="#" class="logo">
			<img src="@/assets/images/logo.svg" alt="уберем." />
		</a>
		<div class="switch">
			<div
				v-for="({ name, text }, index) in state.switchItems"
				:key="index"
				:class="[name, { active: state.activeSwitchItem == name }]"
				@click="state.activeSwitchItem = name"
			>
				{{ text }}
			</div>
		</div>
		<nav :class="{ visible: state.showMobileNav }">
			<a
				v-for="({ url, text }, index) in state.navItems"
				:key="index"
				:href="url"
			>
				{{ text }}
			</a>
		</nav>
		<div class="telephone-block">
			<a href="tel:+380674016977" class="telephone">+380 67 401 69 77</a>
			<span class="separator">|</span>
			<span class="hours">24/7</span>
		</div>
		<button
			:class="['button-nav', { active: state.showMobileNav }]"
			@click="state.showMobileNav = !state.showMobileNav"
		></button>
	</header>
</template>

<style scoped lang="scss">
header {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	width: 100%;
	height: 70px;
	padding: 0 36px 0 66px;

	@include max-width($xl) {
		padding: 0 20px;
	}
}

.logo {
	width: 100px;
	height: 25px;
	margin-right: 24px;
	font-size: 30px;
	font-weight: 700;
}

.switch {
	overflow: hidden;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 35px;
	margin-right: 84px;
	background-color: #fff;
	border: 2px solid #fff;
	border-radius: $radius-alt;

	@include max-width($xl) {
		margin-right: 32px;
	}

	@include max-width($md) {
		margin-right: auto;
	}

	.home,
	.office {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 12px;
		font-size: $font-size-md;
		font-weight: 600;
		border-radius: $radius-alt;
		transition: color $duration-base, background-color $duration-base;
		cursor: pointer;

		&.active {
			color: $color-text-alt;
			background-color: $color-brand;
		}

		&:hover {
			&:not(.active) {
				color: $color-brand;
			}
		}
	}
}

nav {
	@include max-width($md) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		width: 280px;
		height: 100%;
		padding-top: 10px;
		background-color: #fff;
		transform: translateX(-100%);
		transition: transform $duration-base, box-shadow $duration-base;

		&.visible {
			transform: translate(0);
			box-shadow: 5px 0 20px rgba(#000, 0.3);
		}
	}

	a {
		font-weight: 500;
		margin-right: 32px;

		@include max-width($lg) {
			padding-left: 20px;
			margin: 0 0 20px;
		}
	}
}

nav a,
.telephone {
	padding-top: 4px;
	padding-bottom: 4px;
	transition: color $duration-base;

	&:hover {
		color: $color-brand;
	}
}

.telephone-block {
	@include max-width($lg) {
		position: absolute;
		top: 100%;
		left: 20px;
	}

	@include max-width($sm) {
		position: absolute;
		top: 100%;
		left: 20px;
	}
}

.telephone,
.separator,
.hours {
	font-weight: 600;
}

.separator {
	margin: 0 10px;
}

@mixin animate($fromY, $toY, $fromDeg, $toDeg) {
	@keyframes animate {
		from {
			transform: translateY($fromY) rotate($fromDeg);
		}
		to {
			transform: translateY($toY) rotate($toDeg);
		}
	}
	animation-name: animate;
	animation-duration: $duration-base;
	animation-fill-mode: forwards;
}

.button-nav {
	position: relative;
	display: none;
	width: 32px;
	height: 32px;
	background-color: transparent;

	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		display: block;
		width: 100%;
		height: 4px;
		margin-top: -2px;
		background-color: $color-black;
		border-radius: $radius-alt;
		transition: transform $duration-base;
	}

	&::before {
		transform: translateY(-6px);
	}

	&::after {
		transform: translateY(6px);
	}

	&.active {
		&::before {
			transform: translateY(0) rotate(45deg);
		}
		&::after {
			transform: translateY(0) rotate(-45deg);
		}
	}

	@include max-width($md) {
		display: block;
	}
}
</style>
