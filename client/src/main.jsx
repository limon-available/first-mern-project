import ReactDOM from "react-dom/client";
import { BrowserRouter,Route,Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home/Home.jsx";
import Shop from './pages/shop/Shop.jsx'

 const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
  <Route path="/"element={<Home/>}/>
  <Route path="/ebooks"element={<div>Ebooks</div>}/>
  <Route path="/membership"element={<div>Membership page</div>}/>
   <Route path="/books"element={<Shop/>}/>
   <Route path="/books/add"element={<div>Add Books</div>}/>
   
      </Route>
    </Routes>
  </BrowserRouter>
);