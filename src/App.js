import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Detail from './pages/detail/Detail';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import Home from './pages/home/Home';
import Loading from './components/Global/Loading';
import TicketRoom from './pages/ticketRooms/TicketRoom';
import UserTemplate from './templates/userTemplate/UserTemplate';



import HomeTemplate from './templates/homeTemplate/HomeTemplate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApiProfile } from './redux/reducers/user/UserLogin';
import AppRoute from './HOC/AppRoute';
import Account from './pages/user/Account';
import AdminTemplate from './templates/adminTemplate/AdminTemplate';
import AddNew from './pages/Admin/films/addNew/AddNew';
import EditFilms from './pages/Admin/films/editFilms/EditFilms';
import ShowTime from './pages/Admin/films/showTime/ShowTime';
import UserManager from './pages/Admin/account/UserManager';
import EditAccount from './pages/Admin/account/editAccount/EditAccount';
import CreateAccount from './pages/Admin/account/createAccount/CreateAccount';
import Films from './pages/Admin/films/Films';




function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('TOKEN')) {
      dispatch(fetchApiProfile());
    }

  },[])

  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index path='' element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='ticketroom'>
            <Route path=':id' element={<AppRoute component={TicketRoom} isPrivate />}></Route>
          </Route>
        </Route>

        <Route path='user' element={<UserTemplate />}>
          <Route path='' element={<AppRoute component={Account} isPrivate />} ></Route>
          <Route path='login' element={<AppRoute component={Login} isAuth />} ></Route>
          <Route path='signup' element={<AppRoute component={SignUp} isAuth />} ></Route>
        </Route>

        <Route path='admin' element={<AdminTemplate/>}>
          <Route path='' element={<AppRoute component={Films} isAdmin/>}></Route>
          <Route path='account' element={<AppRoute component={UserManager} isAdmin/>}></Route>
          <Route path='account/edit/:taikhoan' element={<AppRoute component={EditAccount} isAdmin/>}></Route>
          <Route path='account/create' element={<AppRoute component={CreateAccount} isAdmin/>}></Route>
          <Route path='addfilms' element={<AppRoute component={AddNew} isAdmin/>}></Route>
          <Route path='editfilms/:id' element={<AppRoute component={EditFilms} isAdmin/>}></Route>
          <Route path='showtime/:id/:tenphim' element={<AppRoute component={ShowTime} isAdmin/>}></Route>
          <Route path='*' element={<Navigate to={''} />}></Route>
        </Route>

        <Route path='*' element={<Navigate to={''} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
