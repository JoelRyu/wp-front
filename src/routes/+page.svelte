<script>
	import { page } from '$app/state';
	import { darkMode, showToast } from '$lib/stores';
	
	let prayerTitle = $state('');
	let prayerContent = $state('');
	let isPublic = $state(false);
	
	let isDarkMode = $derived($darkMode);
	
	function handleSubmit() {
		if (!prayerTitle.trim() || !prayerContent.trim()) {
			// alert('기도 제목과 내용을 입력해주세요.');
			showToast('기도 제목과 내용을 입력해주세요.', 'warning');
			return;
		}
		console.log('Prayer submitted:', { prayerTitle, prayerContent, isPublic });
		// TODO: API call to save prayer
		prayerTitle = '';
		prayerContent = '';
		isPublic = false;
	}
</script>

<div class="space-y-12 {isDarkMode ? 'dark' : ''}">
	<!-- Hero Section -->
	<section class="text-center py-12">
		<h1 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-5xl md:text-6xl font-bold mb-6">
			함께하는 기도의 공간
		</h1>
		<p class="{isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xl mb-4">
			당신의 기도 제목을 나누고, 다른 사람들의 기도에 동참하세요.
		</p>
		<p class="{isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-lg font-semibold">
			✨ 기도의 힘으로 함께 성장합니다
		</p>
	</section>

	<!-- Prayer Form Section -->
	<section class="grid md:grid-cols-3 gap-8">
		<!-- Form Column -->
		<div class="md:col-span-2">
			<div class="{isDarkMode ? 'bg-gray-800 border-indigo-500' : 'bg-white border-indigo-600'} rounded-2xl shadow-lg p-8 border-t-4 transition-colors duration-300">
				<h2 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-3xl font-bold mb-2">🙏 기도 제목 작성</h2>
				<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8">당신의 기도 제목을 나누어주세요. 함께 중보기도하겠습니다.</p>
				
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Prayer Title Input -->
					<div>
						<label for="title" class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} block text-sm font-semibold mb-2">
							기도 제목 <span class="text-red-500">*</span>
						</label>
						<input
							id="title"
							type="text"
							placeholder="예: 면접 잘 보기, 건강 회복, 가족 건강..."
							bind:value={prayerTitle}
							class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
							maxlength="100"
						/>
						<p class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1">{prayerTitle.length}/100</p>
					</div>

					<!-- Prayer Content Input -->
					<div>
						<label for="content" class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} block text-sm font-semibold mb-2">
							기도 내용 <span class="text-red-500">*</span>
						</label>
						<textarea
							id="content"
							placeholder="상세한 기도 제목을 작성해주세요..."
							bind:value={prayerContent}
							rows="6"
							class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-400' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none"
							maxlength="1000"
						></textarea>
						<p class="{isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1">{prayerContent.length}/1000</p>
					</div>

					<!-- Public Toggle -->
					<div class="flex items-center space-x-3">
						<input
							id="public"
							type="checkbox"
							bind:checked={isPublic}
							class="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
						/>
						<label for="public" class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium cursor-pointer">
							Wall에 공개하기 (다른 사람들과 함께 기도할 수 있습니다)
						</label>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						class="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
					>
						기도 제목 올리기
					</button>
				</form>
			</div>
		</div>

		<!-- Info Column -->
		<div class="space-y-6">
			<!-- Features Card -->
			<div class="{isDarkMode ? 'bg-gray-800 border-blue-500' : 'bg-white border-blue-500'} rounded-2xl shadow-lg p-6 border-l-4 transition-colors duration-300">
				<h3 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-lg font-bold mb-4">📱 Features</h3>
				<ul class="space-y-3">
					<li class="flex items-start">
						<span class="text-blue-500 mr-2">✓</span>
						<span class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm">개인 기도 제목 관리</span>
					</li>
					<li class="flex items-start">
						<span class="text-blue-500 mr-2">✓</span>
						<span class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm">공개 기도 나눔</span>
					</li>
					<li class="flex items-start">
						<span class="text-blue-500 mr-2">✓</span>
						<span class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm">함께하는 중보기도</span>
					</li>
					<li class="flex items-start">
						<span class="text-blue-500 mr-2">✓</span>
						<span class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm">기도 응답 기록</span>
					</li>
				</ul>
			</div>

			<!-- Quick Stats -->
			<div class="{isDarkMode ? 'bg-gray-700 border-indigo-500' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'} rounded-2xl shadow-lg p-6 border transition-colors duration-300">
				<h3 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-lg font-bold mb-4">📊 Community</h3>
				<div class="space-y-2">
					<div class="text-sm">
						<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'}">활동 기도 제목</p>
						<p class="{isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-2xl font-bold">128</p>
					</div>
					<div class="text-sm">
						<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'}">함께하는 기도</p>
						<p class="{isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-2xl font-bold">1,234</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Recent Prayers Preview Section -->
	<section class="{isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 transition-colors duration-300">
		<h2 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-3xl font-bold mb-8">🌟 최근 기도 제목</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [1, 2, 3] as _}
				<div class="{isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-500'} rounded-xl p-6 {isDarkMode ? 'border-indigo-500' : 'border-l-4'} hover:shadow-lg transition-all duration-200 cursor-pointer">
					<div class="flex items-start justify-between mb-3">
						<span class="{isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-600'} text-sm font-semibold px-3 py-1 rounded-full">
							공개
						</span>
						<span class="text-2xl">🙏</span>
					</div>
					<h3 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-lg font-bold mb-2 line-clamp-2">
						면접에서 좋은 성과 내기
					</h3>
					<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2">
						앞으로 있을 면접에서 제 역량을 충분히 보여주고 좋은 결과를 얻을 수 있도록...
					</p>
					<div class="flex items-center justify-between text-xs {isDarkMode ? 'text-gray-500' : 'text-gray-500'}">
						<span>👥 24명이 함께 기도</span>
						<span>2시간 전</span>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/wall" class="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
				더 많은 기도 제목 보기 →
			</a>
		</div>
	</section>
</div>
