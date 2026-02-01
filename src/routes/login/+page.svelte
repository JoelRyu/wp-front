<script>
	import { darkMode } from '$lib/stores';
	import { showToast } from '$lib/stores';
	
	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let rememberMe = $state(false);
	let isDarkMode = $derived($darkMode);

	async function handleLogin(e) {
		e.preventDefault();
		
		// Validation
		if (!email.trim() || !password.trim()) {
			errorMessage = '이메일과 비밀번호를 모두 입력해주세요.';
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errorMessage = '유효한 이메일 주소를 입력해주세요.';
			return;
		}

		isLoading = true;
		errorMessage = '';

		try {
			// TODO: Replace with actual API call
			await new Promise(resolve => setTimeout(resolve, 1500));
			console.log('Login attempt:', { email, rememberMe });
			showToast('로그인 성공! (데모)', 'success');
			// TODO: Navigate to dashboard or home
		} catch (error) {
			errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<div class="{isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-white'} flex items-center justify-center px-4 py-8 transition-colors duration-300">
	<div class="w-full max-w-md">
		<!-- Logo/Title Section -->
		<div class="text-center mb-6">
			<div class="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 p-3 rounded-2xl mb-3">
				<span class="text-3xl">🙏</span>
			</div>
			<h1 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-3xl font-bold mb-1">With Prayer</h1>
			<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm">함께하는 기도의 공간</p>
		</div>

		<!-- Login Card -->
		<div class="{isDarkMode ? 'bg-gray-800 border-indigo-500' : 'bg-white border-indigo-600'} rounded-2xl shadow-xl p-6 border-t-4 transition-colors duration-300">
			<h2 class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-bold mb-1">로그인</h2>
			<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-5">계정에 로그인하여 기도 모임에 참여하세요.</p>

			<!-- Error Message -->
			{#if errorMessage}
				<div class="{isDarkMode ? 'bg-red-900 border-red-500' : 'bg-red-50 border-red-500'} mb-4 p-3 border-l-4 rounded-lg flex items-start gap-2">
					<span class="text-red-600 text-lg leading-none mt-0.5">⚠️</span>
					<div>
						<p class="{isDarkMode ? 'text-red-300' : 'text-red-700'} font-semibold text-xs">오류</p>
						<p class="{isDarkMode ? 'text-red-400' : 'text-red-600'} text-xs">{errorMessage}</p>
					</div>
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleLogin} class="space-y-4">
				<!-- Email Input -->
				<div>
					<label for="email" class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} block text-xs font-semibold mb-1">
						이메일 주소 <span class="text-red-500">*</span>
					</label>
					<input
						id="email"
						type="email"
						placeholder="your.email@example.com"
						bind:value={email}
						onkeydown={handleKeydown}
						disabled={isLoading}
						class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-400 disabled:bg-gray-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 disabled:bg-gray-50'} w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors disabled:cursor-not-allowed text-sm"
					/>
				</div>

				<!-- Password Input -->
				<div>
					<label for="password" class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'} block text-xs font-semibold mb-1">
						비밀번호 <span class="text-red-500">*</span>
					</label>
					<input
						id="password"
						type="password"
						placeholder="••••••••"
						bind:value={password}
						onkeydown={handleKeydown}
						disabled={isLoading}
						class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-400 disabled:bg-gray-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 disabled:bg-gray-50'} w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors disabled:cursor-not-allowed text-sm"
					/>
				</div>

				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between">
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={rememberMe}
							disabled={isLoading}
							class="w-3 h-3 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed"
						/>
						<span class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs font-medium">로그인 유지</span>
					</label>
					<a href="#" class="{isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} text-xs font-semibold transition-colors">
						비밀번호 찾기
					</a>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden text-sm"
				>
					{#if isLoading}
						<span class="flex items-center justify-center gap-2">
							<span class="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
							로그인 중...
						</span>
					{:else}
						로그인
					{/if}
				</button>
			</form>

			<!-- Divider -->
			<div class="relative my-4">
				<div class="absolute inset-0 flex items-center">
					<div class="{isDarkMode ? 'border-gray-600' : 'border-gray-300'} w-full border-t"></div>
				</div>
				<div class="relative flex justify-center text-xs">
					<span class="{isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'} px-2">또는</span>
				</div>
			</div>

			<!-- Social Login Buttons -->
			<div class="grid grid-cols-2 gap-3">
				<button
					type="button"
					disabled={isLoading}
					class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} py-2 px-3 border-2 rounded-lg transition-colors disabled:cursor-not-allowed text-xs font-semibold flex items-center justify-center gap-1"
				>
					<span class="text-base">📱</span>
					카카오
				</button>
				<button
					type="button"
					disabled={isLoading}
					class="{isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} py-2 px-3 border-2 rounded-lg transition-colors disabled:cursor-not-allowed text-xs font-semibold flex items-center justify-center gap-1"
				>
					<span class="text-base">🔵</span>
					구글
				</button>
			</div>

			<!-- Sign Up Link -->
			<div class="mt-5 text-center">
				<p class="{isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs">
					아직 계정이 없으신가요?
					<a href="/signup" class="{isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} font-bold transition-colors">
						회원가입
					</a>
				</p>
			</div>
		</div>

		<!-- Security Info -->
		<div class="{isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-5 text-center text-xs space-y-1">
			<p>🔒 이 페이지는 안전하고 암호화되어 있습니다.</p>
		</div>
	</div>
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
