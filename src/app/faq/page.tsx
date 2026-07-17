"use client";

export default function FAQPage() {
  return (
    <section style={{ backgroundColor: 'white', padding: '6rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Can I customize a floral arrangement?</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.9375rem' }}>Yes! We offer bespoke floral designs. Please contact our boutique directly or visit our Contact Us page to discuss your specific requirements with one of our master florists.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>How do I track my order?</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.9375rem' }}>You can track your order status by logging into your account and navigating to the Dashboard, where you can enter your Order ID. Alternatively, check your confirmation email for a tracking link.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Do you offer same-day delivery?</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.9375rem' }}>We offer same-day delivery for orders placed before 2:00 PM local time. Please check availability at checkout based on your delivery address.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>What if the recipient is not home?</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.9375rem' }}>If the recipient is not home, our courier will attempt to leave the flowers in a safe location or with a neighbor. We will also try to contact the recipient using the phone number provided at checkout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
