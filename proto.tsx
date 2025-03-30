import React, { useState, useEffect } from 'react';

const NorthernSparkWebsite = () => {
  const [activeCategory, setActiveCategory] = useState('senior');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop view

  // Track window size for responsive layout
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Image data for each category
  const images = {
    senior: [
      { src: "/api/placeholder/600/900", alt: "Senior portrait with natural lighting in Nisswa, Minnesota park setting", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Senior graduation photos in Central Minnesota with lake backdrop", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "High school senior portrait with urban backdrop in downtown Nisswa", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Senior portrait in natural park setting", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Dramatic lighting senior portrait", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Senior portrait at sunset", orientation: "landscape" }
    ],
    family: [
      { src: "/api/placeholder/900/600", alt: "Family portrait outdoors with young children at Gull Lake in Nisswa, Minnesota", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Family portrait in Northern Spark Photography Nisswa studio with natural lighting", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Extended family gathering", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Parents with newborn baby", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Family with teenagers in outdoor setting", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Family portrait at Minnesota lake", orientation: "portrait" }
    ],
    fashion: [
      { src: "/api/placeholder/600/900", alt: "High fashion editorial portrait", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Fashion model in urban setting", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Studio fashion portrait with dramatic lighting", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Fashion editorial with multiple models", orientation: "landscape" },
      { src: "/api/placeholder/600/900", alt: "Black and white fashion portrait", orientation: "portrait" },
      { src: "/api/placeholder/900/600", alt: "Fashion model in natural setting", orientation: "landscape" }
    ]
  };

  // Handle navigation clicks
  const handleNavClick = (category) => {
    setActiveCategory(category);
  };

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle image click to open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    if (currentImageIndex < images[activeCategory].length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  // Handle keyboard navigation and handle ESC for menu close
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      } else if (menuOpen && e.key === 'Escape') {
        // Close menu when ESC is pressed and menu is open
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, menuOpen, currentImageIndex, activeCategory]); // Dependencies that should trigger a re-binding

  // Determine number of columns based on screen width
  const getGridStyle = () => {
    // Explicit grid layout based on window width
    if (windowWidth < 640) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      };
    } else if (windowWidth < 1024) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem'
      };
    }
  };

  // Render the About content
  const renderAbout = () => (
    <div className="bg-white p-8 rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-light mb-4">About Northern Spark Photography</h1>
          <h2 className="text-2xl font-light mb-4">Nisswa's Premier Senior & Family Photography Studio</h2>
          <p className="mb-4">Northern Spark Photography specializes in capturing authentic moments with a unique artistic vision. Based in Nisswa, Minnesota, we offer professional photography services for seniors, families, events, and fashion throughout Minnesota.</p>
          <p className="mb-4">Our approach combines natural light, creative composition, and genuine connection to create images that tell your story in a way that's both timeless and contemporary.</p>
          <p className="mb-4">With over 10 years of experience, our team is dedicated to providing an exceptional photography experience from first consultation to final delivery.</p>
        </div>
        <div className="bg-gray-100 relative h-full min-h-64">
          <img src="/api/placeholder/600/750" alt="Professional photographer from Northern Spark Photography in Nisswa, Minnesota" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-light mb-4">Why Choose Northern Spark Photography?</h3>
        <ul className="list-disc pl-8 mb-6">
          <li>Personalized sessions tailored to your unique vision</li>
          <li>Professional editing and retouching</li>
          <li>Fast turnaround times</li>
          <li>Beautiful, customized products</li>
          <li>Based in Nisswa but available for travel throughout Minnesota</li>
        </ul>
        <p>Ready to book your session? <button onClick={() => handleNavClick('contact')} className="underline">Contact us today</button> to get started!</p>
      </div>
    </div>
  );

  // Render Pricing content
  const renderPricing = () => (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Investment & Packages</h1>
      <h2 className="text-2xl font-light mb-4">Quality Photography for Every Budget</h2>
      <p className="mb-8">At Northern Spark Photography, we believe in transparent pricing and customizable packages that meet your specific needs. All sessions include professional editing, online gallery, and print release.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Senior Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Senior Portraits</h3>
          <p className="text-3xl text-center font-light mb-4">$495</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>2-hour custom session</li>
            <li>Up to 3 locations</li>
            <li>4 outfit changes</li>
            <li>40+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
        
        {/* Family Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Family Session</h3>
          <p className="text-3xl text-center font-light mb-4">$395</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>1-hour session</li>
            <li>1 location</li>
            <li>2 outfit changes</li>
            <li>25+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
        
        {/* Fashion Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Fashion Portfolio</h3>
          <p className="text-3xl text-center font-light mb-4">$695</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>3-hour creative session</li>
            <li>Multiple locations</li>
            <li>Unlimited outfit changes</li>
            <li>50+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Advanced retouching</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 border-l-4 border-gray-800 mt-8">
        <h3 className="text-xl font-light mb-4">Additional Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ul className="list-disc pl-6">
            <li>Extra hour: $150</li>
            <li>Additional location: $75</li>
            <li>Hair & makeup: $150</li>
            <li>Premium album: $295</li>
          </ul>
          <ul className="list-disc pl-6">
            <li>Wall art collections: Starting at $250</li>
            <li>Mini sessions: $250 (seasonal availability)</li>
            <li>Extended family: $75 additional</li>
            <li>Rush editing (48hr): $100</li>
          </ul>
        </div>
        <p>All packages can be customized to fit your specific needs. <button onClick={() => handleNavClick('contact')} className="underline">Contact us</button> for a personalized quote.</p>
      </div>
    </div>
  );

  // Render Contact content
  const renderContact = () => (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Contact Northern Spark Photography</h1>
      <h2 className="text-2xl font-light mb-4">Book Your Professional Photography Session in Nisswa, Minnesota</h2>
      <p className="mb-6">We'd love to hear from you! Get in touch to book a session or learn more about our professional photography services in Nisswa, Brainerd, Baxter and throughout Central Minnesota. We specialize in senior portraits, family photography, and fashion shoots that capture your authentic moments with our unique artistic vision.</p>
      
      <div className="mb-6">
        <p><strong>Email:</strong> info@northernsparkphoto.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Studio:</strong> 123 Main Street, Nisswa, MN 56468</p>
        <p><strong>Hours:</strong> Monday-Friday 9am-5pm | Weekends by appointment</p>
      </div>
      
      <h3 className="text-xl font-light mb-4">Our Photography Services</h3>
      <ul className="list-disc pl-8 mb-6">
        <li>Senior Portraits</li>
        <li>Family Photography</li>
        <li>Fashion Photography</li>
        <li>Wedding Photography</li>
        <li>Event Photography</li>
      </ul>
      
      <form className="grid gap-4 max-w-md">
        <input type="text" placeholder="Your Name" className="p-3 border border-gray-300" required />
        <input type="email" placeholder="Your Email" className="p-3 border border-gray-300" required />
        <input type="tel" placeholder="Your Phone" className="p-3 border border-gray-300" />
        <select className="p-3 border border-gray-300" required>
          <option value="">Select Service</option>
          <option value="senior">Senior Portraits</option>
          <option value="family">Family Photography</option>
          <option value="fashion">Fashion Photography</option>
          <option value="wedding">Wedding Photography</option>
          <option value="event">Event Photography</option>
        </select>
        <textarea placeholder="Your Message" rows="5" className="p-3 border border-gray-300" required></textarea>
        <button type="submit" className="p-3 bg-gray-800 text-white cursor-pointer">Send Message</button>
      </form>
    </div>
  );

  // Render gallery content based on active category
  const renderContent = () => {
    if (activeCategory === 'about') return renderAbout();
    if (activeCategory === 'pricing') return renderPricing();
    if (activeCategory === 'contact') return renderContact();

    // Otherwise render the gallery with explicit inline styles
    return (
      <div style={getGridStyle()}>
        {images[activeCategory].map((image, index) => (
          <div 
            key={index} 
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
              margin: 0,
              padding: 0,
              gridRow: image.orientation === 'portrait' ? 'span 2' : 'span 1'
            }}
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    );
  };

  // Render lightbox with full bleed design
  const renderLightbox = () => {
    if (!lightboxOpen) return null;
    
    const currentImage = images[activeCategory][currentImageIndex];
    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === images[activeCategory].length - 1;
    
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <button 
          className="absolute top-5 right-5 text-black text-2xl bg-transparent border-none cursor-pointer z-50 opacity-60 hover:opacity-100"
          onClick={closeLightbox}
        >
          ×
        </button>
        
        <div className="absolute top-5 left-5 text-black text-sm opacity-60">
          {currentImageIndex + 1} / {images[activeCategory].length}
        </div>
        
        <div className="flex items-center justify-center h-screen w-full">
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
        
        <div className="absolute bottom-5 w-full text-center text-black text-sm opacity-70">
          {currentImage.alt}
        </div>
        
        {!isFirstImage && (
          <button 
            className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100"
            onClick={prevImage}
          >
            ←
          </button>
        )}
        
        {!isLastImage && (
          <button 
            className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100"
            onClick={nextImage}
          >
            →
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto p-8 flex-grow relative">
        {/* Hamburger Menu Button */}
        <div className="absolute top-8 right-8 z-20">
          <button 
            onClick={toggleMenu} 
            className="flex flex-col justify-center items-center w-12 h-12 bg-white rounded-full shadow-sm hover:shadow transition-all duration-300 border-none cursor-pointer p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-800 my-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
        
        {/* Hamburger Menu Dropdown - with responsive width and spacing */}
        <div 
          className={`fixed top-0 right-0 h-screen bg-white shadow-lg z-10 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ 
            width: windowWidth < 640 ? '240px' : windowWidth < 1024 ? '300px' : '360px'
          }}
        >
          <div style={{ 
            padding: windowWidth < 640 ? '28px 16px' : windowWidth < 1024 ? '32px 24px' : '40px 32px',
            paddingTop: windowWidth < 640 ? '100px' : windowWidth < 1024 ? '120px' : '140px'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: windowWidth < 640 ? '30px' : windowWidth < 1024 ? '36px' : '48px'
            }}>
              <button 
                onClick={() => {
                  handleNavClick('about');
                  toggleMenu();
                }} 
                style={{
                  textAlign: 'left',
                  padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: activeCategory === 'about' ? 400 : 300,
                  color: activeCategory === 'about' ? '#333' : '#777',
                  borderLeft: activeCategory === 'about' ? '2px solid #333' : 'none',
                  paddingLeft: activeCategory === 'about' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                About
              </button>
              <button 
                onClick={() => {
                  handleNavClick('pricing');
                  toggleMenu();
                }} 
                style={{
                  textAlign: 'left',
                  padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: activeCategory === 'pricing' ? 400 : 300,
                  color: activeCategory === 'pricing' ? '#333' : '#777',
                  borderLeft: activeCategory === 'pricing' ? '2px solid #333' : 'none',
                  paddingLeft: activeCategory === 'pricing' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  handleNavClick('contact');
                  toggleMenu();
                }} 
                style={{
                  textAlign: 'left',
                  padding: windowWidth < 640 ? '12px 16px' : windowWidth < 1024 ? '16px 24px' : '20px 32px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: windowWidth < 640 ? '12px' : windowWidth < 1024 ? '14px' : '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: activeCategory === 'contact' ? 400 : 300,
                  color: activeCategory === 'contact' ? '#333' : '#777',
                  borderLeft: activeCategory === 'contact' ? '2px solid #333' : 'none',
                  paddingLeft: activeCategory === 'contact' ? (windowWidth < 640 ? '14px' : windowWidth < 1024 ? '22px' : '30px') : undefined,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Contact
              </button>
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: windowWidth < 640 ? '40px' : windowWidth < 1024 ? '60px' : '80px',
              left: 0,
              right: 0,
              padding: windowWidth < 640 ? '0 16px' : windowWidth < 1024 ? '0 24px' : '0 32px',
            }}>
              <p style={{
                color: '#aaa',
                fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                fontWeight: 300,
                marginBottom: windowWidth < 640 ? '24px' : windowWidth < 1024 ? '28px' : '32px'
              }}>Premium photography services in Nisswa, MN</p>
              
              <div style={{
                display: 'flex',
                gap: windowWidth < 640 ? '16px' : windowWidth < 1024 ? '20px' : '24px'
              }}>
                <a 
                  href="#" 
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#aaa';
                  }}
                >
                  <span style={{
                    fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Instagram</span>
                </a>
                <a 
                  href="#" 
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#aaa';
                  }}
                >
                  <span style={{
                    fontSize: windowWidth < 640 ? '10px' : windowWidth < 1024 ? '11px' : '12px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <h1 style={{
          fontSize: windowWidth < 640 ? '1.75rem' : windowWidth < 1024 ? '2.5rem' : '3rem',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          transition: 'font-size 0.3s ease'
        }}>Northern Spark Photography</h1>
        <p style={{
          textAlign: 'center', 
          fontWeight: 300,
          marginBottom: '2.5rem',
          fontSize: windowWidth < 640 ? '0.75rem' : '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#777',
          transition: 'font-size 0.3s ease'
        }}>Premium Senior & Family Photography in Nisswa, Minnesota</p>
        
        <div className="flex justify-center mb-10">
          <div className="flex">
            <button 
              onClick={() => handleNavClick('senior')} 
              className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'senior' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
            >
              Senior Grads
            </button>
            <button 
              onClick={() => handleNavClick('family')} 
              className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'family' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
            >
              Families
            </button>
            <button 
              onClick={() => handleNavClick('fashion')} 
              className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'fashion' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
            >
              Fashion
            </button>
          </div>
        </div>
        
        {renderContent()}
        {renderLightbox()}
      </div>
      
      {/* Simple minimal footer */}
      <footer className="mt-12 py-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm font-light">© {new Date().getFullYear()} Northern Spark Photography. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <span className="text-sm font-light uppercase tracking-wide">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <span className="text-sm font-light uppercase tracking-wide">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <span className="text-sm font-light uppercase tracking-wide">Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NorthernSparkWebsite;
