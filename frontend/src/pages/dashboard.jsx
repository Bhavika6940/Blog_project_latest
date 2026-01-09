import Navbar from "../components/navbar";

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: "#1e293b", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <Navbar />

      <div className="container-fluid px-5 py-5">

        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="fw-bold text-white display-4 mb-2" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>
            Dashboard
          </h1>
          <p className="fw-semibold text-light fs-5" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "justify" }}>
            Welcome to <span className="fw-bold text-warning">BLOGIFY</span>! Your centralized hub for managing content, users, roles, and permissions efficiently.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#334155",
            marginBottom: "50px",
            borderRadius: "2px"
          }}
        />

        {/* Main Content */}
        <div className="col-xxl-9 mx-auto">

          <div className="card bg-slate-700 shadow-lg p-4 mb-5 rounded-4" style={{ backgroundColor: "#334155" }}>
            <h3 className="fw-bold text-white mb-4">About Blogify</h3>
            <p className="fw-semibold text-white fs-6 lh-lg" style={{ textAlign: "justify" }}>
              <span className="fw-bold text-warning">Blogify</span> is a modern, scalable, and secure
              content management system designed for professional blogging platforms
              and enterprise-level applications.
            </p>

            <p className="fw-semibold text-white fs-6 lh-lg" style={{ textAlign: "justify" }}>
              The platform enables organizations to efficiently manage
              <span className="fw-bold text-info"> blog content</span>,
              <span className="fw-bold text-info"> categories</span>,
              <span className="fw-bold text-info"> users</span>,
              <span className="fw-bold text-info"> roles</span>, and
              <span className="fw-bold text-info"> permissions</span> from a centralized
              administrative interface.
            </p>

            <p className="fw-semibold text-white fs-6 lh-lg" style={{ textAlign: "justify" }}>
              Blogify is built with a focus on
              <span className="fw-bold text-success"> performance</span>,
              <span className="fw-bold text-success"> scalability</span>, and
              <span className="fw-bold text-success"> security</span>, ensuring reliable content
              delivery and strict access control across the system.
            </p>

            <p className="fw-semibold text-white fs-6 lh-lg mb-4" style={{ textAlign: "justify" }}>
              This dashboard serves as the operational hub for managing platform
              configurations, monitoring system activity, and maintaining content
              quality as the platform continues to evolve.
            </p>
          </div>

          {/* Platform Capabilities */}
          <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#475569" }}>
            <h4 className="fw-bold text-white mt-2 mb-3" style={{ borderBottom: "2px solid #facc15", display: "inline-block", paddingBottom: "4px" }}>
              Platform Capabilities
            </h4>

            <ul className="text-white fw-semibold fs-6 lh-lg ps-3">
              <li className="mb-2">Centralized user and role management</li>
              <li className="mb-2">Structured content categorization</li>
              <li className="mb-2">Secure permission-based access control</li>
              <li className="mb-2">Scalable architecture for growing platforms</li>
              <li className="mb-2">Optimized workflows for content teams</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
