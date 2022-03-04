import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import WorkShop from "../pages/workshop/Workshop";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
