import { fetchCmsPageData } from '@/lib/api';

interface CmsPageProps {
  title: string;
  seoUrl: string;
}

export default async function CmsPage({ title, seoUrl }: CmsPageProps) {
  let cmsData: any = null;
  try {
    cmsData = await fetchCmsPageData(seoUrl).catch(() => null);
  } catch {}

  return (
    <section style={{ backgroundColor: 'white', padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '1.25rem', textAlign: 'center' }}>
          {cmsData?.ogTag || title}
        </h1>
        {cmsData?.content ? (
          <div
            style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.9375rem' }}
            dangerouslySetInnerHTML={{ __html: cmsData.content }}
          />
        ) : (
          <p style={{ color: '#4b5563', textAlign: 'center' }}>Content coming soon.</p>
        )}
      </div>
    </section>
  );
}
