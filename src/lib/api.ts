const BASE_URL = process.env.NEXT_PUBLIC_BACK_END_URL || "https://flowerschamp-service-prod.up.railway.app";

async function get(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 3600 }, ...options });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

async function post(path: string, body: object) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to POST ${path}`);
  return res.json();
}

export async function fetchWebsiteMeta() {
  return get('/website-meta');
}

export async function fetchMenu() {
  return get('/menu');
}

export async function fetchCmsMenu() {
  return get('/cms-menu');
}

export async function fetchWebsiteCmsData() {
  return get('/website-cms-data');
}

export async function fetchReviews(page = 1, limit = 10) {
  return get(`/review?page=${page}&limit=${limit}`, { cache: 'no-store' });
}

export async function fetchAreas() {
  return get('/area');
}

export async function fetchFooterData() {
  return get('/cms-footer');
}

export async function fetchCmsPageData(seoUrl: string) {
  const data = await get('/cms-footer-page');
  const results: any[] = data?.results || [];
  return results.find((item: any) => item.seoUrl === seoUrl) || null;
}

export async function fetchFaqData() {
  return get('/cms-faq');
}

export async function fetchCategories() {
  return get('/category');
}

export async function fetchProducts(limit = 1000, city?: string) {
  const cityParam = city ? `&city=${encodeURIComponent(city)}` : '';
  return get(`/product?limit=${limit}${cityParam}`, { next: { revalidate: 300 } });
}

export async function fetchProduct(id: string) {
  return get(`/product/${id}`, { cache: 'no-store' });
}

export async function fetchProductDetailsMeta() {
  return get('/product-details-meta', { cache: 'no-store' });
}

export async function fetchAddonProducts() {
  return get('/addon-product', { cache: 'no-store' });
}

export async function fetchOrderByCode(orderNo: string, email: string) {
  return get(`/user-auth/orders/${orderNo}/${email}`, { cache: 'no-store' });
}

export async function loginVendor(email: string, password: string) {
  return post('/user-auth/vendor', { email, password });
}

export async function updateOrderStatus(email: string, code: string, status: string, receivedBy: string) {
  return post('/user-auth/update-order-status', { email, code, status, receivedBy });
}

export async function registerUser(data: any) {
  return post('/user-auth/register', data);
}

export async function fetchSearchProducts(value: string, page = 1, limit = 12) {
  const params = new URLSearchParams({ value, page: page.toString(), limit: limit.toString() }).toString();
  return get(`/product/adv-search?${params}`, { cache: 'no-store' });
}

// --- Authenticated APIs ---

async function getAuth(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options?.headers,
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch auth ${path}`);
  return res.json();
}

export async function fetchUserOrders(token: string) {
  return getAuth('/user-auth/orders', token);
}

export async function fetchUserProfile(token: string) {
  return getAuth('/user-auth/profile', token); // Just guessing the endpoint based on common patterns, actually let's just return what session gives us first
}

