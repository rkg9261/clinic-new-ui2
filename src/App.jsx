import React from "react";

import {
  Routes,
  Route,
  HashRouter,
  Outlet,
} from "react-router-dom";


//====================================================
// WEBSITE COMPONENTS
//====================================================

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Hero from "./Components/Hero/Hero";
import Conditions from "./Components/conditions/Conditions";
import Therapy from "./Components/Therapy/Therapy";
import RecoveryProcess from "./Components/RecoveryProcess/RecoveryProcess";
import Testimonials from "./Components/Testimonials/Testimonials";
import BlogSlider from "./Components/BlogSlider/BlogSlider";
import AppointmentForm from "./Components/AppointmentFrom/AppointmentForm";


//====================================================
// LOGIN
//====================================================

import BranchLogin from "./Components/BranchLogin/BranchLogin";


//====================================================
// CLINIC COMPONENTS
//====================================================

import HomePage from "./Components/HomePage/HomePage";
import AddPatientForm from "./Components/AddPatientForm/AddPatientForm";
import PrescriptionForm from "./Components/PrescriptionForm/PrescriptionForm";
import Recharge from "./Components/Recharge/Recharge";
import OpenPatientList from "./Components/OpenPatientList/OpenPatientList";
import PatientAttendance from "./Components/PatientAttendance/PatientAttendance";
import ServiceCategory from "./Components/ServiceCategory/ServiceCategory";
import ServicesSubCategory from "./Components/ServicesSubCategory/ServicesSubCategory";
import Services from "./Components/Services/Services";


//====================================================
// ADMIN COMPONENTS
//====================================================

import AddClinic from "./Components/AddClinic/AddClinic";
import PreviouslyAddedClinics from "./Components/PreviouslyAddedClinics/PreviouslyAddedClinics";
import Dashboard from "./Components/Dashboard/Dashboard";
import ClinicSuspended from "./Components/Clinic-suspended/ClinicSuspended";


//====================================================
// SIDEBARS / LAYOUTS
//====================================================

import Sidebar1 from "./Components/Sidebar1/Sidebar1";
import Layout from "./Layout";

import ClinicSidebar from "./Components/ClinicSidebar/ClinicSidebar";
import LayoutClinic from "./LayoutClinic";


//====================================================
// CLINIC SETTINGS
//====================================================

import MenuSetting from "./Components/MenuSetting/MenuSetting";
import PatientTreatmentProtocol from "./Components/PaitentTreatmentProtocol/PatientTreatmentProtocol";
import RechargeHistory from "./Components/RechargeHistory/RechargeHistory";
import PrescriptionSettingForm from "./Components/PrescriptionSettingForm/PrescriptionSettingForm";
import AddDoctor from "./Components/AddDoctor/AddDoctor";
import AddDoctorList from "./Components/AddDoctorList/AddDoctorList";
import DashboardClinic from "./Components/DashboardClinic/DashboardClinic";


//====================================================
// PUBLIC PAGES
//====================================================

import BookAppointment from"./pages/BookAppointment/BookAppointment";
import AboutUs from "./pages/AboutUs/AboutUs";


//====================================================
// WEBSITE HOME CONTENT
//====================================================

function WebsiteHome() {

  return (
    <>

      <Hero />

      <Conditions />

      <Therapy />

      <RecoveryProcess />

      <Testimonials />

      <BlogSlider />

      <AppointmentForm />

    </>
  );

}


//====================================================
// WEBSITE LAYOUT
// Navbar + Page Content + Footer
//====================================================

function WebsiteLayout() {

  return (
    <>

      <Navbar />

      <Outlet />

      <Footer />

    </>
  );

}


//====================================================
// MAIN APP
//====================================================

function App() {

  return (

    <HashRouter>

      <Routes>


        {/*================================================
          PUBLIC WEBSITE ROUTES
        =================================================*/}

        <Route element={<WebsiteLayout />}>


          {/* HOME */}

          <Route
            path="/"
            element={<WebsiteHome />}
          />


          {/* ABOUT US */}

          <Route
            path="/about-us"
            element={<AboutUs />}
          />


          {/* BOOK APPOINTMENT */}

          <Route
            path="/book-appointment"
            element={<BookAppointment />}
          />


        </Route>


        {/*================================================
          LOGIN ROUTE
        =================================================*/}

        <Route
          path="/login"
          element={<BranchLogin />}
        />


        {/*================================================
          CLINIC ROUTES
        =================================================*/}

        <Route element={<LayoutClinic />}>


          {/* CLINIC DASHBOARD */}

          <Route
            path="/dashboard-clinic"
            element={<DashboardClinic />}
          />


          {/* HOME PAGE */}

          <Route
            path="/homepage"
            element={<HomePage />}
          />


          {/* ADD PATIENT */}

          <Route
            path="/addpatient"
            element={<AddPatientForm />}
          />


          {/* SERVICES */}

          <Route
            path="/services"
            element={<Services />}
          />


          {/* SERVICE CATEGORY */}

          <Route
            path="/category"
            element={<ServiceCategory />}
          />


          {/* SERVICE SUB CATEGORY */}

          <Route
            path="/sub-category"
            element={<ServicesSubCategory />}
          />


          {/* CLINIC SETTINGS */}

          <Route
            path="/setting-clinics"
            element={<PrescriptionSettingForm />}
          />


          {/* ADD DOCTOR */}

          <Route
            path="/add-doctor"
            element={<AddDoctor />}
          />


          {/* DOCTOR LIST */}

          <Route
            path="/add-doctor-list"
            element={<AddDoctorList />}
          />


          {/* MENU SETTINGS */}

          <Route
            path="/menu-settings"
            element={<MenuSetting />}
          />


          {/* RECHARGE HISTORY */}

          <Route
            path="/recharge-history"
            element={<RechargeHistory />}
          />


          {/* RECHARGE */}

          <Route
            path="/recharge"
            element={<Recharge />}
          />


          {/* OPEN PATIENT LIST */}

          <Route
            path="/openpatientlist"
            element={<OpenPatientList />}
          />


          {/* ATTENDANCE */}

          <Route
            path="/attendance"
            element={<PatientAttendance />}
          />


          {/* TREATMENT PROTOCOL */}

          <Route
            path="/treatment-protocol"
            element={<PatientTreatmentProtocol />}
          />


          {/* PRESCRIPTION */}

          <Route
            path="/prescription"
            element={<PrescriptionForm />}
          />


        </Route>


        {/*================================================
          ADMIN ROUTES
        =================================================*/}

        <Route element={<Layout />}>


          {/* ADD CLINIC */}

          <Route
            path="/add-clinic"
            element={<AddClinic />}
          />


          {/* RUNNING CLINICS */}

          <Route
            path="/running-clinic"
            element={<PreviouslyAddedClinics />}
          />


          {/* ADMIN DASHBOARD */}

          <Route
            path="/dashboard-admin"
            element={<Dashboard />}
          />


          {/* SUSPENDED CLINIC */}

          <Route
            path="/suspended-clinic"
            element={<ClinicSuspended />}
          />


        </Route>


        {/*================================================
          OTHER ROUTES
        =================================================*/}


        {/* ADMIN SIDEBAR */}

        <Route
          path="/sidebar-admin"
          element={<Sidebar1 />}
        />


        {/* CLINIC SIDEBAR */}

        <Route
          path="/sidebar-clinic"
          element={<ClinicSidebar />}
        />


      </Routes>

    </HashRouter>

  );

}


export default App;