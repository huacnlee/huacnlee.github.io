import { preview } from 'astro';

// Use the programmatic server so the test runner owns its lifetime.
const server = await preview({ server: { host: '127.0.0.1', port: 4387 } });
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, async () => { await server.stop(); process.exit(0); });
}
