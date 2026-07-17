"use client";

export default function TermAndConditionsPage() {
  return (
    <section style={{ backgroundColor: 'white', padding: '6rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '2rem', textAlign: 'center' }}>Terms & Conditions</h1>
        
        <div style={{ color: '#4b5563', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9375rem' }}>
          <p>Welcome to Flowers Champ. These terms and conditions outline the rules and regulations for the use of Flowers Champ's Website, located at flowerschamp.com.</p>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>1. Delivery Policy</h3>
            <p>We strive to deliver all floral arrangements within the requested timeframes. However, delivery times are estimates and cannot be guaranteed. In the event of extreme weather or unforeseen circumstances, deliveries may be delayed.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>2. Product Substitutions</h3>
            <p>Due to the seasonal nature of flowers, we may need to substitute specific blooms or vases with items of equal or greater value to ensure your arrangement is delivered on time and meets our quality standards.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>3. Cancellation & Refunds</h3>
            <p>Orders can be cancelled or modified up to 24 hours before the scheduled delivery date. Once an order is out for delivery or has been delivered, it cannot be cancelled or refunded.</p>
          </div>

          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Flowers Champ if you do not agree to take all of the terms and conditions stated on this page.</p>
        </div>
      </div>
    </section>
  );
}
