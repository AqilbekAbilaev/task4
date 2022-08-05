import { Route, Routes } from 'react-router-dom';
import Layout from './component/layout';
import Login from './component/login.component'
import Register from './component/register.component';
import Home from './component/home';
import Missing from './component/missing.component';
import RequireAuth from './component/RequireAuth';

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        // These pages must be open to authorized users
        <Route element={<RequireAuth />} >
          <Route path="/" element={<Home />} />
        </Route>

        //  rest pages 404
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
