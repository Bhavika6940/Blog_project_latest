import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AuthorSidebar from "../components/Sidebar/AuthorSidebar";

const Layout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roleId = user?.roleId;

  const renderSidebar = () => {
    if (roleId === 1 || roleId === 2) {
      return <AdminSidebar />;
    }

    if (roleId === 3) {
      return <AuthorSidebar />;
    }

    return null; // or a default sidebar
  };

  return (
    <div style={{ display: "flex" }}>
      {renderSidebar()}

      <div
        style={{
          flexGrow: 1,
          marginLeft: "260px",
          minHeight: "100vh",
          backgroundColor: "#1e293b",
          padding: "30px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
