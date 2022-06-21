import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	base: '/animation-test/',
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import '@/assets/styles/fonts.scss';
					@import '@/assets/styles/reset.scss';
					@import '@/assets/styles/variables.scss';
					@import '@/assets/styles/mixins.scss';
				`,
			},
		},
	},
});
