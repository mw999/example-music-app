import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Albums, Album, CreateAlbum, UpdateAlbum } from "./Pages/index";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Albums />}>
          <Route path="create" element={<CreateAlbum />} />
          <Route path="update/:id" element={<UpdateAlbum />} />
          <Route path="view/:id" element={<Album />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
