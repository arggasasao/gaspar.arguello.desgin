import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	alias: {
		$db: './src/db',
	}
};

export default config;
