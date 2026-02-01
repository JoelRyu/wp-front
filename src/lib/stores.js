import { writable } from 'svelte/store';

// Dark mode store
export const darkMode = writable(false);

// Auth store
export const authStore = writable({
	isLoggedIn: true,
	userName: 'Jone Doe',
	userEmail: 'jone@example.com'
});

// Toast store
export const toastStore = writable([]);

export function showToast(message, type = 'info', duration = 3000) {
	const id = Date.now();
	const toast = { id, message, type };
	
	toastStore.update(toasts => [...toasts, toast]);
	
	if (duration > 0) {
		setTimeout(() => {
			toastStore.update(toasts => toasts.filter(t => t.id !== id));
		}, duration);
	}
	
	return id;
}

export function removeToast(id) {
	toastStore.update(toasts => toasts.filter(t => t.id !== id));
}
