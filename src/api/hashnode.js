/**
 * hashnode.js — Hashnode GraphQL API client
 * Paul Nyang'wara Portfolio v6.1
 *
 * Mirrors the same publication used by neurosparkcorporation.ai.
 * Posts on the portfolio link back to NeuroSpark as the canonical URL.
 *
 * CONFIG: Set PUBLICATION_HOST to your Hashnode publication host
 * e.g. 'blog.neurosparkcorporation.ai' or 'paulnyangwara.hashnode.dev'
 */

const HASHNODE_API      = 'https://gql.hashnode.com';
const PUBLICATION_HOST  = 'blog.neurosparkcorporation.ai'; // ← update when live

/* ── Low-level GQL fetch ──────────────────────────────────────────── */
async function gql(query, variables = {}) {
  const res = await fetch(HASHNODE_API, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Hashnode API ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

/* ── Fetch post list ──────────────────────────────────────────────── */
export async function fetchPosts({ first = 20 } = {}) {
  const data = await gql(
    `query GetPosts($host: String!, $first: Int!) {
       publication(host: $host) {
         posts(first: $first) {
           edges {
             node {
               id title brief slug publishedAt
               coverImage { url }
               tags { name }
               readTimeInMinutes
             }
           }
         }
       }
     }`,
    { host: PUBLICATION_HOST, first },
  );
  return data.publication.posts.edges.map(e => e.node);
}

/* ── Fetch single post ────────────────────────────────────────────── */
export async function fetchPost(slug) {
  const data = await gql(
    `query GetPost($host: String!, $slug: String!) {
       publication(host: $host) {
         post(slug: $slug) {
           id title brief slug publishedAt
           coverImage { url }
           tags { name }
           readTimeInMinutes
           content { html }
           author { name profilePicture }
         }
       }
     }`,
    { host: PUBLICATION_HOST, slug },
  );
  return data.publication.post;
}

/* ── Shape normaliser ─────────────────────────────────────────────── */
export function normaliseHashnodePost(node) {
  return {
    id:       node.id,
    slug:     node.slug,
    title:    node.title,
    excerpt:  node.brief || '',
    category: node.tags?.[0]?.name || 'General',
    readTime: node.readTimeInMinutes ? `${node.readTimeInMinutes} min read` : '5 min read',
    date:     new Date(node.publishedAt).toLocaleDateString('en-KE', {
                year: 'numeric', month: 'short', day: 'numeric',
              }),
    img:      node.coverImage?.url ||
              'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1000&q=80',
    tags:     node.tags?.map(t => t.name) || [],
    featured: false,
    content:  node.content?.html || null,
    author:   { name: "Paul Nyang'wara", role: 'Founder & CEO, NeuroSpark Corporation', avatar: '/paul-headshot.jpg' },
  };
}
