import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkShop from "../pages/workshop/Workshop";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkShop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
