<script>
	let selectedFilter = $state('recent');
	let searchQuery = $state('');
	import { darkMode } from '$lib/stores';
	let isDarkMode = $derived($darkMode);

	// Mock data - TODO: Replace with API call
	const prayers = [
		{
			id: 1,
			title: '면접에서 좋은 성과 내기',
			content: '앞으로 있을 면접에서 제 역량을 충분히 보여주고 좋은 결과를 얻을 수 있도록 기도해주세요.',
			author: '익명',
			createdAt: '2시간 전',
			participants: 24,
			category: '취업',
			isPublic: true
		},
		{
			id: 2,
			title: '가족의 건강과 평안',
			content: '부모님과 형제의 건강과 안전을 위해 기도 부탁드립니다. 모두가 행복하고 평안한 시간을 갖길 원합니다.',
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
			content: '시험 준비를 하고 있습니다. 집중력을 잃지 않고 좋은 성적을 거둘 수 있도록 기도해주세요.',
			author: '익명',
			createdAt: '8시간 전',
			participants: 42,
			category: '학업',
			isPublic: true
		},
		{
			id: 5,
			title: '신앙의 깊이',
			content: '하나님과의 관계가 더욱 깊어질 수 있도록, 영적으로 성장하고 중보기도 할 수 있는 마음을 주시길 원합니다.',
			author: '익명',
			createdAt: '10시간 전',
			participants: 31,
			category: '영적 성장',
			isPublic: true
		},
		{
			id: 6,
			title: '치유와 회복',
			content: '건강의 어려움을 겪고 있는 친지를 위해 기도 부탁드립니다. 완전한 치유와 회복을 바랍니다.',
			author: '익명',
			createdAt: '12시간 전',
			participants: 27,
			category: '건강',
			isPublic: true
		}
	];

	const categories = ['전체', '취업', '가정', '일', '학업', '영적 성장', '건강'];

	let filteredPrayers = $derived.by(() => {
		return prayers
			.filter(prayer => {
				const matchesSearch = prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					prayer.content.toLowerCase().includes(searchQuery.toLowerCase());
				return matchesSearch;
			})
			.sort((a, b) => {
				if (selectedFilter === 'recent') {
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				} else if (selectedFilter === 'popular') {
					return b.participants - a.participants;
				}
				return 0;
			});
	});

	function handleJoinPrayer(id) {
		console.log('Join prayer:', id);
		// TODO: API call to join prayer
		// alert('함께 기도하겠습니다! 🙏');
		showToast('함께 기도하겠습니다! 🙏', 'success');
	}
</script>

<div class="space-y-8">
	<!-- Header Section -->
	<section class="text-center py-8">
		<h1 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-4xl md:text-5xl font-bold mb-3">
			🌍 기도의 벽
		</h1>
		<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg">
			함께 나누는 기도 제목들입니다. 클릭하여 함께 기도해주세요.
		</p>
	</section>

	<!-- Search and Filter Section -->
	<section class="{isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 sticky top-20 z-40 transition-colors duration-300">
		<div class="space-y-4">
			<!-- Search Bar -->
			<div class="relative">
				<input
					type="text"
					placeholder="기도 제목 검색..."
					bind:value={searchQuery}
					class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} w-full px-4 py-3 pl-12 border-2 rounded-lg focus:outline-none transition-colors"
				/>
				<svg class="absolute left-4 top-3.5 w-5 h-5 {isDarkMode ? 'text-gray-500' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>

			<!-- Filter and Sort -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- Sort Options -->
				<div>
					<label class="block text-xs font-semibold {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2" for="sort-select">정렬</label>
					<div class="flex space-x-3">
						<button
							onclick={() => (selectedFilter = 'recent')}
							class="px-4 py-2 rounded-lg font-medium transition-all duration-200 {selectedFilter === 'recent'
								? 'bg-indigo-600 text-white shadow-lg'
								: isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							최신순
						</button>
						<button
							onclick={() => (selectedFilter = 'popular')}
							class="px-4 py-2 rounded-lg font-medium transition-all duration-200 {selectedFilter === 'popular'
								? 'bg-indigo-600 text-white shadow-lg'
								: isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							인기순
						</button>
					</div>
				</div>

				<!-- Category Filter (info text) -->
				<div>
					<label class="block text-xs font-semibold {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2" for="category-select">카테고리</label>
					<div class="flex flex-wrap gap-2">
						{#each categories.slice(0, 4) as category}
							<span class="{isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-medium">
								{category}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Results Info -->
	<div class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm">
		총 <span class="{isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} font-bold">{filteredPrayers.length}</span>개의 기도 제목이 있습니다.
	</div>

	<!-- Prayers Grid -->
	<section class="grid gap-6">
		{#each filteredPrayers as prayer (prayer.id)}
			<div class="{isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group cursor-pointer transform hover:scale-102">
				<div class="{isDarkMode ? 'bg-gray-700 border-indigo-500' : 'bg-gradient-to-br from-white to-blue-50 border-indigo-500'} p-6 border-l-4">
					<!-- Header -->
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<div class="flex items-center space-x-2 mb-2">
								<span class="{isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} text-xs font-bold px-3 py-1 rounded-full">
									{prayer.category}
								</span>
								<span class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs">{prayer.createdAt}</span>
							</div>
							<h3 class="{isDarkMode ? 'text-gray-100 group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
								{prayer.title}
							</h3>
						</div>
					</div>

					<!-- Content -->
					<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 line-clamp-2">
						{prayer.content}
					</p>

					<!-- Footer -->
					<div class="flex items-center justify-between pt-4 {isDarkMode ? 'border-gray-600' : 'border-gray-200'} border-t">
						<div class="flex items-center space-x-4 text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-600'}">
							<span class="flex items-center">
								<span class="text-lg mr-1">👥</span>
								{prayer.participants}명 함께 기도 중
							</span>
							<span class="flex items-center">
								<span class="text-lg mr-1">✍️</span>
								{prayer.author}
							</span>
						</div>
						<button
							onclick={() => handleJoinPrayer(prayer.id)}
							class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
						>
							함께 기도하기
						</button>
					</div>
				</div>
			</div>
		{/each}

		{#if filteredPrayers.length === 0}
			<div class="text-center py-16">
				<div class="text-6xl mb-4">🔍</div>
				<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xl mb-2">검색 결과가 없습니다.</p>
				<p class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'}">다른 검색어를 시도해주세요.</p>
			</div>
		{/if}
	</section>

	<!-- Call to Action -->
	<section class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-12 text-center text-white">
		<h2 class="text-3xl font-bold mb-4">당신의 기도 제목을 나누세요</h2>
		<p class="text-lg mb-8 opacity-90">
			함께하는 기도의 힘을 경험하세요. 당신의 기도 제목이 다른 사람들을 축복할 수 있습니다.
		</p>
		<a
			href="/"
			class="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200"
		>
			기도 제목 올리기
		</a>
	</section>
</div>

<style>
	:global(.group) {
		@apply transition-transform duration-200;
	}
</style>
