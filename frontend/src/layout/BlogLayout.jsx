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

      {/* Main Content Area - Absolute Zero Padding */}
      <main 
        style={{ 
          flex: 1,
          padding: 0, // Removes top/bottom and side padding
          margin: 0   // Ensures no default browser margins interfere
        }}
      >
        <div 
          style={{ 
            width: "100%", // Takes up the full width of the screen
            margin: 0      // Removes the centering effect
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;