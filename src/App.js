import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
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

import Seoul from './board/seoul.js';
import Busan from './board/busan.js';
import Gyeonggi from './board/gyeonggi.js';
import Gyeongbuk from './board/gyeongbuk.js';
import Gyeongnam from './board/gyeongnam.js';
import Jeonnam from './board/jeonnam.js';
import Jeonbuk from './board/jeonnam.js';
import Chungbuk from './board/chungbuk.js';
import Chungnam from './board/chungnam.js';
import Ulsan from './board/ulsan.js';
import Gangwon from './board/gangwon.js';
import Jeju from './board/jeju.js';
import Daegu from './board/daegu.js';
import Incheon from './board/incheon.js';
import Daejeon from './board/daejeon.js';
import Sejong from './board/sejong.js';



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

        <Route path='/seoul' element={<Seoul />} />
        <Route path='/gyeonggi' element={<Gyeonggi />} />
        <Route path='/incheon' element={<Incheon />} />
        <Route path='/daejeon' element={<Daejeon />} />
        <Route path='/busan' element={<Busan />} />
        <Route path='/jeonnam' element={<Jeonnam />} />
        <Route path='/jeonbuk' element={<Jeonbuk />} />
        <Route path='/chungbuk' element={<Chungbuk />} />
        <Route path='/chungnam' element={<Chungnam />} />
        <Route path='/gangwon' element={<Gangwon />} />
        <Route path='/gyeongbuk' element={<Gyeongbuk />} />
        <Route path='/gyeongnam' element={<Gyeongnam />} />
        <Route path='/jeju' element={<Jeju />} />
        <Route path='/daegu' element={<Daegu />} />
        <Route path='/ulsan' element={<Ulsan />} />
        <Route path='/sejong' element={<Sejong />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;

