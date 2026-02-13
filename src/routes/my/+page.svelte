<script>
	import { darkMode } from '$lib/stores';

	let selectedTab = $state('my-prayers');
	let isLoggedIn = $state(false); // TODO: Connect to auth system
	let isDarkMode = $derived($darkMode);

	// Mock data - TODO: Replace with API call
	const myPrayers = [
		{
			id: 1,
			title: '새 직장에서의 적응',
			content: '새로운 직장에서 좋은 동료들과 함께 성장할 수 있도록...',
			createdAt: '2026-02-01',
			isAnswered: false,
			isPublic: true,
			participants: 12
		},
		{
			id: 2,
			title: '부모님 건강',
			content: '부모님의 건강을 지켜주시고...',
			createdAt: '2026-01-28',
			isAnswered: false,
			isPublic: true,
			participants: 8
		},
		{
			id: 3,
			title: '감사의 응답',
			content: '지난 달 기도했던 일들이 잘 해결되어 감사합니다. 주님께 영광을...',
			createdAt: '2026-01-15',
			isAnswered: true,
			isPublic: false,
			participants: 0
		}
	];

	const participatingPrayers = [
		{
			id: 101,
			title: '면접에서 좋은 성과 내기',
			author: '익명',
			createdAt: '2시간 전',
			participants: 24,
			joinedAt: '1시간 전'
		},
		{
			id: 102,
			title: '가족의 건강과 평안',
			author: '익명',
			createdAt: '4시간 전',
			participants: 38,
			joinedAt: '30분 전'
		},
		{
			id: 103,
			title: '프로젝트 성공적으로 완료하기',
			author: '익명',
			createdAt: '6시간 전',
			participants: 16,
			joinedAt: '2시간 전'
		}
	];

	/** @param {number} id */
	function handleEditPrayer(id) {
		console.log('Edit prayer:', id);
		// TODO: Implement edit functionality
	}

	/** @param {number} id */
	function handleDeletePrayer(id) {
		if (confirm('정말 삭제하시겠습니까?')) {
			console.log('Delete prayer:', id);
			// TODO: Implement delete functionality
		}
	}

	/** @param {number} id */
	function handleMarkAnswered(id) {
		console.log('Mark as answered:', id);
		// TODO: Implement mark as answered functionality
	}

	/** @param {number} id */
	function handleLeavePrayer(id) {
		console.log('Leave prayer:', id);
		// TODO: Implement leave prayer functionality
	}
</script>

<div class="space-y-8">
	<!-- Login Required Check -->
	{#if !isLoggedIn}
		<div class="{isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-500'} border-l-4 rounded-lg p-8 text-center transition-colors duration-300">
			<h2 class="{isDarkMode ? 'text-blue-100' : 'text-blue-900'} text-2xl font-bold mb-3">🔒 로그인이 필요합니다</h2>
			<p class="{isDarkMode ? 'text-blue-300' : 'text-blue-700'} mb-6">나의 기도 제목을 관리하고, 기도 모임에 참여하려면 로그인해주세요.</p>
			<button class="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
				로그인하기
			</button>
		</div>
	{/if}

	<!-- Header Section -->
	<section class="text-center py-8">
		<h1 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-4xl md:text-5xl font-bold mb-3">
			😊 My 기도
		</h1>
		<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg">
			개인 기도 제목 관리 및 참여 중인 기도 모임을 확인하세요.
		</p>
	</section>

	<!-- Stats Section -->
	<section class="grid md:grid-cols-3 gap-6">
		<div class="{isDarkMode ? 'bg-gray-700 border-blue-500' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500'} rounded-2xl shadow-lg p-6 border-l-4 transition-colors duration-300">
			<div class="flex items-center justify-between">
				<div>
					<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm">작성한 기도 제목</p>
					<p class="{isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-3xl font-bold">{myPrayers.length}</p>
				</div>
				<span class="text-4xl">🙏</span>
			</div>
		</div>

		<div class="{isDarkMode ? 'bg-gray-700 border-green-500' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500'} rounded-2xl shadow-lg p-6 border-l-4 transition-colors duration-300">
			<div class="flex items-center justify-between">
				<div>
					<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm">참여 중인 기도</p>
					<p class="{isDarkMode ? 'text-green-400' : 'text-green-600'} text-3xl font-bold">{participatingPrayers.length}</p>
				</div>
				<span class="text-4xl">👥</span>
			</div>
		</div>

		<div class="{isDarkMode ? 'bg-gray-700 border-yellow-500' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-500'} rounded-2xl shadow-lg p-6 border-l-4 transition-colors duration-300">
			<div class="flex items-center justify-between">
				<div>
					<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm">응답된 기도</p>
					<p class="{isDarkMode ? 'text-yellow-400' : 'text-orange-600'} text-3xl font-bold">{myPrayers.filter(p => p.isAnswered).length}</p>
				</div>
				<span class="text-4xl">✨</span>
			</div>
		</div>
	</section>

	<!-- Tab Navigation -->
	<section class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg overflow-hidden border-4 transition-colors duration-300">
		<div class="{isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} flex border-b-2">
			<button
				onclick={() => (selectedTab = 'my-prayers')}
				class="flex-1 py-5 px-6 font-bold text-lg transition-all duration-300 {selectedTab === 'my-prayers'
					? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md border-b-4 border-indigo-700'
					: isDarkMode ? 'text-gray-300 hover:text-indigo-400 hover:bg-gray-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'}"
			>
				📝 내 기도 제목 <span class="ml-2 px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-semibold">{myPrayers.length}</span>
			</button>
			<button
				onclick={() => (selectedTab = 'participating')}
				class="flex-1 py-5 px-6 font-bold text-lg transition-all duration-300 {selectedTab === 'participating'
					? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md border-b-4 border-green-700'
					: isDarkMode ? 'text-gray-300 hover:text-green-400 hover:bg-gray-600' : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'}"
			>
				👥 참여 중인 기도 <span class="ml-2 px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-semibold">{participatingPrayers.length}</span>
			</button>
		</div>

		<div class="p-8 {selectedTab === 'my-prayers' ? isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50' : isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'} transition-colors duration-300">
			<!-- My Prayers Tab -->
			{#if selectedTab === 'my-prayers'}
				<div class="space-y-4">
					{#each myPrayers as prayer (prayer.id)}
						<div class="{isDarkMode ? 'bg-gray-600 border-indigo-500' : 'bg-gradient-to-br from-white to-blue-50 border-indigo-500'} rounded-xl border-l-4 p-6 hover:shadow-lg transition-all duration-200">
							<div class="flex items-start justify-between mb-4">
								<div class="flex-1">
									<div class="flex items-center space-x-3 mb-2">
										<h3 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-bold">
											{prayer.title}
										</h3>
										{#if prayer.isAnswered}
											<span class="{isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'} px-3 py-1 rounded-full text-xs font-bold">
												응답됨 ✨
											</span>
										{/if}
										{#if prayer.isPublic}
											<span class="{isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-bold">
												공개
											</span>
										{:else}
											<span class="{isDarkMode ? 'bg-gray-500 text-gray-300' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-xs font-bold">
												비공개
											</span>
										{/if}
									</div>
									<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3">{prayer.content}</p>
									<div class="flex items-center space-x-4 text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-500'}">
										<span>📅 {prayer.createdAt}</span>
										{#if prayer.participants > 0}
											<span>👥 {prayer.participants}명이 기도 중</span>
										{/if}
									</div>
								</div>
								<div class="flex space-x-2 ml-4">
									{#if !prayer.isAnswered}
										<button
										onclick={() => handleMarkAnswered(prayer.id)}
										class="{isDarkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200'} px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
										title="응답됨으로 표시"
									>
										✓ 답변
									</button>
								{/if}
								<button
									onclick={() => handleEditPrayer(prayer.id)}
									class="{isDarkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
									title="편집"
								>
									✏️ 수정
								</button>
								<button
									onclick={() => handleDeletePrayer(prayer.id)}
										class="{isDarkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'} px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
										title="삭제"
									>
										🗑️ 삭제
									</button>
								</div>
							</div>
						</div>
					{/each}

					{#if myPrayers.length === 0}
						<div class="text-center py-12">
							<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xl mb-2">작성한 기도 제목이 없습니다.</p>
							<p class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-6">첫 번째 기도 제목을 작성해보세요!</p>
							<a href="/" class="inline-block px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
								기도 제목 작성하기
							</a>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Participating Prayers Tab -->
			{#if selectedTab === 'participating'}
				<div class="space-y-4">
					{#each participatingPrayers as prayer (prayer.id)}
						<div class="{isDarkMode ? 'bg-gray-600 border-green-500' : 'bg-gradient-to-br from-white to-green-50 border-green-500'} rounded-xl border-l-4 p-6 hover:shadow-lg transition-all duration-200">
							<div class="flex items-start justify-between mb-4">
								<div class="flex-1">
									<h3 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-bold mb-2">
										{prayer.title}
									</h3>
									<div class="flex items-center space-x-4 text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3">
										<span>✍️ {prayer.author}</span>
										<span>⏰ {prayer.createdAt}</span>
										<span>👥 {prayer.participants}명 함께 기도</span>
										<span class="{isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold">✓ 참여 중 ({prayer.joinedAt})</span>
									</div>
								</div>
								<button
									onclick={() => handleLeavePrayer(prayer.id)}
									class="{isDarkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'} px-4 py-2 font-bold rounded-lg transition-colors whitespace-nowrap ml-4"
									title="기도 모임에서 나가기"
								>
									✕ 나가기
								</button>
							</div>
						</div>
					{/each}

					{#if participatingPrayers.length === 0}
						<div class="text-center py-12">
							<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xl mb-2">참여 중인 기도가 없습니다.</p>
							<p class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-6">Wall에서 기도 제목을 찾아 함께 기도해보세요!</p>
							<a href="/wall" class="inline-block px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
								Wall 보기
							</a>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Quick Stats -->
	<section class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
		<h2 class="text-2xl font-bold mb-4">💪 기도의 힘</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div>
				<p class="text-indigo-100 mb-2">총 기도 시간</p>
				<p class="text-3xl font-bold">42시간</p>
			</div>
			<div>
				<p class="text-indigo-100 mb-2">축복한 기도들</p>
				<p class="text-3xl font-bold">127개</p>
			</div>
			<div>
				<p class="text-indigo-100 mb-2">연속 기도일</p>
				<p class="text-3xl font-bold">21일</p>
			</div>
		</div>
	</section>
</div>
