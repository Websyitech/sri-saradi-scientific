import PagesList from '../components/PagesList';

export default function PagesListPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #2D2B7F 0%, #4f46e5 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: 800, 
          margin: '0 0 16px 0' 
        }}>
          Information Pages
        </h1>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9, 
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Explore our comprehensive collection of pages with detailed information about our services, policies, and company.
        </p>
      </div>
      
      <PagesList />
    </div>
  );
}