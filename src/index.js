import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";

//main app wraper
import App from "./App";
import AddForm from "./Components/FormActions/AddForm";
import UpdateForm from "./Components/FormActions/UpdateForm";
import DeleteForm from "./Components/FormActions/DeleteForm";
import Home from "./Home";

//404 page

import NotFound from "./NotFound";
import Logout from "./Components/Logout";

const rootElement = document.getElementById("root");
render(
  <MemoryRouter>
    <Routes>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/:route/delete/:ID" element={<DeleteForm/>}/>
        <Route path="/:route/update/:ID" element={<UpdateForm/>}/>
        <Route path="/:route/add" element={<AddForm/>}/>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </MemoryRouter>,
  rootElement
);