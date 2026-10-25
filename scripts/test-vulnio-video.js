const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, before, test } = require('node:test');

let destination;

before(() => {
  destination = fs.mkdtempSync(path.join(os.tmpdir(), 'ijam-vulnio-'));
  execFileSync('hugo', ['--destination', destination], { stdio: 'pipe' });
});

after(() => {
  if (destination) fs.rmSync(destination, { recursive: true, force: true });
});

for (const page of ['labels/vulnio/index.html', 'en/labels/vulnio/index.html']) {
  test(`${page} introduces the playable video before the product detail`, () => {
    const html = fs.readFileSync(path.join(destination, page), 'utf8');
    const video = html.match(/<video\b[^>]*>[\s\S]*?<\/video>/);

    assert.ok(video, 'video element exists');
    assert.match(video[0], /\bcontrols\b/);
    assert.match(video[0], /<source\s+src="\/video\/vulnio\.mp4"\s+type="video\/mp4">/);
    assert.ok(video.index > html.indexOf('class="flyer flyer-assessment"'), 'video belongs to the product introduction');
    assert.ok(video.index > html.indexOf('Evidence, not assumptions.'), 'introduction precedes the video');
    assert.ok(video.index < html.indexOf('class="product-window assessment-window"'), 'video precedes the product detail');
    assert.match(video[0], /\bposter="\/img\/vulnio-poster\.jpg"/);
  });
}

test('the referenced video is included in the deployed site', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'static', 'video', 'vulnio.mp4'));
  const published = fs.readFileSync(path.join(destination, 'video', 'vulnio.mp4'));
  assert.deepEqual(published, source);
});

test('the video preview image is included in the deployed site', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'static', 'img', 'vulnio-poster.jpg'));
  const published = fs.readFileSync(path.join(destination, 'img', 'vulnio-poster.jpg'));
  assert.equal(source.subarray(0, 2).toString('hex'), 'ffd8');
  assert.deepEqual(published, source);
});
