<script>
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { darkMode, authStore } from '$lib/stores';
	import Toast from '$lib/Toast.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	
	let isDarkMode = $derived($darkMode);
	let isLoggedIn = $derived($authStore.isLoggedIn);
	let userName = $derived($authStore.userName);
	
	const navigation = [
		{ label: 'Home', href: '/' },
		{ label: 'Wall', href: '/wall' },
		{ label: 'My', href: '/my' }
	];

	function handleLogout() {
		authStore.update((auth) => ({
			...auth,
			isLoggedIn: false
		}));
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen {isDarkMode ? 'dark' : ''} bg-gradient-to-br {isDarkMode ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-blue-50 to-indigo-100'} transition-colors duration-300">
	<!-- Navigation Header -->
	<nav class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md sticky top-0 z-50 transition-colors duration-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center">
					<a href="/" class="text-2xl font-bold bg-gradient-to-r {isDarkMode ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent">
						🙏 With Prayer
					</a>
				</div>
				<div class="hidden md:flex space-x-8">
					{#each navigation as item (item.href)}
						<a 
							href={item.href}
							class="{isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition-colors duration-200 relative group"
						>
							{item.label}
							<span class="{isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'} absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"></span>
						</a>
					{/each}
				</div>
				<div class="flex items-center space-x-4">
					<div class="flex space-x-2">
						{#each locales as locale (locale)}
							<a 
								href={localizeHref(page.url.pathname, { locale })}
								class="{isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-indigo-100'} px-2 py-1 text-xs font-semibold rounded transition-colors"
							>
								{locale.toUpperCase()}
							</a>
						{/each}
					</div>
					
					<!-- Dark Mode Toggle -->
					<button
						onclick={() => darkMode.update(val => !val)}
						class="{isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
						title="다크모드 토글"
					>
						{isDarkMode ? '☀️' : '🌙'}
					</button>
					
					{#if isLoggedIn}
						<div class="flex items-center space-x-3">
							<span class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center {isDarkMode ? 'text-white' : 'text-white'} font-bold text-sm">
								{userName.charAt(0)}
							</span>
							<div class="text-sm">
								<p class="{isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-semibold">{userName}</p>
								<button onclick={handleLogout} class="{isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} text-xs font-medium">
									로그아웃
								</button>
							</div>
						</div>
					{:else}
						<a href="/login" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
							Sign In
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t transition-colors duration-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="text-center {isDarkMode ? 'text-gray-400' : 'text-gray-600'}">
				<p class="text-sm">© 2026 With Prayer. 기도의 힘으로 함께합니다.</p>
			</div>
		</div>
	</footer>
</div>

<!-- Toast Notifications -->
<Toast />
