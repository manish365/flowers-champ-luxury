import { fetchFaqData } from '@/lib/api';

export default async function FAQPage() {
  let faq: any[] = [];
  try {
    const data = await fetchFaqData().catch(() => null);
    faq = data?.results || [];
  } catch {}

  return (
    <section style={{ backgroundColor: 'white', padding: '6rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '2rem', textAlign: 'center' }}>
          Frequently Asked Questions
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {faq.length > 0 ? (
            faq.map((f: any) => (
              <div key={f._id}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                  {f.question}
                </h3>
                <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.9375rem' }}>{f.answer}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#4b5563', textAlign: 'center' }}>No FAQs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
