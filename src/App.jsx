import React from "react";

import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Hero from "./Components/Hero/Hero";
import Conditions from "./Components/conditions/Conditions";
import Therapy from "./Components/Therapy/Therapy";
import RecoveryProcess from "./Components/RecoveryProcess/RecoveryProcess";
import Testimonials from "./Components/Testimonials/Testimonials";
import BlogSlider from "./Components/BlogSlider/BlogSlider";
import AppointmentForm from "./Components/AppointmentFrom/AppointmentForm";

import BranchLogin from "./Components/BranchLogin/BranchLogin";
import HomePage from "./Components/HomePage/HomePage";

import AddPatientForm from "./Components/AddPatientForm/AddPatientForm";
import PrescriptionForm from "./Components/PrescriptionForm/PrescriptionForm";
import Recharge from "./Components/Recharge/Recharge";
import OpenPatientList from "./Components/OpenPatientList/OpenPatientList";
import PatientAttendance from "./Components/PatientAttendance/PatientAttendance";
import ServiceCategory from "./Components/ServiceCategory/ServiceCategory";
import ServicesSubCategory from "./Components/ServicesSubCategory/ServicesSubCategory";
import Services from "./Components/Services/Services";

import AddClinic from "./Components/AddClinic/AddClinic";
import PreviouslyAddedClinics from "./Components/PreviouslyAddedClinics/PreviouslyAddedClinics";
import Dashboard from "./Components/Dashboard/Dashboard";
import ClinicSuspended from "./Components/Clinic-suspended/ClinicSuspended";

import Sidebar1 from "./Components/Sidebar1/Sidebar1";
import Layout from "./Layout";
import ClinicSidebar from "./Components/ClinicSidebar/ClinicSidebar";
import LayoutClinic from "./LayoutClinic";

import MenuSetting from "./Components/MenuSetting/MenuSetting";
import PatientTreatmentProtocol from "./Components/PaitentTreatmentProtocol/PatientTreatmentProtocol";
import RechargeHistory from "./Components/RechargeHistory/RechargeHistory";
import PrescriptionSettingForm from "./Components/PrescriptionSettingForm/PrescriptionSettingForm";
import AddDoctor from "./Components/AddDoctor/AddDoctor";
import AddDoctorList from "./Components/AddDoctorList/AddDoctorList";
import DashboardClinic from "./Components/DashboardClinic/DashboardClinic";

import BookAppointment from "./pages/BookAppointment/BookAppointment";
import AboutUs from "./pages/AboutUs/AboutUs";


/*====================================================
  WEBSITE HOME CONTENT
====================================================*/

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


/*====================================================
  WEBSITE LAYOUT
====================================================*/

function WebsiteLayout() {

  return (

    <>

      <Navbar />

      <Outlet />

      <Footer />

    </>

  );

}


/*====================================================
  APP
====================================================*/

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/*================================================
          PUBLIC WEBSITE
        =================================================*/}

        <Route element={<WebsiteLayout />}>

          {/* HOME */}

          <Route path="/" element={<WebsiteHome />}/>
           {/* about os */}
           <Route path="/about-us" element={<AboutUs />} />
          


          {/* BOOK APPOINTMENT */}

          <Route
            path="/book-appointment"
            element={<BookAppointment />}
          />

        </Route>


        {/*================================================
          LOGIN
        =================================================*/}

        <Route
          path="/login"
          element={<BranchLogin />}
        />


        {/*================================================
          CLINIC ROUTES
        =================================================*/}

        <Route element={<LayoutClinic />}>

          <Route
            path="/dashboard-clinic"
            element={<DashboardClinic />}
          />

          <Route
            path="/homepage"
            element={<HomePage />}
          />

          <Route
            path="/addpatient"
            element={<AddPatientForm />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/category"
            element={<ServiceCategory />}
          />

          <Route
            path="/sub-category"
            element={<ServicesSubCategory />}
          />

          <Route
            path="/setting-clinics"
            element={<PrescriptionSettingForm />}
          />

          <Route
            path="/add-doctor"
            element={<AddDoctor />}
          />

          <Route
            path="/add-doctor-list"
            element={<AddDoctorList />}
          />

          <Route
            path="/menu-settings"
            element={<MenuSetting />}
          />

          <Route
            path="/recharge-history"
            element={<RechargeHistory />}
          />

          <Route
            path="/recharge"
            element={<Recharge />}
          />

          <Route
            path="/openpatientlist"
            element={<OpenPatientList />}
          />

          <Route
            path="/attendance"
            element={<PatientAttendance />}
          />

          <Route
            path="/treatment-protocol"
            element={<PatientTreatmentProtocol />}
          />

          <Route
            path="/prescription"
            element={<PrescriptionForm />}
          />

        </Route>


        {/*================================================
          ADMIN ROUTES
        =================================================*/}

        <Route element={<Layout />}>

          <Route
            path="/add-clinic"
            element={<AddClinic />}
          />

          <Route
            path="/running-clinic"
            element={<PreviouslyAddedClinics />}
          />

          <Route
            path="/dashboard-admin"
            element={<Dashboard />}
          />

          <Route
            path="/suspended-clinic"
            element={<ClinicSuspended />}
          />

        </Route>


        {/*================================================
          OTHER ROUTES
        =================================================*/}

        <Route
          path="/sidebar-admin"
          element={<Sidebar1 />}
        />

        <Route
          path="/sidebar-clinic"
          element={<ClinicSidebar />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;