"use client";

export default function PrivacyPolicyPage() {
  return (
    <section style={{ backgroundColor: 'white', padding: '6rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '2rem', textAlign: 'center' }}>Privacy Policy</h1>
        
        <div style={{ color: '#4b5563', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9375rem' }}>
          <p>At Flowers Champ, accessible from flowerschamp.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Flowers Champ and how we use it.</p>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Information We Collect</h3>
            <p>We collect personal information that you provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, or when you contact us. This includes names, phone numbers, email addresses, mailing addresses, billing addresses, and payment information.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Process your orders and manage your account</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Data Security</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
