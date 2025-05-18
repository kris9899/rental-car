import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../../constants/index.js";

import Layout from "../Layout/Layout.jsx";
import Loader from "../../ui/Loader/Loader.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CarDetailsPage = lazy(() =>
  import("../../pages/CarDetailsPage/CarDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const App = () => {
  return (
    <Suspense fallback={<Loader loading={true} />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
          <Route path={ROUTES.CAR} element={<CarDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
