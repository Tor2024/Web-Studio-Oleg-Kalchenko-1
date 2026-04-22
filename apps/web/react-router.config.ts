import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

const presets: Config['presets'] = [];
if (process.env.VERCEL) {
  presets.push(vercelPreset());
}

export default {
  appDirectory: './src/app',
  ssr: true,
  presets,
} satisfies Config;
