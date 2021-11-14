<script lang="ts">
	import { goto } from '$app/navigation';
	import Error from '../components/Error.svelte';
	import ApiResp from '../components/ApiResp.svelte';
	import { apiBaseUrl, token } from '../globals';

	let username = '';
	let password = '';
	let errors = [];
	let resp = null;

	function success(resp: Response) {
                resp.text().then((jwt) => {
                    token.set(jwt);
                    goto('/');
                });
	}

	function signIn() {
		console.log(username, password);
		errors = [];

		if (username === '') {
			errors = [...errors, 'Username cannot be empty'];
		}
		if (password === '') {
			errors = [...errors, 'Password cannot be empty'];
		}

		if (errors.length === 0) {
			// all good! submit

			resp = fetch(`${$apiBaseUrl}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
		}

		return false;
	}
</script>

<!-- source: https://tailwindui.com/components/application-ui/forms/sign-in-forms --->
<main class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-gray-50">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
		</div>
		<form class="mt-8 space-y-6">
			<input type="hidden" name="remember" value="true" />
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="username" class="sr-only">Username</label>
					<input
						id="username"
						name="username"
						type="name"
						autocomplete="username"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="User name"
						bind:value={username}
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
						bind:value={password}
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="text-sm">
					<a sveltekit:prefetch href="/signup" class="font-medium text-indigo-300 hover:text-indigo-100">
						Sign up instead?
					</a>
				</div>
			</div>

			<Error {errors} />

			<ApiResp prom={resp} callback={success} />

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					on:click|preventDefault={signIn}
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Sign In
				</button>
			</div>
		</form>
	</div>
</main>
