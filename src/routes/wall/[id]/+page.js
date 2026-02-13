import { error } from '@sveltejs/kit';
import { getPrayerById } from '$lib/data/wall-prayers';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const prayer = getPrayerById(params.id);

	if (!prayer) {
		error(404, '해당 기도 제목을 찾을 수 없습니다.');
	}

	return { prayer };
}
