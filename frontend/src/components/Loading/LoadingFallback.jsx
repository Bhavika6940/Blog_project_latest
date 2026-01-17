const LoadingFallback = () => {
  return (
    <div 
      style={{
        backgroundColor: "#0f172a", 
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      
      <img 
        src="/image/Loading.gif" 
        alt="Loading..." 
        style={{ width: "120px", height: "auto", marginBottom: "20px" }}
        onError={(e) => {
           console.error("GIF not found at /image/Loading.gif");
           e.target.style.display = 'none'; 
        }}
      />
      
      
      <h5 className="text-white fw-bold" style={{ letterSpacing: "2px" }}>
        <span className="text-success">BLOGIFY</span>
      </h5>
      
      <div className="mt-2 text-secondary small px-3 text-center">
        Preparing your creative workspace...
      </div>
    </div>
  );
};

export default LoadingFallback;