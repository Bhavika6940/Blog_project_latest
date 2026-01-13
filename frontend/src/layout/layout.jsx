import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar /> 
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
