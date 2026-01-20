import React from "react";

const AboutPage = () => {
  return (
    <div className="text-white" style={{ width: "100%" }}>
      
      <section className="py-5 text-center border-bottom border-secondary">
        <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: "-2px" }}>
          The Future of <span style={{ color: "#22c55e" }}>Digital Journalism</span>.
        </h1>
        <p className="lead opacity-75 mx-auto" style={{ maxWidth: "900px", fontSize: "1.25rem" }}>
          Blogify is not just a platform; it is a movement. We bridge the gap between 
          the fast-paced digital world and the timeless value of deep, contemplative reading.
        </p>
      </section>

      
      <section className="row g-0 align-items-center border-bottom border-secondary">
        <div className="col-lg-6 p-5">
          <h2 className="fw-bold mb-4">Our Evolution</h2>
          <p className="opacity-75 lh-lg">
            Founded in 2024, Blogify began with a simple question: <em>Where has the depth gone?</em> 
            In an era of clickbait and 15-second trends, we chose to go the other way. We built a 
            haven for writers who demand more and readers who seek truth.
          </p>
          <p className="opacity-75 lh-lg">
            Today, we host thousands of articles spanning from quantum physics to modern 
            sociology, all unified by a single standard of excellence.
          </p>
        </div>
        <div className="col-lg-6 p-5 bg-dark" style={{ backgroundColor: "#161e2b !important" }}>
          <div className="d-flex flex-column gap-4">
            <div className="border-start border-info border-4 ps-4">
              <h4 className="fw-bold text-info">500k+</h4>
              <p className="small mb-0 opacity-50">Monthly Active Readers</p>
            </div>
            <div className="border-start border-success border-4 ps-4">
              <h4 className="fw-bold text-success">1.2k+</h4>
              <p className="small mb-0 opacity-50">Expert Contributors</p>
            </div>
            <div className="border-start border-primary border-4 ps-4">
              <h4 className="fw-bold text-primary">15+</h4>
              <p className="small mb-0 opacity-50">Content Categories</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5 px-5">
        <div className="mb-5 text-start">
          <h3 className="text-info fw-bold text-uppercase small" style={{ letterSpacing: "3px" }}>The Foundation</h3>
          <h2 className="fw-bold h1">What We Stand For</h2>
        </div>
        
        <div className="row g-4">
          {[
            { title: "Intellectual Rigor", desc: "We favor evidence-based claims over opinions. Every piece is vetted for logical consistency." },
            { title: "Zero Noise", desc: "No distracting ads. No autoplay videos. Just you and the words on the screen." },
            { title: "Global Perspective", desc: "Our writers come from every continent, bringing a truly diverse world view to every topic." },
            { title: "Sustainable Tech", desc: "Our platform is optimized for speed and low energy consumption, ensuring a green digital footprint." }
          ].map((item, idx) => (
            <div key={idx} className="col-md-6 col-xl-3">
              <div className="p-4 h-100" style={{ backgroundColor: "#334155", borderRadius: "0px", borderTop: "4px solid #39ff14" }}>
                <h5 className="fw-bold mb-3">{item.title}</h5>
                <p className="small opacity-75 mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-5 border-top border-bottom border-secondary" style={{ backgroundColor: "#1e293b" }}>
        <div className="container-fluid px-5">
          <div className="row align-items-center">
            <div className="col-md-5">
              <h2 className="fw-bold display-6 mb-4">Curated by Humans, <br/> Not Algorithms.</h2>
            </div>
            <div className="col-md-7">
              <p className="fs-5 opacity-75">
                Unlike social media, Blogify doesn't show you what it "thinks" you want to see. 
                Our editorial board manually selects featured stories based on merit, impact, 
                and literary quality. We prioritize discovery over echo chambers.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5 text-center bg-black">
        <div className="py-5">
          <h2 className="fw-bold h1 mb-4">Be Part of the Story</h2>
          <p className="opacity-50 mb-5">Join our newsletter for weekly deep dives delivered to your inbox.</p>
          <div className="d-flex justify-content-center gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="form-control w-25 bg-transparent text-white border-secondary"
            />
            <button 
              className="btn px-4 fw-bold" 
              style={{ backgroundColor: "#39ff14", color: "#000" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;