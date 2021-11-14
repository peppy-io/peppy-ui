import { readable, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';

export const apiBaseUrl = readable(import.meta.env.VITE_API_BASE_URL ?? "https://peppy-backend.herokuapp.com");

// JWT token - persist in local storage
export let token: Writable<string>;
if (browser) {
  token = writable(window.localStorage.getItem("token") ?? "");
  token.subscribe((val: string) => window.localStorage.setItem("token", val));
} else {
  token = writable("");
  token.subscribe((val: string) => browser && window.localStorage.setItem("token", val));
}

