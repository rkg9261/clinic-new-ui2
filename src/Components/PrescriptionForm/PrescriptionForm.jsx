import React, { useState } from "react";
import "./PrescriptionForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


export default function PrescriptionForm() {
const navigate = useNavigate();
const location = useLocation();

const patient = location.state?.patient || null;
const patientName =
  patient?.name ||
  patient?.full_name ||
  "Unknown Patient";

const patientCode =
  patient?.patientCode ||
  patient?.patient_code ||
  "-";

const fileNo =
  patient?.fileNo ||
  patient?.file_number ||
  "-";

const [formData, setFormData] = useState({
  // Patient Details
  name: patient?.name || patient?.full_name || "",
  age: patient?.age || "",
  gender: patient?.gender || patient?.sex || "",
  address: patient?.address || "",
  dateTime: "",
  cc: "",
  otherDetails: "",
  examination: "",
  inInv: "",
  diagnosis: "",
  advice: "",

  // Treatment
  frequency: "",
  duration: "",
  treatmentDurationNote: "",
  standardPhysioAtHome: "",
  customizedHomeTreatmentPlan: "",

  // X-Ray
  cervicalSpine: false,
  lumbarSpine: false,
  thoracicSpine: false,
  wholeSpine: false,
  xrayOther: false,

  // Pathology
  cbc: false,
  esr: false,
  crp: false,
  uricAcid: false,
  raFactor: false,
  anaElisa: false,
  hlaB27: false,
  rbs: false,
  hbA1c: false,
  vitaminD25Hydroxy: false,
  vitaminB12: false,
  urineExamination: false,
  electrolyteProfile: false,
  tft: false,
  lft: false,
  kft: false,
  lipidProfile: false,
  pathologyOther: false,

  // Standard Modalities
thermoTherapy: false,
therapeuticUltrasound: false,
tens: false,
ift: false,
rct: false,
nmes: false,
traction: false,
cpm: false,
electroMassage: false,
paraffinWax: false,
irrBulb: false,

// Advance Modalities
pemf: false,
terahertz: false,
shockwave: false,
laserTherapy: false,
pmst: false,

// Therapeutic Services
romExercises: false,
stretchingExercises: false,
strengtheningExercises: false,
functionalMobility: false,
injuryPrevention: false,
spineCurveRestoration: false,
scoliosisCorrection: false,
deformityCorrection: false,
facialExercises: false,
postureBalanceGait: false,
mfrIastmJoint: false,

// Additional Services
cuppingTherapy: false,
kinesioTaping: false,
splintingSupportive: false,
coldCompression: false,
personalizedHomeTreatment: false,
});

 const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};


  const handleSubmit = (e) => {
  e.preventDefault();

  console.log(
    "========== PRESCRIPTION DATA =========="
  );

  console.table(formData);

  console.log(
    JSON.stringify(formData, null, 2)
  );

  alert("Prescription Saved Successfully");
};



  return (
    <>
  
    
    <div className="prescription-container">
      
<FaTimes
  className="close-icon-prescription"
  onClick={() => {
    navigate("/homepage", {
      state: {
        openPatientPopup: true,
        patient,
      },
    });
  }}
/>
          
     <div className="prescription-patient-header">

  <h2>{patientName}</h2>

  <div className="prescription-patient-details">

    <span>
      <strong>File No:</strong> {fileNo}
    </span>

    <span>
      <strong>Patient Code:</strong> {patientCode}
    </span>

  </div>

  <h1>PHYSICAL THERAPY PRESCRIPTION</h1>

</div>
        
       <form onSubmit={handleSubmit}>
       <div className="top-section">

                           {/* LEFT SIDE */}

          <div className="left-side">
            <h3>Inv. Req.</h3>

                       {/* X-RAY */}

            <h4>X-Ray</h4>
           <label>
             <input  type="checkbox"  name="cervicalSpine" checked={formData.cervicalSpine} 
             onChange={handleChange}  /> Cervical Spine - AP./Lat. View
            </label>   
             
           <label>
           <input  type="checkbox"  name="lumbarSpine" checked={formData.lumbarSpine}
           onChange={handleChange}/> Lumbar Spine - AP./Lat. View
          </label>
   
  
          <label>
          <input  type="checkbox" name="thoracicSpine"  checked={formData.thoracicSpine}
          onChange={handleChange}/> Thoracic Spine - AP./Lat. View
         </label>  
  

         <label>
        <input  type="checkbox"  name="wholeSpine" checked={formData.wholeSpine}
         onChange={handleChange} /> Whole Spine - AP./Lat. View
         </label>
   
  
        <label>
        <input type="checkbox" name="xrayOther" checked={formData.xrayOther}
         onChange={handleChange}/> Other
        </label>   
         <hr />
    
                     {/* X-RAY & CT SCAN CALL */}

            <p> <b>For X-Ray & CT Scan Call</b> </p>
            <p> Advance X-Ray Lab:9675691004</p>
             
                       {/* Pathology Checkbox */}

               <h4>Pathology</h4>

           <label>
           <input type="checkbox"  name="cbc" checked={formData.cbc}
             onChange={handleChange}/>CBC
           </label>
   

          <label>
           <input  type="checkbox"  name="esr" checked={formData.esr}
            onChange={handleChange} />ESR
          </label>  
   
   
        <label>
        <input type="checkbox"  name="crp"  checked={formData.crp}
         onChange={handleChange} /> CRP
        </label>  
  

       <label>
       <input type="checkbox" name="uricAcid" checked={formData.uricAcid}
         onChange={handleChange} /> Uric Acid
       </label>   
   
   
       <label>
      <input type="checkbox" name="raFactor" checked={formData.raFactor}
       onChange={handleChange} /> RA Factor
      </label>   
   

     <label>
     <input  type="checkbox"  name="anaElisa"  checked={formData.anaElisa}
      onChange={handleChange} /> ANA Elisa
    </label>  
  
    
     <label>
      <input type="checkbox" name="hlaB27" checked={formData.hlaB27}
        onChange={handleChange}/>HLA B27
     </label>   
   

       <label>
       <input  type="checkbox" name="rbs" checked={formData.rbs}
        onChange={handleChange} />RBS
      </label>   
   
  
      <label>
       <input type="checkbox" name="hbA1c" checked={formData.hbA1c}
           onChange={handleChange}/>HbA1c
       </label>   
   
       <label>
          <input type="checkbox" name="vitaminD25Hydroxy" checked={formData.vitaminD25Hydroxy} onChange={handleChange}/> Vitamin D25 Hydroxy
      </label>
  
      <label>
     <input type="checkbox" name="vitaminB12" checked={formData.vitaminB12}
          onChange={handleChange}/> Vitamin B12
         </label>  

      <label>
      <input type="checkbox"  name="urineExamination"  checked={formData.urineExamination} onChange={handleChange}/> Urine Examination
        </label>  
  
       <label>
          <input  type="checkbox" name="electrolyteProfile" checked={formData.electrolyteProfile} onChange={handleChange} /> Electrolyte Profile
       </label>  
   
       <label>
         <input type="checkbox" name="tft" checked={formData.tft}
        onChange={handleChange}/> TFT (Thyroid)
         </label>   


      <label>
      <input  type="checkbox" name="lft" checked={formData.lft} onChange={handleChange}/> LFT (Liver)
       </label> 
  
      <label>
      <input type="checkbox"  name="kft"  checked={formData.kft}
        onChange={handleChange}  /> KFT (Kidney)
        </label> 
  
       <label>
      <input type="checkbox"  name="lipidProfile" checked={formData.lipidProfile}
       onChange={handleChange}/>Lipid Profile
      </label>  
   

       <label>
     <input  type="checkbox" name="pathologyOther" checked={formData.pathologyOther}
    onChange={handleChange}/>  Other
     </label>   
    <hr />
  
                    {/* Samole Collection Contact */}

            <p><b> For Sample Collection Call</b> </p>
            <p> Mr. Abhay Gothwal </p>
            <p> 7055360155</p>
             
                   {/* Sample Collection Contact */}
            <h4>  On-Site Treatment Charges </h4>
            <table>
              <thead>
                <tr>
                  <th>Sessions</th>
                  <th>Standard</th>
                  <th>Advance</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>300</td>
                  <td>450</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>1380</td>
                  <td>2025</td>
                </tr>

                <tr>
                  <td>20</td>
                  <td>4800</td>
                  <td>6300</td>
                </tr>
              </tbody>
            </table>

             {/* Standard Physio at Home */}

            <div className="field">
              <label>Standard Physio at Home</label>
              <input type="text" placeholder="750"  name="standardPhysioAtHome" value={formData.standardPhysioAtHome} onChange={handleChange}  />
               </div> 
               
             
              {/*  Customized Home Treatment Plan */}

            <div className="field">
              <label> Customized Home Treatment Plan</label>
                <textarea rows="3" name="customizedHomeTreatmentPlan" value={formData.customizedHomeTreatmentPlan} onChange={handleChange} />
             </div>  

            <p className="note">  Charges vary according to patient condition. </p>
      </div>
              
                          {/* RIGHT SIDE */}

          <div className="right-side">

                    {/* NAME */}
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" value={formData.name || ""}
              onChange={handleChange}/>
            </div>

                 {/* AGE */}
            <div className="field">
              <label>Age</label>
              <input type="number" name="age" value={formData.age}
              onChange={handleChange} />
            </div>

                {/* GENDER */}
            <div className="field">
              <label>Gender</label>
              <select name="gender" value={formData.gender || ""}
              onChange={handleChange}>
                <option value= "">Select</option>
                <option value= "Male">Male</option>
                <option  value= "Female">Female</option>
              </select>
            </div>
            
                   {/* ADDRESS */}
            <div className="field">
              <label>Address</label>
              <input type="text"  name="address" value={formData.address}
              onChange={handleChange} />
            </div>
                
                 {/*DATE & TIME */}
            <div className="field">
              <label>Date & Time</label>
              <input type="datetime-local" name="dateTime" value={formData.dateTime || ""}
              onChange={handleChange} />
             </div>   
             
                    {/* C/CO*/}
            <div className="field">
              <label>C/Co</label>
              <textarea rows="2" name="cc"  value={formData.cc || ""}
              onChange={handleChange}/>
            </div>

                    {/* OTHER DETAILS */}
                  
            <div className="field">
              <label>Other Details</label>
              <textarea rows="2" placeholder="No Specific H/o injury Present related to current illness." name="otherDetails" value={formData.otherDetails || ""}
              onChange={handleChange}/>
            </div>

                    {/* EXAMINATION */}
              
            <div className="field">
              <label>Examination</label>
              <textarea rows="2" name="examination" value={formData.examination}
              onChange={handleChange} />
            </div>

                    {/*IN Inv  */}
           
            <div className="field">
              <label>In Inv.</label>
              <textarea rows="2"  name="inInv" value={formData.inInv}
              onChange={handleChange}/>
            </div>
            
                    {/*DIAGNOSIS  */}
                    
            <div className="field">
              <label>Diagnosis</label>
              <textarea rows="2" name="diagnosis" value={formData.diagnosis}
              onChange={handleChange} />
            </div>
                  
                    {/*ADVICE  */}

            <div className="field">
              <label>Advice / Note</label>
              <textarea rows="2"  name="advice" value={formData.advice}
              onChange={handleChange}/>
            </div>
                 
                    {/*Physiotherapy Rx CHECKBOX  */}

            <h3>Physiotherapy Rx</h3>
            <div className="checkbox-sections">

                        {/* Standard Modalities */}

            <div>
          <h4>Standard Treatment Modalities</h4>

     <label>
      <input  type="checkbox"  name="thermoTherapy" checked={formData.thermoTherapy}
     onChange={handleChange}/> ThermoTherapy Hot / Cold
    </label>  
     
      <label>
      <input type="checkbox"  name="therapeuticUltrasound" checked={formData.therapeuticUltrasound} onChange={handleChange} /> Therapeutic Ultrasound (US)    
    </label>   

        <label>
       <input  type="checkbox" name="tens" checked={formData.tens}
      onChange={handleChange}/>  Nerve Stimulation (TENS)
        </label>  

        <label>
        <input  type="checkbox"  name="ift"  checked={formData.ift}
      onChange={handleChange} /> Interferential Therapy (IFT)
         </label>  
  

       <label>
     <input  type="checkbox"  name="rct"  checked={formData.rct}
      onChange={handleChange} /> Russian Current Therapy (RCT)
     </label>  
    
     <label>
       <input  type="checkbox" name="nmes"  checked={formData.nmes}
        onChange={handleChange} />  Muscular Stimulation (NMES)
     </label>   
  
     <label>
     <input  type="checkbox"  name="traction" checked={formData.traction}
     onChange={handleChange} />Traction Cervical / Lumbar / Knee
      </label>   
     
       <label>
       <input   type="checkbox" name="cpm" checked={formData.cpm}
        onChange={handleChange}/>  Continuous Passive Motion (CPM) - Knee
        </label>   
    
          <label>
           <input type="checkbox"  name="electroMassage"  checked={formData.electroMassage} onChange={handleChange}/>  Electro Massage - Thera Gun / G-10
          </label>   

        <label>
        <input type="checkbox" name="paraffinWax" checked={formData.paraffinWax}
         onChange={handleChange}/>Paraffin Wax Therapy
        </label>  
    
         <label>
          <input type="checkbox" name="irrBulb"  checked={formData.irrBulb}
          onChange={handleChange}/>IRR Bulb Therapy
         </label>
         </div>
    
                         {/* Advance Modalities */}

           <div>
           <h4>Advance Treatment Modalities</h4>

          <label>
         <input type="checkbox" name="pemf" checked={formData.pemf}
           onChange={handleChange}/>Pulsed Electro Magnetic Field (PEMF)
         </label>  
     
         <label>
         <input  type="checkbox" name="terahertz" checked={formData.terahertz}
          onChange={handleChange} /> Terahertz Therapy (THz)
          </label>   
    
         <label>
         <input type="checkbox" name="shockwave" checked={formData.shockwave}
        onChange={handleChange}/>Shockwave Therapy (ESWT)
        </label>   
    
        <label>
        <input type="checkbox" name="laserTherapy" checked={formData.laserTherapy}
       onChange={handleChange} /> LASER Therapy - Class III (LLLT)
        </label>   
  
         <label>
         <input  type="checkbox" name="pmst" checked={formData.pmst}
           onChange={handleChange}/> Physio Magneto (PMST with NRIS)
         </label>    
  </div>   
    
                       {/* Therapeutic CHECKBOX*/}

              <div>
            <h4>Therapeutic Services</h4>

        <label>
        <input type="checkbox" name="romExercises" checked={formData.romExercises}
         onChange={handleChange}/>ROM Exercises
          </label>   
  
       <label>
        <input  type="checkbox" name="stretchingExercises"  checked={formData.stretchingExercises} onChange={handleChange}/>Stretching Exercises
       </label>  
    
        <label>
       <input type="checkbox" name="strengtheningExercises" checked={formData.strengtheningExercises}  onChange={handleChange}/> Strengthening Exercises
      </label>   
     
     <label>
        <input  type="checkbox"  name="functionalMobilityTraining" checked={formData.functionalMobilityTraining} onChange={handleChange} /> Functional Mobility Training
       </label> 
  
     <label>
        <input type="checkbox"  name="injuryPreventionTraining" checked={formData.injuryPreventionTraining} onChange={handleChange}/> Injury Prevention Training
     </label>   
  
        <label>
        <input type="checkbox" name="spineCurveRestoration"  checked={formData.spineCurveRestoration} onChange={handleChange}/> Spine Curve Restoration
     </label>
    
     <label>
     <input  type="checkbox"  name="scoliosisCorrection"  checked={formData.scoliosisCorrection} onChange={handleChange}/>Scoliosis Correction
      </label>  
  
       <label>
      <input type="checkbox" name="deformityCorrection" checked={formData.deformityCorrection} onChange={handleChange} /> Deformity Correction
        </label>   


       <label>
     <input  type="checkbox" name="facialExercises"  checked={formData.facialExercises}  onChange={handleChange} /> Facial Exercises
    </label>  
    
       <label>
       <input  type="checkbox" name="postureBalanceGaitTraining" checked={formData.postureBalanceGaitTraining} onChange={handleChange}/>
       Posture / Balance / Gait Training
       </label>   
     
       <label>
        <input type="checkbox"  name="mfrIastmJointMobilization"
        checked={formData.mfrIastmJointMobilization}  onChange={handleChange}/>
       MFR / IASTM / Joint Mobilization
      </label>  
   </div> 
  
                     {/* Add On CHECKBOX*/}

           <div>
            <h4>Additional Add-On Services</h4>

      <label>
       <input  type="checkbox" name="cuppingTherapy" checked={formData.cuppingTherapy}
      onChange={handleChange}/>Cupping Therapy - Dry/Wet/Massage
      </label>  

        <label>
        <input type="checkbox"  name="kinesioTaping"   checked={formData.kinesioTaping}
      onChange={handleChange} />  Kinesio Taping / Pain Patch
       </label>  

       <label>
        <input type="checkbox"  name="splintingSupportive" checked={formData.splintingSupportive} onChange={handleChange} /> Splinting Supportive / Corrective
       </label>   
    
     <label>
     <input type="checkbox"  name="coldCompressionTherapy"
        checked={formData.coldCompressionTherapy} onChange={handleChange} />
      Cold Compression Therapy (Cryotherapy)
     </label>  
     
      <label>
        <input type="checkbox" name="personalizedHomeTreatmentPlanAddon"
       checked={formData.personalizedHomeTreatmentPlanAddon} onChange={handleChange}/>  Personalized Home Treatment Plan
     </label>
     </div>
</div>  
   
                        {/*Frequency Input*/}

            <div className="bottom-box">
              <div>
                <label> Frequency  </label>
                <input placeholder="5-6 times/week" name="frequency" value={formData.frequency} onChange={handleChange} />
              </div>    
              
              <div>
                <label>  Duration  </label>
                <input placeholder="4 weeks" name="duration" value={formData.duration} onChange={handleChange} />
              </div>   
            </div>   
            
            <div className="field">
              <label> Treatment Duration Note </label>
           <textarea rows="2" name="treatmentDurationNote" value={formData.treatmentDurationNote}  onChange={handleChange}
            placeholder="Treatment duration mentioned above is approximate & subject to change."/>
          </div>

            <button  type="submit"  className="save-btn" >
            Save Prescription
             </button>
           </div>   
           </div>
       </form>
    </div>
    </>
  );
}