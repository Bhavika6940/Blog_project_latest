import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AuthorSidebar from "../components/Sidebar/AuthorSidebar";

const SIDEBAR_WIDTH = 260;

const Layout = ({ children }) => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const roleId = user?.roleId;

  const sidebarMap = {
    admin: [1, 2],
    author: [3],
  };

  const renderSidebar = () => {
    if (sidebarMap.admin.includes(roleId)) {
      return <AdminSidebar />;
    }

    if (sidebarMap.author.includes(roleId)) {
      return <AuthorSidebar />;
    }

    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
      }}
    >
      {renderSidebar()}
      <main
        style={{
          flexGrow: 1,
          marginLeft: SIDEBAR_WIDTH,
          padding: "2rem",
          fontFamily: "Poppins, sans-serif",
          color: "#e5e7eb",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
