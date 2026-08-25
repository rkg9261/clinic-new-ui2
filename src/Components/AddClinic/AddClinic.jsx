import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import "./AddClinic.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function AddClinic() {

const navigate = useNavigate();
const location = useLocation();

const clinicData = location.state?.clinic;
const isEdit = location.state?.isEdit || false;

const [clinicName, setClinicName] = useState(clinicData?.name || "");

const [clinicAddress, setClinicAddress] = useState( clinicData?.address || "");
 
const [phoneNo, setPhoneNo] = useState(  clinicData?.phone || "");

const [email, setEmail] = useState( clinicData?.email || "");

const [doctorName, setDoctorName] = useState(  clinicData?.doctor_name || "");

const [doctorDegree, setDoctorDegree] = useState(clinicData?.doctor_degree || "");

const [regCouncilName, setRegCouncilName] = useState(clinicData?.reg_council_name || "");

const [registrationNo, setRegistrationNo] = useState(clinicData?.state_council_registration_no || ""
);
  

const [gstin, setGstin] = useState(
  clinicData?.gstin || ""
);

const [password, setPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");


const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [logoFile, setLogoFile] = useState(null);
const [headerFile, setHeaderFile] = useState(null);
const [footerFile, setFooterFile] = useState(null);
const [idCardFile, setIdCardFile] = useState(null);

const [logoPreview, setLogoPreview] = useState(  clinicData?.logo_file || "");
const [headerPreview, setHeaderPreview] = useState(clinicData?.letterhead_header_file || "");
const [footerPreview, setFooterPreview] = useState(clinicData?.letterhead_footer_file || "");
const [idCardPreview, setIdCardPreview] = useState(clinicData?.id_card_background_file || "");
  
// useEffect
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (!isEdit) {
    setClinicName("");
    setClinicAddress("");
    setPhoneNo("");
    setEmail("");
    setDoctorName("");
    setDoctorDegree("");
    setRegCouncilName("");
    setRegistrationNo("");
    setGstin("");
    setPassword("");
    setConfirmPassword("");

    setLogoFile(null);
    setHeaderFile(null);
    setFooterFile(null);
    setIdCardFile(null);

    setLogoPreview("");
    setHeaderPreview("");
    setFooterPreview("");
    setIdCardPreview("");
  }
}, [location.key]);

  //Image change

const handleImageChange = (
  e,
  setter,
  setPreview
) => {

  const file = e.target.files[0];

  if (!file) return;

  setter(file);

  setPreview(
    URL.createObjectURL(file)
  );
};
 

//handle Submit

const handleSubmit = async (e) => {

  e.preventDefault();

 if (
  !clinicName ||
  !clinicAddress ||
  !phoneNo ||
  !email ||
  !doctorName ||
  !doctorDegree ||
  !regCouncilName ||
  !registrationNo ||
  !password ||
  !confirmPassword
) {
  alert("Please Fill All Fields");
  return;
}

if (password.length < 6) {
  alert(
    "Password must be at least 6 characters"
  );
  return;
}

if (password !== confirmPassword) {
  alert(
    "Confirm Password does not match"
  );
  return;
}

  try {

    const formData = new FormData();

    formData.append("clinicName",clinicName);

    formData.append("clinicAddress", clinicAddress );
  
    formData.append("phoneNo",phoneNo);

    formData.append("email", email  );

    formData.append("doctorName",doctorName );

    formData.append("registrationNo",registrationNo );
  
    formData.append("gstin",gstin );

    formData.append("doctorDegree",doctorDegree);

    formData.append("regCouncilName",regCouncilName);

    formData.append("password",password);

    formData.append("confirmPassword", confirmPassword);
  
    // Images

    if (logoFile) {
      formData.append("logoFile",logoFile);
    }    
        
    if (headerFile) {
       formData.append("headerFile", headerFile);  
    }

    if (footerFile) {
      formData.append("footerFile",footerFile);  
    }

    if (idCardFile) {
      formData.append( "idCardFile",idCardFile);
     }   
        
      
   

   const token = Cookies.get("token");
   console.log ("Token:",token);
  
   // Api Call  
  console.log("========= FORM DATA =========");

for (let pair of formData.entries()) {
  console.log(pair[0], ":", pair[1]);
}
console.log("========= END =========");

let response;

if (isEdit) {

  const formData = new FormData();

formData.append( "clinicName",clinicName  );
 
formData.append( "clinicAddress", clinicAddress );

formData.append("phoneNo",phoneNo);

formData.append("email",email);

formData.append("doctorName",doctorName);

formData.append( "registrationNo",registrationNo);

formData.append("gstin",gstin );

formData.append( "doctorDegree",doctorDegree);

formData.append(  "regCouncilName", regCouncilName);

formData.append("password",password);

formData.append("confirmPassword",confirmPassword);
  
  
//Images

if (logoFile) {
  formData.append( "logoFile",logoFile  );
}

if (headerFile) {
  formData.append( "headerFile",headerFile  );
}
     
if (footerFile) {
  formData.append("footerFile",footerFile  );
}

if (idCardFile) {
  formData.append("idCardFile",idCardFile  );
}
    
    


response = await fetch(
  `${BASE_URL}/api/clinics/${clinicData.id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }
);

} else {

response = await fetch(
  `${BASE_URL}/api/clinics`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }
);
}

    const data =
      await response.json();

    console.log(data);

    if (!response.ok) {

      alert(
        data.message ||
        "Failed to Add Clinic"
      );

      return;
    }

    alert(
  isEdit
    ? "Clinic Updated Successfully"
    : "Clinic Added Successfully"
);

navigate(
  "/running-clinic"
);

  } catch (error) {

    console.log(error);

    alert("Server Error");
  }
};

//arrow key handle
const handleArrowKey = (e) => {

  if (
    e.key !== "ArrowDown" &&
    e.key !== "ArrowUp"
  ) return;

  const form =
    e.target.form;

  const elements = Array.from(
    form.querySelectorAll(
      "input, select, textarea"
    )
  );

  const index =
    elements.indexOf(
      e.target
    );

  if (e.key === "ArrowDown") {

    e.preventDefault();

    elements[
      index + 1
    ]?.focus();

  }

  if (e.key === "ArrowUp") {

    e.preventDefault();

    elements[
      index - 1
    ]?.focus();

  }
};

  return (
<>

    <div className="container-add-clinic">

      <h1 className="heading-add-clinic">
  {isEdit
    ? "UPDATE CLINIC"
    : "ADD NEW CLINIC"}
</h1>
       
                      {/* Add Clinic Form */}

      <form  onSubmit={handleSubmit} onKeyDown={handleArrowKey}>
    
             {/*  Clinic Name*/}

        <label className="label-add-clinic"> Clinic Name</label>  
        <input className="input-add-clinic"
          value={clinicName}
          onChange={(e)=>setClinicName(e.target.value)}
         placeholder="Enter Clinic Name"/>
          
          {/*  Clinic Address*/}

        <label className="label-add-clinic">Clinic Address</label>
        <input  className="input-add-clinic"
          value={clinicAddress}
        onChange={(e)=>setClinicAddress(e.target.value)}
          placeholder="Enter Address"/>
          
                {/*  phoneNo no*/}

        <label className="label-add-clinic"> Phone No</label>
        <input   className="input-add-clinic"
        value={phoneNo}
        onChange={(e)=>setPhoneNo(e.target.value)}
          placeholder="Enter Phone No" />
          
        
                 {/*  Email*/}
        <label className="label-add-clinic"> Email</label>
        <input className="input-add-clinic"
           value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter Email"/>
        

                  {/*  Doctor Name*/}
        <label className="label-add-clinic">Doctor Name</label>
        <input  className="input-add-clinic"
          value={doctorName}
          onChange={(e)=>setDoctorName(e.target.value)}
          placeholder="Enter Doctor Name"/>


                  {/*  Doctor Degree*/}
          <label className="label-add-clinic">Doctor Degree</label>
        <input className="input-add-clinic" value={doctorDegree}
        onChange={(e) =>  setDoctorDegree(e.target.value) }
        placeholder="Enter Doctor Degree"/>


                    {/* REG Council Name */}

          <label className="label-add-clinic">Reg. Council Name</label>
       <input  className="input-add-clinic" 
        value={regCouncilName}
       onChange={(e) =>setRegCouncilName(e.target.value)}
          placeholder="Enter REG Council Name"/>


                  {/*  Registration Number*/}
        <label className="label-add-clinic">Registration Number</label>
        <input className="input-add-clinic"
          value={registrationNo}
          onChange={(e)=>setRegistrationNo(e.target.value)}
          placeholder="Enter Registration No"/>
         
        
                 {/*  GSTIN*/}
        <label className="label-add-clinic"> GSTIN </label>
        <input  className="input-add-clinic"
        value={gstin}
          onChange={(e)=>setGstin(e.target.value)}
          placeholder="Enter GSTIN"/>
          

                  {/* password  */}
          <label className="label-add-clinic"> Password</label>
      <div className="password-wrapper">
       <input className="input-add-clinic" type={
          showPassword
         ? "text"
        : "password" }
       value={password}  onChange={(e) =>setPassword(e.target.value)}
        placeholder="Enter Password"/>
           <span
        className="eye-icon"
         onClick={() =>  setShowPassword(!showPassword)} >
          {showPassword
          ? <FaEyeSlash />
          : <FaEye />}
         </span>
        </div>

                         {/* Confirm Password */}

               <label className="label-add-clinic">Confirm Password</label>
           <div className="password-wrapper">
           <input className="input-add-clinic"
               type={showConfirmPassword
                   ? "text"
                   : "password" }
         value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) }
      placeholder="Confirm Password"/>
          <span className="eye-icon" 
    onClick={() =>  setShowConfirmPassword( !showConfirmPassword) } >
    {showConfirmPassword
      ? <FaEyeSlash />
      : <FaEye />}
      </span>
      </div>
   

                                {/* Logo */}
        <label className="label-add-clinic"> Upload Logo </label>
        <input type="file"
           accept="image/*"
         onChange={(e)=>handleImageChange(e,setLogoFile, setLogoPreview)}/>
         
{logoPreview && (
  <div className="image-preview-box">

    <img
      src={logoPreview}
      alt=""
      className="preview-image-add-clinic"
    />

    <button
      type="button"
      className="remove-image-btn"
      onClick={() => {
        setLogoFile(null);
        setLogoPreview("");
      }}
    >
      <FaTrash /> Remove
    </button>

  </div>
)}

                     {/* Header File */}

        <label className="label-add-clinic"> Upload Letter Header </label>
        <input  type="file" accept="image/*"
         onChange={(e)=>handleImageChange(e,setHeaderFile, setHeaderPreview)} />
          {headerPreview && (
  <div className="image-preview-box">

    <img
      src={headerPreview}
      alt="Header"
      className="preview-image-add-clinic"
    />

    <button
      type="button"
      className="remove-image-btn"
      onClick={() => {
        setHeaderFile(null);
        setHeaderPreview("");
      }}
    >
      <FaTrash /> Remove
    </button>

  </div>
)}

               {/* Footer file */}

        <label className="label-add-clinic"> Upload Letter Footer </label>
        <input type="file" accept="image/*"
          onChange={(e)=>handleImageChange(e,setFooterFile,setFooterPreview)} />
         
      {footerPreview && (
  <div className="image-preview-box">

    <img
      src={footerPreview}
      alt="Footer"
      className="preview-image-add-clinic"
    />

    <button
      type="button"
      className="remove-image-btn"
      onClick={() => {
        setFooterFile(null);
        setFooterPreview("");
      }}
    >
      <FaTrash /> Remove
    </button>

  </div>
)}

                     {/* ID Card */}
        <label className="label-add-clinic">  Upload ID Card </label>
        <input type="file"  accept="image/*" 
          onChange={(e)=>handleImageChange(e,setIdCardFile,setIdCardPreview)}/>

       {idCardPreview && (
  <div className="image-preview-box">

    <img
      src={idCardPreview}
      alt="ID Card"
      className="preview-image-add-clinic"
    />

    <button
      type="button"
      className="remove-image-btn"
      onClick={() => {
        setIdCardFile(null);
        setIdCardPreview("");
      }}
    >
      <FaTrash /> Remove
    </button>

  </div>
)}
   
  
                {/*Submit button*/}
<div className="button-row">

  <button type="submit" className="submit-button-add-clinic" >
   {isEdit ? "Update Clinic" : "Submit"}
    </button>
 
    
 

  {isEdit && (
    <>
      <button type="button" className="delete-form-btn" >
       Delete
       </button> 

      <button type="button" className="suspend-form-btn">
        Suspend
      </button> 

    </>
  )}

</div>
        
      </form>  
    </div> 
     </>    
  );      
}
      

    
  
