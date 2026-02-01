<script>
	import { toastStore, removeToast } from './stores';
	import { darkMode } from './stores';
	
	let isDarkMode = $derived($darkMode);
	
	function getToastStyles(type) {
		const base = isDarkMode 
			? 'bg-gray-800 border-l-4' 
			: 'bg-white border-l-4';
		
		const styles = {
			success: `${base} border-green-500 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`,
			error: `${base} border-red-500 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`,
			warning: `${base} border-yellow-500 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`,
			info: `${base} border-blue-500 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`
		};
		
		return styles[type] || styles.info;
	}
	
	function getIconEmoji(type) {
		const icons = {
			success: '✅',
			error: '❌',
			warning: '⚠️',
			info: 'ℹ️'
		};
		return icons[type] || icons.info;
	}
</script>

<div class="fixed top-6 right-6 z-50 pointer-events-none space-y-3">
	{#each $toastStore as toast (toast.id)}
		<div
			class="{getToastStyles(toast.type)} rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slideIn pointer-events-auto max-w-sm"
			role="alert"
		>
			<span class="text-xl leading-none mt-0.5">{getIconEmoji(toast.type)}</span>
			<p class="font-medium text-sm">{toast.message}</p>
			<button
				onclick={() => removeToast(toast.id)}
				class="{isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} ml-auto transition-colors"
				title="닫기"
			>
				✕
			</button>
		</div>
	{/each}
</div>

<style>
	@keyframes slideIn {
		from {
			transform: translateX(400px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	
	@keyframes slideOut {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(400px);
			opacity: 0;
		}
	}
	
	.animate-slideIn {
		animation: slideIn 0.3s ease-out;
	}
</style>
