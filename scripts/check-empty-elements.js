const fs = require('fs');
const path = require('path');

const root = 'public';
const allowedClasses = new Set([
  'blue-dot',
  'chip-lines',
  'cloaked-email',
  'circle',
  'hero-glow',
  'person-accent',
  'service-marker',
  'shape',
  'square',
  'triangle'
]);
const issues = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filePath);
    else if (entry.isFile() && filePath.endsWith('.html') && filePath !== path.join(root, 'nl', 'index.html')) {
      checkFile(filePath);
    }
  }
}

function hasAllowedClass(attributes) {
  const match = attributes.match(/\bclass=(['"])(.*?)\1/);
  if (!match) return false;
  return match[2].split(/\s+/).some(className => allowedClasses.has(className));
}

function isAllowed(attributes) {
  return /\baria-hidden=(['"])true\1/.test(attributes)
    || /\bhidden\b/.test(attributes)
    || /\brole=(['"])(presentation|none)\1/.test(attributes)
    || hasAllowedClass(attributes);
}

function checkFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const elementPattern = /<(div|span|i)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = elementPattern.exec(html)) !== null) {
    const [, tagName, attributes, content] = match;
    const text = content
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, '')
      .trim();
    if (text || isAllowed(attributes)) continue;

    const line = html.slice(0, match.index).split('\n').length;
    issues.push(`${filePath}:${line} empty <${tagName}> without an explicit decorative marker`);
  }
}

walk(root);

if (issues.length) {
  console.error('Empty generated HTML elements found:');
  for (const issue of issues) console.error(`- ${issue}`);
  console.error('Remove dead markup, or mark intentional decorative elements with aria-hidden="true".');
  process.exit(1);
}
