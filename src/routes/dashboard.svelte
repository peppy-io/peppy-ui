<script lang="ts">
	import { token } from '../globals';
	import { goto } from '$app/navigation';

        // TODO: validate token from backend here
        if ($token === "") {
            goto("/login");
        }
</script>

<main class="md:container md:mx-auto px-4">
	<h1>Here lies your dashboard</h1>
        <p>token: {$token}</p>

        <!-- TODO: show nice graphs, form to log a task -->
</main>
