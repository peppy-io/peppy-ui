# Peppy UI

Frontend for Peppy. Built with [SvelteKit](https://kit.svelte.dev/docs#introduction-getting-started), [Tailwind](https://github.com/svelte-add/tailwindcss) and TypeScript.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

By default, it will use the hosted backend for API calls. Create a `.env` file with the following to customize this:
```env
VITE_API_BASE_URL=http://localhost:4000
```

## Building

Currently, the frontend is hosted on vercel. Use this command to build the app for vercel:

```bash
npm run build
```

You can preview the built app with `npm run preview`.
