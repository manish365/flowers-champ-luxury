"use client";

export default function AccountSettingsPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Account Settings</h1>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Update your personal information and password here.</p>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '32rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
          <input type="text" defaultValue="John Doe" style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.75rem 1rem', fontSize: '0.875rem', width: '100%' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
          <input type="email" defaultValue="john@example.com" style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.75rem 1rem', fontSize: '0.875rem', width: '100%' }} disabled />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-dark)', fontFamily: 'var(--font-serif)' }}>Change Password</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Password</label>
          <input type="password" style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.75rem 1rem', fontSize: '0.875rem', width: '100%' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Password</label>
          <input type="password" style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.75rem 1rem', fontSize: '0.875rem', width: '100%' }} />
        </div>

        <button type="button" style={{ backgroundColor: 'var(--color-olive)', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginTop: '1rem', width: 'fit-content' }}>Save Changes</button>
      </form>
    </div>
  );
}
