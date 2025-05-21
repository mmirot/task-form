import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  // Check if Clerk key is available
  const clerkKeyAvailable = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // Function to show a toast message about missing Clerk key
  const showClerkKeyMessage = () => {
    toast.error(
      "Authentication is not set up. Please add a Clerk Publishable Key to use protected features.",
      { duration: 6000, id: 'home-clerk-key-missing' }
    );
  };

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>Silicon Valley Pathology Laboratory</h1>
          <p className="tagline">Providing excellence in pathology diagnostics since 1995</p>
          
          {clerkKeyAvailable ? (
            // Normal authentication flow
            !user ? (
              <Link to="/auth" className="cta-button">
                Sign In To Access Tools
              </Link>
            ) : (
              <Link to="/daily-qc" className="cta-button">
                Access Daily QC Tool
              </Link>
            )
          ) : (
            // No Clerk key available
            <button 
              onClick={showClerkKeyMessage} 
              className="cta-button"
              style={{ backgroundColor: '#f56565', cursor: 'not-allowed' }}
            >
              Authentication Not Available
            </button>
          )}
        </div>
      </header>

      <section className="services">
        <h2>Our Lab Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔬</div>
            <h3>Histology</h3>
            <p>Comprehensive tissue processing and staining services.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🧪</div>
            <h3>Immunohistochemistry</h3>
            <p>Advanced staining techniques for accurate diagnoses.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🧬</div>
            <h3>Molecular Pathology</h3>
            <p>Cutting-edge genetic testing and analysis.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📋</div>
            <h3>Quality Control</h3>
            <p>Rigorous daily quality checks on all staining procedures.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Our Laboratory</h2>
        <p>
          Silicon Valley Pathology Laboratory is committed to delivering accurate and timely pathology services
          to healthcare providers throughout the region. Our team of experienced pathologists and technicians
          utilizes state-of-the-art equipment and techniques to ensure the highest quality results.
        </p>
        <p>
          Our laboratory maintains strict quality control protocols, including daily stain quality checks,
          to guarantee reliable and consistent results for our clients.
        </p>
      </section>

      {user && (
        <section className="tools">
          <h2>Laboratory Tools</h2>
          <div className="tools-grid">
            <Link to="/daily-qc" className="tool-card">
              <h3>Daily Stain QC</h3>
              <p>Submit and track daily quality control for laboratory stains.</p>
            </Link>
            <Link to="/stains" className="tool-card">
              <h3>Stain Library</h3>
              <p>View the complete catalog of available stains.</p>
            </Link>
          </div>
        </section>
      )}
      
      {!clerkKeyAvailable && (
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-6">
          <p className="font-bold">Authentication Not Available</p>
          <p>To enable authentication features, please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
