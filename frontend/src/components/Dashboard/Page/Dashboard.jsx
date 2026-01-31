const Dashboard = () => {
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    fontFamily: "Poppins, sans-serif",
  };

  const cardStyle = {
    background: "rgba(51, 65, 85, 0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    padding: "2.2rem",
  };

  return (
    <div style={pageStyle}>
      <div className="container-fluid px-5 py-5">

        <div className="text-center mb-5">
          <h1
            className="fw-bold display-4 mb-3"
            style={{
              color: "#ffffff",
              letterSpacing: "0.5px",
            }}
          >
             Dashboard
          </h1>

          <p
            className="fs-5 fw-semibold mx-auto"
            style={{
              color: "#cbd5f5",
              maxWidth: "760px",
              lineHeight: "1.8",
            }}
          >
            Welcome to{" "}
            <span style={{ color: "#facc15", fontWeight: "700" }}>
              BLOGIFY
            </span>{" "}
            — a centralized platform designed to manage content, users,
            permissions, and system workflows with precision and control.
          </p>
        </div>

        
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #facc15, transparent)",
            marginBottom: "4rem",
          }}
        />

        <div className="col-xxl-9 mx-auto">

          
          <div style={{ ...cardStyle, marginBottom: "3rem" }}>
            <h3
              className="fw-bold mb-3"
              style={{ color: "#facc15" }}
            >
              About 
            </h3>

            <p
              style={{
                color: "#e5e7eb",
                fontWeight: "500",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              Blogify is a modern, scalable, and secure content management
              platform engineered for professional blogging ecosystems and
              enterprise-grade applications.
            </p>

            <p
              style={{
                color: "#e5e7eb",
                fontWeight: "500",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              It enables seamless management of
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}blog posts
              </span>
              ,
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}categories
              </span>
              ,
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}users
              </span>
              ,
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}roles
              </span>
              , and
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}permissions
              </span>{" "}
              from a unified administrative interface.
            </p>

            <p
              style={{
                color: "#e5e7eb",
                fontWeight: "500",
                lineHeight: "1.9",
                textAlign: "justify",
                marginBottom: 0,
              }}
            >
              Designed with a strong emphasis on
              <span style={{ color: "#22c55e", fontWeight: "700" }}>
                {" "}performance
              </span>
              ,
              <span style={{ color: "#22c55e", fontWeight: "700" }}>
                {" "}scalability
              </span>
              , and
              <span style={{ color: "#22c55e", fontWeight: "700" }}>
                {" "}security
              </span>
              , Blogify ensures reliable content delivery and strict access
              control as your platform evolves.
            </p>
          </div>

          <div style={cardStyle}>
            <h4
              className="fw-bold mb-4"
              style={{
                color: "#ffffff",
                borderLeft: "4px solid #facc15",
                paddingLeft: "0.75rem",
              }}
            >
              Platform Capabilities
            </h4>

            <ul
              style={{
                color: "#e5e7eb",
                fontWeight: "500",
                lineHeight: "2",
                paddingLeft: "1.2rem",
                marginBottom: 0,
              }}
            >
              <li>Centralized user & role management</li>
              <li>Structured and categorized content workflows</li>
              <li>Permission-based secure access control</li>
              <li>Scalable architecture for enterprise growth</li>
              <li>Optimized admin experience for content teams</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
