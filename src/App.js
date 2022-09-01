import { Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Users from "./pages/Users";

import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import React from "react";
import AddPostForm from "./components/AddPost";
import SinglePostPage from "./pages/SinglePostPage";
import EditPostForm from "./components/EditPostForm";

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Users = React.lazy(() => import('./pages/Users'));

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <React.Suspense fallback="loading...">
        <Routes>
          <Route path="post">
            <Route index element ={<AddPostForm />} />
            <Route path=":postId" element ={<SinglePostPage />} />
            <Route path="edit/:postId" element ={<EditPostForm />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
