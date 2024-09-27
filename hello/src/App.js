// import './App.css';
// import Login from './views/pages/Login';
// import "./scss/style.scss";



import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CSpinner, useColorModes } from "@coreui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./views/pages/login/Login";
import "./scss/style.scss";

import CreateMember from "./views/member/CreateMember";
import Beading from "./views/beading/Beading";
import Payment from "./views/payment/Payment";
import SingleMemberPaymentDetails from "./views/payment/SingleMemberPaymentDetails";
import SearchMonthPaymentDetails from "./views/payment/SearchMonthPaymentDetails";
import WinnerDetails from "./views/winnerdetail/WinnerDetails";
import MasterDatatable from "./views/masterdatatable/MaterDatatable";
import HistoryAmount from "./views/winnerdetail/HistoryAmount";
import CreateMember1 from "./views/member/CreateMember1";
import WinnerSchemeMonth from "./views/winnerdetail/WinnerSchemeMonth";
import Scheme from "./views/scheme/Scheme";
import CreateScheme from './views/scheme/CreateScheme'
import Report from './views/scheme/Report';
import EditMember from './views/member/EditMember';
import Tmreport from "./views/report/Tmreport";
import DeleteScheme from "./views/scheme/DeleteScheme";
import Receipt from "./views/payment/Receipt";
import Upate from "./views/report/Upate";
import BcDate from "./views/bcDate/BcDate";
import Forgotpassword from "./views/pages/login/Forgotpassword";
import EnterOtp from "./views/pages/login/EnterOtp";
import ChangePassword from "./views/pages/login/ChangePassword";
import WinnerData from "./views/beading/WinnerData";
import Bcdatamessage from "./views/bcDate/Bcdatamessage";
import Hello from "./views/bcDate/Hello";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isColorModeSet, setColorMode } = useColorModes("coreui-free-react-admin-template-theme");
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme = urlParams.get("theme") && urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }
    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgotemail" element={<Forgotpassword/>} />
          <Route path="/enterotp/:email" element={<EnterOtp/>} />
          <Route path="/changepassword/:email" element={<ChangePassword/>} />

          <Route path="/agency" element={
            <ProtectedRoute>
              <DefaultLayout />
          </ProtectedRoute> 
          }>
            
            <Route index element={<Scheme/>} />
            <Route path="/agency/editmember/:memberId" element={<EditMember />} />
            <Route path="/agency/createscheme" element={<CreateScheme />} />
            {/* <Route path="/agency/creategroup" element={<CreateGroup />} /> */}
            <Route path="/agency/masterdatatable" element={<MasterDatatable />} />
            <Route path="/agency/createm1/:schemeId" element={<CreateMember1 />} />
            <Route path="/agency/createmember" element={<CreateMember />} />
            <Route path="/agency/schememonthwinner" element={<WinnerSchemeMonth />} />
            <Route path="/agency/beading/:schemeId" element={<Beading />} />
            <Route path="/agency/report/:schemeId" element={<Report />} />
            <Route path="/agency/winnerdetails/:schemeId" element={<WinnerDetails />} />
            <Route path="/agency/delete/:schemeId" element={<DeleteScheme />} />
            <Route path="/agency/singlememberpaymentdetail/:schemeId" element={<SingleMemberPaymentDetails />} />
            <Route path="/agency/searchmonthpaymentdetail/:schemeId" element={<SearchMonthPaymentDetails />} />
            <Route path="/agency/history" element={<HistoryAmount />} />
            <Route path="/agency/payment" element={<Payment />} />
            <Route path="/agency/receipt" element={<Receipt />} />
            <Route path="/agency/tmreport" element={<Tmreport />} /> 
            <Route path="/agency/update/:schemeId" element={<Upate />} />
            <Route path="/agency/updateDate/:schemeId" element={<BcDate/>} />
            <Route path="/agency/winnerdata/:schemeId/:bcdateId" element={<WinnerData />} />
            <Route path="/agency/bcdatemessge/:schemeId" element={<Bcdatamessage/>} />
            {/* <Route path="" element={<SendDate/>} /> */}


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
