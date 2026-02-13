import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth';
import { paraglideMiddleware } from '$lib/paraglide/server';

/**
 * @type {import('@sveltejs/kit').Handle}
 */
const handleParaglide = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: (
				/** @type {{ html: string }} */ { html }
			) => html.replace('%paraglide.lang%', locale)
		});
	});

/**
 * @type {import('@sveltejs/kit').Handle}
 */
const handleAuth = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle = sequence(handleParaglide, handleAuth);
