import { writable } from 'svelte/store';

// Dark mode store
export const darkMode = writable(false);

// Auth store
export const authStore = writable({
	isLoggedIn: true,
	userName: 'Jone Doe',
	userEmail: 'jone@example.com'
});

/** @typedef {'success' | 'error' | 'warning' | 'info'} ToastType */
/** @typedef {{ id: number; message: string; type: ToastType }} Toast */

// Toast store
/** @type {import('svelte/store').Writable<Toast[]>} */
export const toastStore = writable([]);

/**
 * @param {string} message
 * @param {ToastType} [type='info']
 * @param {number} [duration=3000]
 */
export function showToast(message, type = 'info', duration = 3000) {
	const id = Date.now();
	/** @type {Toast} */
	const toast = { id, message, type };
	
	toastStore.update((toasts) => [...toasts, toast]);
	
	if (duration > 0) {
		setTimeout(() => {
			toastStore.update((toasts) => toasts.filter((t) => t.id !== id));
		}, duration);
	}
	
	return id;
}

/**
 * @param {number} id
 */
export function removeToast(id) {
	toastStore.update((toasts) => toasts.filter((t) => t.id !== id));
}
