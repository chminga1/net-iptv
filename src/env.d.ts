/// <reference types="astro/client" />

interface ImportMetaEnv {
	/** Resend API key. Server-only — never expose with a PUBLIC_ prefix. */
	readonly RESEND_API_KEY: string;
	/** Inbox that receives contact form submissions. */
	readonly TO_EMAIL: string;
	/** Verified sender address; falls back to Resend's test sender. */
	readonly FROM_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
