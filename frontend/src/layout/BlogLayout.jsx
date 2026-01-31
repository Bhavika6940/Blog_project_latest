import Navbar from "../components/Navbar/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div 
      style={{ 
        backgroundColor: "#1e293b", 
        minHeight: "100vh", 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0
      }}
    >
      <Navbar />

      
      <main 
        style={{ 
          flex: 1,
          padding: 0, 
          margin: 0   
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            margin: 0      
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;