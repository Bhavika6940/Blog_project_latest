const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Page Container */}
      <div className="container-fluid px-5 py-5">

        {/* Header */}
        <div className="mb-5 text-center">
          <h1
            className="fw-bold display-4 mb-2"
            style={{
              color: "#ffffff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Dashboard
          </h1>

          <p
            className="fw-semibold fs-5"
            style={{
              color: "#e5e7eb",
              maxWidth: "720px",
              margin: "0 auto",
              textAlign: "justify",
            }}
          >
            Welcome to{" "}
            <span style={{ color: "#facc15", fontWeight: "700" }}>
              BLOGIFY
            </span>
            ! Your centralized hub for managing content, users, roles, and
            permissions efficiently.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#334155",
            marginBottom: "3.5rem",
            borderRadius: "2px",
          }}
        />

        {/* Main Content */}
        <div className="col-xxl-9 mx-auto">

          {/* About Card */}
          <div
            style={{
              backgroundColor: "#334155",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              padding: "2rem",
              marginBottom: "3rem",
            }}
          >
            <h3
              style={{
                color: "#facc15",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              About
            </h3>

            <p
              style={{
                color: "#ffffff",
                fontWeight: "600",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              This is a modern, scalable, and secure content management system
              designed for professional blogging platforms and enterprise-level
              applications.
            </p>

            <p
              style={{
                color: "#ffffff",
                fontWeight: "600",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              The platform enables organizations to efficiently manage
              <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                {" "}blog content
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
              from a centralized administrative interface.
            </p>

            <p
              style={{
                color: "#ffffff",
                fontWeight: "600",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              Blogify is built with a focus on
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
              , ensuring reliable content delivery and strict access control.
            </p>

            <p
              style={{
                color: "#ffffff",
                fontWeight: "600",
                lineHeight: "1.9",
                textAlign: "justify",
                marginBottom: "0",
              }}
            >
              This dashboard serves as the operational hub for managing platform
              configurations, monitoring system activity, and maintaining content
              quality as the platform evolves.
            </p>
          </div>

          {/* Platform Capabilities */}
          <div
            style={{
              backgroundColor: "#475569",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              padding: "2rem",
            }}
          >
            <h4
              style={{
                color: "#ffffff",
                fontWeight: "700",
                borderBottom: "2px solid #facc15",
                display: "inline-block",
                paddingBottom: "4px",
                marginBottom: "1.5rem",
              }}
            >
              Platform Capabilities
            </h4>

            <ul
              style={{
                color: "#ffffff",
                fontWeight: "600",
                lineHeight: "1.9",
                paddingLeft: "1.2rem",
                marginBottom: "0",
              }}
            >
              <li>Centralized user and role management</li>
              <li>Structured content categorization</li>
              <li>Secure permission-based access control</li>
              <li>Scalable architecture for growing platforms</li>
              <li>Optimized workflows for content teams</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
