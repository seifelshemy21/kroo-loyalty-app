import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Admin.css';
import './all.min.css';
import './component/loading.css'
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Home from './Home';
import Admin from './Admin';
import Dashboard from './Dashboard/Dashboard';
import Users from './Users';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser';
import { AdminRoute, UserRoute } from './Auth/ProtectedRoute';
import Navbar from './component/Navbar';
import AdminDashboard from './Dashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        
        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />} >
          <Route path='/admin' element={<Admin/>}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='users' element={<Users/>}/>
            <Route path='user/create' element={<CreateUser/>}/>
            <Route path='users/:id' element={<UpdateUser/>}/>
          </Route>
        </Route>

        {/* Customer Protected Routes */}
        <Route element={<UserRoute />} >
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
