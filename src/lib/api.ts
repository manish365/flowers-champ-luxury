const BASE_URL = 'https://flowerschamp-service-prod.up.railway.app';

export async function fetchWebsiteMeta() {
  const res = await fetch(`${BASE_URL}/website-meta`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch website-meta');
  return res.json();
}

export async function fetchMenu() {
  const res = await fetch(`${BASE_URL}/menu`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}

export async function fetchCmsMenu() {
  const res = await fetch(`${BASE_URL}/cms-menu`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch cms-menu');
  return res.json();
}

export async function fetchWebsiteCmsData() {
  const res = await fetch(`${BASE_URL}/website-cms-data`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch website-cms-data');
  return res.json();
}

export async function fetchReviews(page = 1, limit = 10) {
  const res = await fetch(`${BASE_URL}/review?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}
