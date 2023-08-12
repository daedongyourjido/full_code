import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./index.css";
import Main from './main.js';
import Login from './login.js';
import SignUp from './signup.js';
import Setting from './setting.js';
import ChangePw from './changePw.js';
import Withdraw from './withdraw.js';
import NeedVerify from './needVerify.js';
import Verify from './verify.js';
import FindPw from './findPw.js';
import SuccessWithdraw from './successWithdraw.js';
import NeedResetPw from './needResetPw.js';
import ResetPw from './resetPw.js';
import AppProfile from './App_profile.js';
import Place from './board/Place'
import Write_gesimool from './board/write_gesimool.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/setting' element={<Setting />} />
        <Route path="/setting/change" element={<ChangePw />} />
        <Route path='/setting/withdraw' element={<Withdraw />} />
        <Route path='/verify/send' element={<NeedVerify />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/find' element={<FindPw />} />
        <Route path='/setting/withdraw/success' element={<SuccessWithdraw />} />
        <Route path='find/send' element={<NeedResetPw />} />
        <Route path='find/reset' element={<ResetPw />} />
        <Route path='/profile' element={<AppProfile />} />
        <Route path='/write' element={<Write_gesimool />} />

        {/** route 동적 이동 **/}
        <Route path={'/board/:place'} element={<Place/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;