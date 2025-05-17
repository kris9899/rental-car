import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../../constants/index.js";
import { useRef } from "react";
import Layout from "../Layout/Layout.jsx";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import CatalogPage from "../../pages/CatalogPage/CatalogPage.jsx";
import CarDetailsPage from "../../pages/CarDetailsPage/CarDetailsPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.CAR} element={<CarDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
