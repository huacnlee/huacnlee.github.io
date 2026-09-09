import type { APIRoute, GetStaticPaths } from 'astro';

const sources = import.meta.glob<string>('./**/*.md', {
  query: '?raw', import: 'default', eager: true,
});

export const getStaticPaths: GetStaticPaths = () => Object.entries(sources).map(([file, source]) => ({
  params: { document: file.slice(2, -3) },
  props: { source },
}));

export const GET: APIRoute = ({ props, params, site }) => {
  const document = String(params.document);
  const pagePath = document === 'index' ? '/' : `/${document.replace(/\/index$/, '')}/`;
  const canonical = new URL(pagePath, site).href;
  // Keep the original Markdown, including its inline HTML and source links.
  // Only omit build-specific frontmatter; HTML and Markdown share one content source.
  const body = (props.source as string).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
  return new Response(`Source: ${canonical}\nLanguage: ${document.startsWith('zh/') ? 'zh-CN' : 'en'}\n\n${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
