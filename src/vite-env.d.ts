/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PUBLIC_API_URL: string
	readonly VITE_PUBLIC_MOCK_API: 'true' | 'false' // Env var used if we want to mock API calls
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
