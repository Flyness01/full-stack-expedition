import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server renders the expedition shell and finished metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Full-Stack Expedition<\/title>/i);
  assert.match(html, /Two summers\. One team\. Countless lessons\./);
  assert.match(html, /class="loading-screen"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("Phase 4 includes all three Frontend Forest repairs", async () => {
  const [forest, progress, dashboard] = await Promise.all([
    readFile(new URL("../app/components/FrontendForest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/hooks/useExpeditionProgress.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GameDashboard.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(forest, /Repair 01 · Layout clearing/);
  assert.match(forest, /Repair 02 · Accessibility crossing/);
  assert.match(forest, /Repair 03 · Component canopy/);
  assert.match(forest, /Interface Compass/);
  assert.match(forest, /draggable=\{!solved\("components"\)\}/);
  assert.match(progress, /frontendCompleted: string\[\]/);
  assert.match(progress, /componentTree: string\[\]/);
  assert.match(dashboard, /Frontend Forest ready · Phase 4/);
});

test("Phase 5 includes the three fictional Backend Caverns systems", async () => {
  const [caverns, progress, dashboard] = await Promise.all([
    readFile(new URL("../app/components/BackendCaverns.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/hooks/useExpeditionProgress.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GameDashboard.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(caverns, /System 01 · Request river/);
  assert.match(caverns, /System 02 · Permission seal/);
  assert.match(caverns, /System 03 · Echo trace/);
  assert.match(caverns, /Generalized example · no company systems or code/);
  assert.match(caverns, /Full-Stack Lantern/);
  assert.match(progress, /backendCompleted: string\[\]/);
  assert.match(progress, /backendFlow: string\[\]/);
  assert.match(dashboard, /Backend Caverns ready · Phase 5/);
});
