import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Publish from "./pages/Publish";
import Unpublish from "./pages/Unpublish";
// import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Publish />} />
          <Route path="publish" element={<Publish />} />
          <Route path="unpublish" element={<Unpublish />} />
        </Route>
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
