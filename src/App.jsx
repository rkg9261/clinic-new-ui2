import React from 'react'
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Facilities from './Components/Facilities/Facilities'
import Gallery from './Components/Gallery/Gallery'
import Appointment from './Components/Appointment/Appointment'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import BranchLogin from './Components/BranchLogin/BranchLogin'
import HomePage from './Components/HomePage/HomePage'

import AddPatientForm from './Components/AddPatientForm/AddPatientForm'
import PrescriptionForm from './Components/PrescriptionForm/PrescriptionForm'
import Recharge from './Components/Recharge/Recharge'
import OpenPatientList from './Components/OpenPatientList/OpenPatientList'
import PatientAttendance from './Components/PatientAttendance/PatientAttendance'
import ServiceCategory from './Components/ServiceCategory/ServiceCategory'
import ServicesSubCategory from './Components/ServicesSubCategory/ServicesSubCategory'
import Services from './Components/Services/Services'

import AddClinic from './Components/AddClinic/AddClinic'
import PreviouslyAddedClinics from './Components/PreviouslyAddedClinics/PreviouslyAddedClinics'
import FeatureSection from './Components/FeatureSection/FeatureSection'
import TreatmentSection from './Components/TreatmentSection/TreatmentSection'
import Dashboard from './Components/Dashboard/Dashboard'
import ClinicSuspended from './Components/Clinic-suspended/ClinicSuspended'

import Sidebar1 from './Components/Sidebar1/Sidebar1'
import Layout from './Layout'
import ClinicSidebar from './Components/ClinicSidebar/ClinicSidebar'
import LayoutClinic from './LayoutClinic'
import MenuSetting from './Components/MenuSetting/MenuSetting'
import PatientTreatmentProtocol from './Components/PaitentTreatmentProtocol/PatientTreatmentProtocol'
import RechargeHistory from './Components/RechargeHistory/RechargeHistory'
import PrescriptionSettingForm from './Components/PrescriptionSettingForm/PrescriptionSettingForm'
import AddDoctor from './Components/AddDoctor/AddDoctor'
import AddDoctorList from './Components/AddDoctorList/AddDoctorList'
import DashboardClinic from './Components/DashboardClinic/DashboardClinic'
import TrustedSupport from './Components/TrustedSupport/TrustedSupport'
import ExcellenceCare from './Components/ExcellenceCare/ExcellenceCare'
import SecureCare from './Components/SecureCare/SecureCare'
import TherapySlider from './Components/TherapySlider/TherapySlider'
import PlanVisit from './Components/PlanVisit/PlanVisit'
import ClientFeedback from './Components/ClientFeedback/ClientFeedback'
import WhatWeDo from './Components/WhatWeDo/WhatWeDo'
import WhyChooseUs from './Components/WhyChooseUs/WhyChooseUs'
import Conditions from './Components/conditions/Conditions'
import RecoveryProcess from './Components/RecoveryProcess/RecoveryProcess'
import Testimonials from './Components/Testimonials/Testimonials'
import Therapy from './Components/Therapy/Therapy'
import BlogSlider from './Components/BlogSlider/BlogSlider'
import AppointmentForm from './Components/AppointmentFrom/AppointmentForm'





function Website() {
  return (
   
    <div>
      <Navbar />
      <Hero/>
      <Conditions/>
      <Therapy/>
      <RecoveryProcess/>
      <Testimonials/>
      <BlogSlider/>
     <AppointmentForm/>
       <Footer/>
      {/* <Appointment/> 
      <ExcellenceCare/> 
      <Facilities/>
      <FeatureSection/>
       <WhatWeDo/>
      <Gallery/>     
      <About/>
      <TrustedSupport/>
      <SecureCare/>
      <Contact/>
      <TreatmentSection/>
      <TherapySlider/>
      <PlanVisit/>
      <WhyChooseUs/>
      <ClientFeedback/> */}
     
   
    </div>
   )    
};

function App () {
  return(
  
   <Routes>
               

             {/* main website */}
             <Route path="/" element={<Website/>}/>

              {/* Login */}
              <Route path="/login" element={<BranchLogin/>}/>

            
            {/* Routes WITH Fixed Sidebar  Clinic*/}   

<Route element={<LayoutClinic />}>
<Route path="/dashboard-clinic" element={  <DashboardClinic/>} />
  <Route path="/homepage" element={<HomePage />} />
  <Route path="/addpatient" element={<AddPatientForm />} />
  <Route path="/services" element={<Services />} />
  <Route path="/category" element={<ServiceCategory />} />
  <Route path="/sub-category" element={<ServicesSubCategory />} />
  <Route path="/setting-clinics" element={<PrescriptionSettingForm/>} />
  <Route path="/add-doctor" element={ <AddDoctor/>} />
  <Route path="/add-doctor-list" element={<AddDoctorList/>} />
    <Route path="/menu-settings" element={<MenuSetting/>} />
     <Route path="/recharge-history" element={<RechargeHistory/>} />
               {/*Recharge form*/}
   <Route path="/recharge" element={<Recharge/>}/>
                 {/*Open Patientn File */}
  <Route path="/openpatientlist" element={<OpenPatientList/>}/>
                  {/* Patientn Attendance*/}
  <Route path="/attendance" element={<PatientAttendance/>}/>
               {/* Patientn Treatment Protocol*/}
   <Route path="/treatment-protocol" element={<PatientTreatmentProtocol/> }/>
                {/*prescription form*/}
    <Route path="/prescription" element={<PrescriptionForm/>}/>
</Route>

             
                          {/* Routes WITH Fixed Sidebar  Admin*/}
            <Route element={<Layout />}>
                     {/* Admin Add-Clinic*/}
               <Route path="/add-clinic" element={<AddClinic/>}/>

                       {/*Previously Add-Clinic*/}
               <Route path="/running-clinic" element={<PreviouslyAddedClinics/>}/>

                               {/*Deshboard Admin*/}
               <Route path="/dashboard-admin" element={<Dashboard/>}/>

                               {/*Suspended Clinics*/}
               <Route path="/suspended-clinic" element={ <ClinicSuspended/>}/>
 </Route>
 
             
            
                {/*Sidebar-admin Clinics*/}
               <Route path="/sidebar-admin" element={<Sidebar1/> }/>

                      {/*Sidebar-admin Clinics*/}
               <Route path="/sidebar-clinic" element={  <ClinicSidebar/>}/>
              
            
   </Routes>
 
  )
}
    
 


export default App
