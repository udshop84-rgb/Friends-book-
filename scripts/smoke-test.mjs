import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/globals.css',
  'components/MediaPulseApp.tsx',
  'lib/media.ts',
  'package.json',
  'tailwind.config.ts',
  'tsconfig.json'
];

const requiredFeatureSnippets = [
  ['MediaPulse brand', 'MediaPulse'],
  ['drag-and-drop upload handler', 'onDrop='],
  ['file picker accept list', 'accept=".mp4,.mov,.webm,.jpg,.png,.webp,.svg"'],
  ['image size limit', '10MB'],
  ['video size limit', '100MB'],
  ['upload progress indicator', 'Uploading...'],
  ['media gallery', 'Media Gallery'],
  ['HTML5 video playback', '<video'],
  ['share modal', 'Share asset'],
  ['download action', 'Download'],
  ['optimistic delete confirmation', 'Are you sure you want to delete this image?'],
  ['blog editor', 'Blog Editor'],
  ['draft workflow', 'Save Draft'],
  ['publish workflow', 'Publish Instantly'],
  ['feed search', 'Search posts'],
  ['PDF export action', 'Download PDF'],
  ['RESTful storage notes', 'POST /api/media/sign-upload']
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);
}

const appSource = existsSync(join(root, 'components/MediaPulseApp.tsx'))
  ? readFileSync(join(root, 'components/MediaPulseApp.tsx'), 'utf8')
  : '';
const libSource = existsSync(join(root, 'lib/media.ts'))
  ? readFileSync(join(root, 'lib/media.ts'), 'utf8')
  : '';
const combined = `${appSource}\n${libSource}`;

for (const [label, snippet] of requiredFeatureSnippets) {
  if (!combined.includes(snippet)) failures.push(`Missing feature marker: ${label} (${snippet})`);
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const scriptName of ['dev', 'build', 'typecheck', 'test']) {
  if (!packageJson.scripts?.[scriptName]) failures.push(`Missing npm script: ${scriptName}`);
}

if (failures.length) {
  console.error('MediaPulse smoke test failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('MediaPulse smoke test passed. Core files, scripts, and product feature markers are present.');
