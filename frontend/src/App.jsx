import Roles from "./components/Role/Layout/RoleLayout";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Permissions from "./components/Permission/Layout/PermissionLayout";
import Users from "./components/User/Layout/UserLayout";
import  Category  from "./components/Category/Layout/CategoryLayout";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Layout/DashboardLayout";
import CreatePost from "./components/Post/Layout/CreatePostLayout";
import  Post from "./components/Post/Layout/PostLayout";
import PostDetails from "./components/Post/Layout/PostDetailLayout";

function App() {
  return(
    <BrowserRouter>
      <Routes>
         <Route path = "/postContent/:id/post" element = {<PostDetails />} />
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
