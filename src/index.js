import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Switch, Route } from 'react-router';
import history from './Routing/history';

//Layout
import { AppRoute, AdminDashboardLayout, ApplicantPreDashboardLayout, ApplicantDashboardLayout } from './Layout/MasterPageLayout';

//Store
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//Admin Pages
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminLoginSetup from './Admin/AdminLoginSetup';
import AdminForgotPassword from './Admin/AdminForgotPassword';

import ClientCompanyEntry from './Admin/ClientCompanyEntry';
import ClientCompanyList from './Admin/ClientCompanyList';
import EmployeeEntry from './Admin/EmployeeEntry';
import EmployeeList from './Admin/EmployeeList';
import InviteMembers from './Admin/InviteMembers';

import Notifications from './Admin/Notifications';
import Documents from './Admin/Documents';
import DocumentTypes from './Admin/DocumentTypes';
import CountryBasedDocuments from './Admin/CountryBasedDocuments';
import ApplicantDocumentsTracking from './Admin/ApplicantDocumentsTracking';
import ApplicantDocGatheringTracking from './Admin/ApplicantDocGatheringTracking';
import PageSetting from './Admin/PageSetting';

//Applicant Pages
import RegistrationPage from './Applicant/RegistrationPage';
import DirectRegistration from './Applicant/DirectRegistration';
import Login from './Applicant/Login';
import ForgotPassword from './Applicant/ForgotPassword';

import WelcomePage from './Applicant/WelcomePage';
import TermsAndCondition from './Applicant/TermsAndCondition';

import HowToStartProcess from './Applicant/HowtoStartProcess';
import GeneralQuestionnarie from './Applicant/GeneralQuestionnarie';
import ResidencyQuestionnarie from './Applicant/ResidencyQuestionnarie';
import ResidencyQuestionnaries from './Applicant/ResidencyQuestionnaries';
import BenefitsQuestionnariePart1 from './Applicant/BenefitsQuestionnariePart1';
import BenefitsQuestionnariePart2 from './Applicant/BenefitsQuestionnariePart2';
import DocumentUpload from './Applicant/DocumentUpload';

import SummaryDetails from './Applicant/SummaryDetails';
import GeneralSummary from './Applicant/GeneralSummary';
import ApplicantDashboard from './Applicant/ApplicantDashboard';
import ResidencySummary from './Applicant/ResidencySummary';
import BenefitsSummary from './Applicant/BenefitsSummary';
import BenQusCanada from './Applicant/BenQusCanada';
import BenQusSouthKoreaLumpSum from './Applicant/BenQusSouthKoreaLumpSum';
import BenQusSKBankForm from './Applicant/BenQusSKBankForm';
import BenQusUS from './Applicant/BenQusUS';
import BenQusUK from './Applicant/BenQusUK';
import BenQusDenmark from './Applicant/BenQusDenmark';
import BenQusQuebec from './Applicant/BenQusQuebec';
import BenQusItaly from './Applicant/BenQusItaly';
import BenQusFrance from './Applicant/BenQusFrance';
import BenQusJapan from './Applicant/BenQusJapan';
import BenQusNorway from './Applicant/BenQusNorway';
import Country from './Admin/Country';
import Industry from './Admin/Industry';
import ThanksForRegPage from './Applicant/ThanksForRegPage';
import AddPage from './Admin/AddPage';
import ContactUs from './Applicant/ContactUs';
import UserSetting from './Applicant/UserSetting';
import AdminUserSetting from './Admin/AdminUserSetting';
import CustomerSupportList from './Admin/CustomerSupportList';
import Aboutus from './Applicant/Aboutus';
import FQA from './Applicant/FQA';
import TC from './Applicant/TC';

import BenNorway from './Applicant/BenNorway';
import PrivatePensionQuestionnaire from './Applicant/PrivatePensionQuestionnaire';
import VoluntaryContribution from './Applicant/VoluntaryContribution';
import BenQusSouthKorean from './Applicant/BenQusSouthKorean';
import BenQusAustria from './Applicant/BenQusAustria';
import BenQusBelgium from './Applicant/BenQusBelgium';
import BenQusBrazil from './Applicant/BenQusBrazil';
import BenQusGermany from './Applicant/BenQusGermany';
import BenQusIreland from './Applicant/BenQusIreland';
import BenQusNetherlands from './Applicant/BenQusNetherlands';
import BenQusPortugal from './Applicant/BenQusPortugal';
import BenQusCommon from './Applicant/BenQusCommon';

const login_InitialState = {
    LUserID: "no-reply@globalpensionassociates.com",
    LPwd: "",
    Language: "en"
}

const Reducer_LoginUserData = (state = login_InitialState, action) => {
    switch (action.type) {
        case "SAVE_USERID":
            state = {
                ...state,
                LUserID: action.payload
            }
            break;
        case "SAVE_LANGUAGE":
            state = {
                ...state,
                Language: action.payload
            }
            break;
        case "SAVE_PASSWORD":
            state = {
                ...state,
                LPwd: action.payload,
            }
            break;
    }
    return state;
}

const initialState = {
    UserName: "User Name",
    TCFlag: false,
    CCompanyID: "",
    UTCStatus: "P",
    isMoveResidency: "false",
    ResData: "",
}

const Reducer_UserData = (state = initialState, action) => {
    switch (action.type) {

        case "SAVE_USERNAME":
            state = {
                ...state,
                UserName: action.payload,
            }
            break;
        case "SAVE_RESIDENCY_COUNTRY":
            state = {
                ...state,
                ResData: action.payload,
            }
            break;
        case "SET_TC_FLAG":
            state = {
                ...state,
                TCFlag: action.payload,
            }
            break;
        case "SAVE_CCOMPANYID":
            state = {
                ...state,
                CCompanyID: action.payload,
            }
            break;
        case "SAVE_UTC_STATUS":
            state = {
                ...state,
                UTCStatus: action.payload,
            }
            break;
        case "SAVE_ISMOVE_RESIDENCY":
            state = {
                ...state,
                isMoveResidency: action.payload,
            }
            break;
    }
    return state;
}

const store = createStore(combineReducers({ Login_Reducer: Reducer_LoginUserData, User_Reducer: Reducer_UserData }));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <Router history={history}>
                    <Switch>

                        {/* // Admin part */}
                        <AppRoute path='/AdminDashboard' layout={AdminDashboardLayout} component={AdminDashboard} />
                        <Route path='/AdminLogin' component={AdminLogin} />
                        <Route path='/AdminLoginSetup' component={AdminLoginSetup} />
                        <Route path='/AdminForgotPassword' component={AdminForgotPassword} />

                        <AppRoute path='/ClientCompanyEntry' layout={AdminDashboardLayout} component={ClientCompanyEntry} />
                        <AppRoute path='/ClientCompanyList' layout={AdminDashboardLayout} component={ClientCompanyList} />
                        <AppRoute path='/EmployeeEntry' layout={AdminDashboardLayout} component={EmployeeEntry} />
                        <AppRoute path='/EmployeeList' layout={AdminDashboardLayout} component={EmployeeList} />
                        <AppRoute path='/Notifications' layout={AdminDashboardLayout} component={Notifications} />
                        <AppRoute path='/DocumentTypes' layout={AdminDashboardLayout} component={DocumentTypes} />
                        <AppRoute path='/Documents' layout={AdminDashboardLayout} component={Documents} />
                        <AppRoute path='/CountryBasedDocuments' layout={AdminDashboardLayout} component={CountryBasedDocuments} />
                        <AppRoute path='/ApplicantDocumentsTracking' layout={AdminDashboardLayout} component={ApplicantDocumentsTracking} />
                        <AppRoute path='/Country' layout={AdminDashboardLayout} component={Country} />
                        <AppRoute path='/Industry' layout={AdminDashboardLayout} component={Industry} />
                        <AppRoute path='/InviteMembers' layout={AdminDashboardLayout} component={InviteMembers} />
                        <AppRoute path='/ApplicantDocumentsGathering' layout={AdminDashboardLayout} component={ApplicantDocGatheringTracking} />
                        <AppRoute path='/PageSetting' layout={AdminDashboardLayout} component={PageSetting} />
                        <AppRoute path='/AddPage' layout={AdminDashboardLayout} component={AddPage} />
                        <AppRoute path='/AdminUserSetting' layout={AdminDashboardLayout} component={AdminUserSetting} />
                        <AppRoute path='/CustomerSupportList' layout={AdminDashboardLayout} component={CustomerSupportList} />

                        {/* Applicant part */}
                        <Route exact path="/" component={App} />
                        <Route path='/DirectRegistration' component={DirectRegistration} />
                        <Route path='/ThanksForRegPage' component={ThanksForRegPage} />
                        <Route path='/Login' component={Login} />
                        <Route path='/ForgotPassword' component={ForgotPassword} />

                        {/* Applicant Pre Dashboard Part */}
                        <AppRoute path='/WelcomePage' layout={ApplicantPreDashboardLayout} component={WelcomePage} />
                        <AppRoute path='/TermsAndCondition' layout={ApplicantPreDashboardLayout} component={TermsAndCondition} />

                        {/* Applicant Dashboard Part */}
                        <AppRoute path='/ApplicantDashboard' layout={ApplicantDashboardLayout} component={ApplicantDashboard} />
                        <AppRoute path='/HowToStartProcess' layout={ApplicantDashboardLayout} component={HowToStartProcess} />
                        <AppRoute path='/GeneralQuestionnarie' layout={ApplicantDashboardLayout} component={GeneralQuestionnarie} />
                        <AppRoute path='/ResidencyQuestionnarie' layout={ApplicantDashboardLayout} component={ResidencyQuestionnarie} />
                        <AppRoute path='/ResidencyQuestionnaries' layout={ApplicantDashboardLayout} component={ResidencyQuestionnaries} />
                        <AppRoute path='/BenefitsQuestionnariePart1' layout={ApplicantDashboardLayout} component={BenefitsQuestionnariePart1} />
                        <AppRoute path='/BenefitsQuestionnariePart2' layout={ApplicantDashboardLayout} component={BenefitsQuestionnariePart2} />
                        <AppRoute path='/DocumentUpload' layout={ApplicantDashboardLayout} component={DocumentUpload} />
                        <AppRoute path='/ContactUS' layout={ApplicantDashboardLayout} component={ContactUs} />
                        <AppRoute path='/UserSetting' layout={ApplicantDashboardLayout} component={UserSetting} />
                        <AppRoute path='/AboutUS' layout={ApplicantDashboardLayout} component={Aboutus} />
                        <AppRoute path='/FQA' layout={ApplicantDashboardLayout} component={FQA} />
                        <AppRoute path='/TC' layout={ApplicantDashboardLayout} component={TC} />
                        <Route path='/SummaryDetails' component={SummaryDetails} />
                        <Route path='/GeneralSummary' component={GeneralSummary} />
                        <Route path='/ResidencySummary' component={ResidencySummary} />
                        <Route path='/BenefitsSummary' component={BenefitsSummary} />
                        <AppRoute path='/BenQusSKBankForm' layout={ApplicantDashboardLayout} component={BenQusSKBankForm} />
                        <Route path='/BenQusSKLumpSum' component={BenQusSouthKoreaLumpSum} />
                        <Route path='/BenQusCanada' component={BenQusCanada} />
                        <Route path='/BenQusUS' component={BenQusUS} />
                        <Route path='/BenQusUK' component={BenQusUK} />
                        <Route path='/BenQusDenmark' component={BenQusDenmark} />
                        <Route path='/BenQusQuebec' component={BenQusQuebec} />
                        <Route path='/BenQusItaly' component={BenQusItaly} />
                        <Route path='/BenQusFrance' component={BenQusFrance} />
                        <Route path='/BenQusJapan' component={BenQusJapan} />
                        <Route path='/BenQusNorway' component={BenQusNorway} />
                        <Route path='/BenNorway' component={BenNorway} />
                        <AppRoute path='/VoluntaryContribution' layout={ApplicantDashboardLayout} component={VoluntaryContribution} />
                        <AppRoute path='/PrivatePensionQuestionnaire' layout={ApplicantDashboardLayout} component={PrivatePensionQuestionnaire} />
                        <Route path='/BenQusSouthKorean' component={BenQusSouthKorean} />
                        <Route path='/BenQusAustria' component={BenQusAustria} />
                        <Route path='/BenQusBelgium' component={BenQusBelgium} />
                        <Route path='/BenQusBrazil' component={BenQusBrazil} />
                        <Route path='/BenQusGermany' component={BenQusGermany} />
                        <Route path='/BenQusIreland' component={BenQusIreland} />
                        <Route path='/BenQusNetherlands' component={BenQusNetherlands} />
                        <Route path='/BenQusPortugal' component={BenQusPortugal} />
                        <Route path='/BenQusCommon' component={BenQusCommon} />
                    </Switch>
                </Router>
            </div>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

