import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Private from './Pages/Routes/Private';
import NotFound from './Pages/NotFound';
import AboutAdmin from './Pages/Admin/AboutAdmin';
import AdminRoute from './Pages/Routes/AdminRoute';
import UserDashboard from './Pages/User/UserDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import AllProduct from './Pages/Admin/AllProducts';
import Product from './Pages/Product';

function App() {
  return (
    <>
      {/* <Layout></Layout> */}
      <Routes>

        <Route path='/' element={<Homepage />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<UserDashboard />}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AboutAdmin />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/products' element={<AllProduct />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/users' element={<Users />}></Route>
        </Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>

        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/*' element={<NotFound />}></Route>

      </Routes>
    </>
  );
}

export default App;
