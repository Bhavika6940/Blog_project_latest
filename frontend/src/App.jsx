import Roles from "./pages/roles";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Permissions from "./pages/permission";
import Users from "./pages/user";
import  Category  from "./pages/category";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreatePost from "./components/createPostPage";
import  Post from "./pages/posts";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/blog" element = {<Post />} />
        <Route path = "/createBlog" element= {<CreatePost />} />
        <Route path = "/" element= {<Login />} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path="/role" element={<Roles />} />
        <Route path="/user" element={<Users />} />
        <Route path="/roles/:roleId/permissions" element={<Permissions />} />
        <Route path = "/category" element = {<Category />} />
      </Routes>
  
    
    </ BrowserRouter>
    

  );
  
}

export default App;
