import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import WorkShop from "../pages/workshop/Workshop";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
