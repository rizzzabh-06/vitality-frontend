import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("landing page links to the standalone frontend workspace", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Security testing that can prove it stayed in bounds/);
  assert.match(page, /href="\/app"/);
});

test("app documents the S3 handoff without making browser connections", async () => {
  const [page, vite, packageJson, readme] = await Promise.all([
    readFile(new URL("../app/app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);
  const source = `${page}\n${vite}\n${packageJson}`;

  assert.match(page, /S3 ARTIFACT HANDOFF/);
  assert.match(page, /Ingestion is owned by the backend team/);
  assert.match(page, /No browser request is attempted/);
  assert.match(readme, /backend team owns S3 delivery and every ingestion step/i);
  assert.doesNotMatch(source, /fetch\s*\(|EventSource|WebSocket|apiClient|streamRunEvents/);
  assert.doesNotMatch(source, /supabase|NEXT_PUBLIC_|cloudflare|drizzle|D1Database|R2Bucket/i);
  assert.doesNotMatch(source, /@aws-sdk|aws-amplify|s3Client/i);
});
