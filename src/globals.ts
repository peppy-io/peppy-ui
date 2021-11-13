import { readable, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const apiBaseUrl = readable("http://localhost:4000");

// JWT token - persist in local storage
export let token: Writable<string>;
if (typeof process === 'undefined' || process.browser) {
  token = writable(window.localStorage.getItem("token") ?? "");
  token.subscribe((val: string) => window.localStorage.setItem("token", val));
} else {
  token = writable("");
  token.subscribe((val: string) => window.localStorage.setItem("token", val));
}

