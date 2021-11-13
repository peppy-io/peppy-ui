import { readable, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';

export const apiBaseUrl = readable("http://localhost:4000");

// JWT token - persist in local storage
export let token: Writable<string>;
if (browser) {
  token = writable(window.localStorage.getItem("token") ?? "");
  token.subscribe((val: string) => window.localStorage.setItem("token", val));
} else {
  token = writable("");
  token.subscribe((val: string) => browser && window.localStorage.setItem("token", val));
}

