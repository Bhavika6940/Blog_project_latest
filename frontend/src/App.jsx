
import {BrowserRouter , Routes, Route} from "react-router-dom";
import {lazy , Suspense} from "react";
import LoadingFallback from "./components/Loading/LoadingFallback";
const Permissions = lazy(() => import("./components/Permission/Layout/PermissionLayout"));
const Users = lazy(() => import("./components/User/Layout/UserLayout"));
const Category = lazy(() => import("./components/Category/Layout/CategoryLayout"));
const Login = lazy(() => import( "./components/Login/Login"));
const Dashboard = lazy(() => import( "./components/Dashboard/Layout/DashboardLayout"));
const CreatePost = lazy(() => import( "./components/AdminPosts/Layout/CreatePostLayout"));
const AdminPost = lazy(() => import( "./components/AdminPosts/Layout/AdminPostLayout"));
const Roles = lazy(() => import( "./components/Role/Layout/RoleLayout"));
const ProtectedRoute = lazy(() => import( "./routes/ProtectedRoute"));
const RoleGuard = lazy(() => import( "./routes/RoleGuard"));
const PageNotFound = lazy(() => import( "./components/PageNotFound/PageNotFound"));
const UserPosts = lazy(() => import( "./components/Post/Layout/PostLayout"));
const PostsDetails = lazy(() => import( "./components/Post/Layout/PostDetailLayout"));  
const AboutPage = lazy(() => import( "./components/AboutPage/Layout/AboutPageLayout"));
const CategoryPosts = lazy(() => import("./components/Post/Layout/CategoryPostsLayout"));




function App() {
  return(
    <BrowserRouter>
    <Suspense fallback= {<LoadingFallback />}>
      <Routes>
        <Route path = "/" element= {<Login />} />
        <Route path = "/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/role" element={<RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}><Roles /></RoleGuard>} />
        <Route path="/roles/:roleId/permissions" element={ <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}><Permissions /></RoleGuard>} />
        <Route path="/user" element={<RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}><Users /></RoleGuard>} />
        <Route path = "/category" element = {<RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}><Category /></RoleGuard>} />
        <Route path = "/posts" element = { <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN","AUTHOR"]}><AdminPost /></RoleGuard>} /> 
        <Route path = "/createBlog" element= {<RoleGuard allowedRoles={["AUTHOR", "ADMIN", "SUPER_ADMIN"]}><CreatePost /></RoleGuard>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path = "/allPosts" element= {<UserPosts />} />
        <Route path="/postContent/:id/post" element={<PostsDetails />} />
        <Route path = "/about" element= {<AboutPage />} />
        <Route path = "/posts/category/:slug" element = {<CategoryPosts/>} />
        

      </Routes>
    </Suspense>
    </ BrowserRouter>
    

  );
  
}

export default App;
