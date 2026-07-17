export default function OrdersPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Order History</h1>
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>You have 1 previous order.</p>
      
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: 'var(--color-dark)' }}>#FC-98765</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>May 15, 2026</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.625rem', fontWeight: 'bold', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Delivered</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-dark)' }}>Rp 850.000</div>
          <button style={{ backgroundColor: 'white', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.5rem', cursor: 'pointer' }}>View Details</button>
        </div>
      </div>
    </div>
  );
}
