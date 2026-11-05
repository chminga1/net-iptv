import type { APIRoute } from 'astro';
import { Resend } from 'resend';

/**
 * Contact form handler.
 *
 * Runs on the server so the Resend key never reaches the browser; every other
 * route in the project stays prerendered.
 */
export const prerender = false;

const SUBJECTS = [
	'Before I subscribe',
	'Setup help',
	'Billing or refund',
	'Reseller programme',
	'Something else',
] as const;

const LIMITS = { name: 100, email: 254, subject: 100, message: 5000 } as const;

interface ContactPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
	/** Honeypot: hidden from people, irresistible to bots. */
	company?: string;
}

const json = (body: unknown, status: number): Response =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

/** Deliberately permissive — the real check is whether the reply arrives. */
const isEmail = (value: string): boolean =>
	/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** The submitted text lands in an HTML email, so it must not carry markup. */
const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const validate = (
	data: Partial<ContactPayload>,
): { ok: true; value: ContactPayload } | { ok: false; errors: string[] } => {
	const errors: string[] = [];
	const name = (data.name ?? '').trim();
	const email = (data.email ?? '').trim();
	const subject = (data.subject ?? '').trim();
	const message = (data.message ?? '').trim();

	if (!name) errors.push('Please enter your name.');
	else if (name.length > LIMITS.name) errors.push('That name is too long.');

	if (!email) errors.push('Please enter your email address.');
	else if (email.length > LIMITS.email || !isEmail(email))
		errors.push('Please enter a valid email address.');

	if (!message) errors.push('Please enter a message.');
	else if (message.length > LIMITS.message)
		errors.push('That message is too long.');

	// Unknown subjects are coerced rather than rejected: the value comes from a
	// <select>, so anything else means a tampered or stale form, not a mistake.
	const safeSubject = (SUBJECTS as readonly string[]).includes(subject)
		? subject
		: 'Something else';

	if (errors.length > 0) return { ok: false, errors };
	return {
		ok: true,
		value: { name, email, subject: safeSubject, message },
	};
};

export const POST: APIRoute = async ({ request }) => {
	if (!request.headers.get('content-type')?.includes('application/json')) {
		return json({ ok: false, error: 'Expected a JSON body.' }, 415);
	}

	let body: Partial<ContactPayload>;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'Could not read the request.' }, 400);
	}

	// Silently accept honeypot hits so bots get no signal to adapt to.
	if (typeof body.company === 'string' && body.company.trim() !== '') {
		return json({ ok: true, message: 'Thanks — your message is on its way.' }, 200);
	}

	const result = validate(body);
	if (!result.ok) {
		return json({ ok: false, error: result.errors[0], errors: result.errors }, 400);
	}

	const apiKey = import.meta.env.RESEND_API_KEY;
	const to = import.meta.env.TO_EMAIL;
	const from = import.meta.env.FROM_EMAIL ?? 'Net IPTV <onboarding@resend.dev>';

	if (!apiKey || !to) {
		// A config gap is ours, not the visitor's — log loudly, stay vague publicly.
		console.error(
			'[contact] Missing RESEND_API_KEY or TO_EMAIL. Set them in .env (see .env.example).',
		);
		return json(
			{ ok: false, error: 'The contact form is not configured yet. Please email us directly.' },
			500,
		);
	}

	const { name, email, subject, message } = result.value;

	try {
		const resend = new Resend(apiKey);
		const { data, error } = await resend.emails.send({
			from,
			to: [to],
			// Hitting reply in the inbox answers the visitor directly.
			replyTo: email,
			subject: `[Contact] ${subject} — ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
			html: `
				<h2>New contact form message</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
				<hr />
				<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
			`,
		});

		if (error) {
			console.error('[contact] Resend rejected the message:', error);
			return json(
				{ ok: false, error: 'We could not send that right now. Please try again shortly.' },
				502,
			);
		}

		// Log the id so a delivery can be traced in the Resend dashboard.
		console.log(`[contact] sent id=${data?.id ?? 'unknown'} to=${to}`);
		return json({ ok: true, message: 'Thanks — your message is on its way.' }, 200);
	} catch (cause) {
		console.error('[contact] Unexpected failure:', cause);
		return json(
			{ ok: false, error: 'We could not send that right now. Please try again shortly.' },
			500,
		);
	}
};

/** Anything other than POST gets a clear, correct rejection. */
export const ALL: APIRoute = () =>
	json({ ok: false, error: 'Method not allowed.' }, 405);
