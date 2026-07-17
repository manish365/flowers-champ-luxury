export default function AddressesPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', fontFamily: 'var(--font-serif)' }}>Address Book</h1>
        <button style={{ backgroundColor: 'var(--color-olive)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Add New Address</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>Home <span style={{ fontSize: '0.625rem', backgroundColor: '#e5e7eb', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', marginLeft: '0.5rem' }}>Default</span></h4>
          <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '1rem' }}>
            John Doe<br/>
            Jl. Sudirman No. 1, Jakarta 12190<br/>
            Indonesia<br/>
            Mobile: +62 812 3456 7890
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 500 }}>
            <button style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Edit</button>
            <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
