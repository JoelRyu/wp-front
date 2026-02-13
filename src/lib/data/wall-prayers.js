/** @typedef {Object} PrayerItem
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string} author
 * @property {string} createdAt
 * @property {number} participants
 * @property {string} category
 * @property {boolean} isPublic
 */

/** @type {PrayerItem[]} */
export const wallPrayers = [
	{
		id: 1,
		title: '면접에서 좋은 성과 내기',
		content:
			'앞으로 있을 면접에서 제 역량을 충분히 보여주고 좋은 결과를 얻을 수 있도록 기도해주세요.',
		author: '익명',
		createdAt: '2시간 전',
		participants: 24,
		category: '취업',
		isPublic: true
	},
	{
		id: 2,
		title: '가족의 건강과 평안',
		content:
			'부모님과 형제의 건강과 안전을 위해 기도 부탁드립니다. 모두가 행복하고 평안한 시간을 갖길 원합니다.',
		author: '익명',
		createdAt: '4시간 전',
		participants: 38,
		category: '가정',
		isPublic: true
	},
	{
		id: 3,
		title: '프로젝트 성공적으로 완료하기',
		content: '현재 진행 중인 프로젝트가 일정에 맞춰 성공적으로 완료될 수 있도록 도움과 지혜를 구합니다.',
		author: '익명',
		createdAt: '6시간 전',
		participants: 16,
		category: '일',
		isPublic: true
	},
	{
		id: 4,
		title: '학업 성취',
		content:
			'시험 준비를 하고 있습니다. 집중력을 잃지 않고 좋은 성적을 거둘 수 있도록 기도해주세요.',
		author: '익명',
		createdAt: '8시간 전',
		participants: 42,
		category: '학업',
		isPublic: true
	},
	{
		id: 5,
		title: '신앙의 깊이',
		content:
			'하나님과의 관계가 더욱 깊어질 수 있도록, 영적으로 성장하고 중보기도 할 수 있는 마음을 주시길 원합니다.',
		author: '익명',
		createdAt: '10시간 전',
		participants: 31,
		category: '영적 성장',
		isPublic: true
	},
	{
		id: 6,
		title: '치유와 회복',
		content:
			'건강의 어려움을 겪고 있는 친지를 위해 기도 부탁드립니다. 완전한 치유와 회복을 바랍니다.',
		author: '익명',
		createdAt: '12시간 전',
		participants: 27,
		category: '건강',
		isPublic: true
	}
];

/**
 * @param {number | string} id
 * @returns {PrayerItem | undefined}
 */
export function getPrayerById(id) {
	const prayerId = typeof id === 'string' ? Number(id) : id;
	if (!Number.isInteger(prayerId)) return undefined;
	return wallPrayers.find((prayer) => prayer.id === prayerId);
}