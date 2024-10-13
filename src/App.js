import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Registers from './pages/Registers';
import { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
import Topup from './pages/Topup';
import ServiceTopup from './pages/ServiceTopup';
import Transaction from './pages/Transaction';
import Akun from './pages/Akun';


function App() {
  return (
      <BrowserRouter>
        <Toaster 
          position='top-right'
        />
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registers />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/topup' element={<Topup />}/>
          <Route path='/servicetopup' element={<ServiceTopup />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/akun' element={<Akun />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
