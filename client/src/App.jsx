import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { CreatePost, Home } from "./pages";
import Demo from "./components/Demo";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full  flex justify-between items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="./">
          <img src={logo} alt="Logo" className="w-28 object-contain" />
        </Link>
        <div className="flex justify-between items-center gap-2 z-10">
          <Link
            to="./create-post"
            className="font-inter font-medium bg-[#6469ff] text-white p-4 py-2 rounded-md"
          >
            Create Post
          </Link>
          <Link
            to="./demo"
            className="font-inter font-medium bg-[#6469ff] text-white p-4 py-2 rounded-md"
          >
            AI Summary
          </Link>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full  bg-[#f9f8fe] min-h-[cal(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
