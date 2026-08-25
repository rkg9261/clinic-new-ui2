import React,{ useState,useEffect,useRef} from "react";
import "./ClinicSuspended.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config/api";
export default function PreviouslyAddedClinics() {

  const navigate = useNavigate();
 
    //get data 

const [loading, setLoading] =useState(true);
const [clinics, setClinics] = useState([]);
const [editingClinic, setEditingClinic] = useState(null);
const [editData, setEditData] =useState({});
  

const tableRef = useRef(null);

const [isDown, setIsDown] = useState(false);
const [startX, setStartX] = useState(0);
const [scrollLeft, setScrollLeft] = useState(0);
//Suspend Function
// const [statusMap, setStatusMap] = useState({});
//API CALL

useEffect(() => {

  const fetchClinics = async () => {

    try {

          const token = Cookies.get("token");

    console.log("TOKEN:", token);

    if (!token) {

      console.log("No token found in cookies" );
        
      return;

    }

    const response = await fetch(
  `${BASE_URL}/api/clinics`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      console.log("API RESPONSE");
      console.log (data);
      console.log(
        JSON.stringify(
          data,
          null,
          2
        )
      );


      console.log(
        "Clinic List:",
        data
      );

      if (response.ok) {

        if (Array.isArray(data)) {

          setClinics(data);

        } else if (data.data) {

          setClinics(data.data);

        } else if (data.clinics) {

          setClinics(data.clinics);

        }

      } else {

        console.log(
          "API Error:",
          data
        );

      }

    } catch (error) {

      console.log(
        "Fetch Error:",
        error
      );

    }

  };

  fetchClinics();

}, []);

  // IMAGE PREVIEW

  const [previewVisible, setPreviewVisible] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState("");

  // Open Image

  const openImage = (image) => {

    setSelectedImage(image);
    setPreviewVisible(true);
  };

  // EDIT DATA
const handleEdit = (clinic) => {
  navigate("/add-clinic", {
    state: {
      clinic,
      isEdit: true,
    },
  });
};
//  //handle suspend 
//  const handleSuspend = (id) => {
//   setClinicStatus((prev) => ({
//     ...prev,
//     [id]:
//       prev[id] === "Suspended"
//         ? "Active"
//         : "Suspended",
//   }));
// };

//Edit data save
const handleSave = async () => {

  try {

    const token = Cookies.get("token");

    console.log("Updating Clinic ID:", editingClinic);


const response = await fetch(
  `${BASE_URL}/api/clinics/${editingClinic}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: editData.name,
      doctor_name: editData.doctor_name,
      phone: editData.phone,
      email: editData.email,
      state_council_registration_no:
        editData.state_council_registration_no,
      gstin: editData.gstin,
    }),
  }
);

    const data = await response.json();

    console.log("UPDATE RESPONSE:", data);

    if (!response.ok) {

      alert(
        data.message || "Failed to Update Clinic"
      );

      return;
    }

    const updatedClinics = clinics.map(
      (clinic) =>
        clinic.id === editingClinic
          ? {
              ...clinic,
              ...editData,
            }
          : clinic
    );

    setClinics(updatedClinics);

    setEditingClinic(null);

    alert(
      "Clinic Updated Successfully"
    );

  } catch (error) {

    console.log(
      "Update Error:",
      error
    );

    alert("Server Error");

  }
};

  // Delete Clinic

// const handleDelete = (id) => {

//   const confirmDelete =
//     window.confirm(
//       "Are you sure you want to delete this clinic?"
//     );

//   if (!confirmDelete) return;

//   const updatedClinics =
//     clinics.filter(
//       (clinic) => clinic.id !== id
//     );

//   setClinics(updatedClinics);

//   localStorage.setItem(
//     "clinics",
//     JSON.stringify(updatedClinics)
//   );

//   alert(
//     "Clinic deleted successfully."
//   );
// };

//mouse drag
const handleMouseDown = (e) => {

  setIsDown(true);

  setStartX(
    e.pageX - tableRef.current.offsetLeft
  );

  setScrollLeft(
    tableRef.current.scrollLeft
  );
};

const handleMouseLeave = () => {
  setIsDown(false);
};

const handleMouseUp = () => {
  setIsDown(false);
};

const handleMouseMove = (e) => {

  if (!isDown) return;

  e.preventDefault();

  const x =
    e.pageX -
    tableRef.current.offsetLeft;

  const walk =
    (x - startX) * 2;

  tableRef.current.scrollLeft =
    scrollLeft - walk;
};
  return (

    <div className="container-clinic">

                {/* Header */}

      <div className="header-clinic">

        <h1 className="heading-clinic">  SUSPENDED CLINICS</h1>
        
        
           {/* Button add clinic */}

        <button   className="top-add-btn-clinic" onClick={() =>
        navigate("/add-clinic")}> + Add</button>
         </div>
          
                 {/* Clinic List */}

{clinics.length === 0 ? (

  <p className="empty-text-clinic">  No Clinics Added </p>
  ) : (

  <div className="table-container-clinic"   ref={tableRef}
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}>

    <table className="clinic-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Clinic Name</th>
          <th>Doctor</th>
          <th>Phone no</th>
          <th>Email</th>
          <th>Registration</th>
          <th>GSTIN</th>
          <th>Images</th>
          <th>Action</th>
          {/* <th>Status</th> */}
        </tr>
      </thead>

      <tbody>

        {clinics.map((item, index) => (

          <tr key={item.id}>

            <td>{index + 1}</td>
            
            {/* Clinic Name */}

          <td>

{editingClinic === item.id ? (

  <input
    value={editData.name}
    onChange={(e) =>
      setEditData({
        ...editData,
        name: e.target.value,
      })
    } />
 
) : (

  item.name

)}

</td>
                      {/* Doctor name */}
         <td>

{editingClinic === item.id ? (

  <input
    value={editData.doctor_name}
    onChange={(e) =>
      setEditData({
        ...editData,
        doctor_name: e.target.value,
      })
    }
  />

) : (

  item.doctor_name

)}

</td>
            {/* COntact no */}

            <td>

{editingClinic === item.id ? (

  <input
    value={editData.phone}
    onChange={(e) =>
      setEditData({
        ...editData,
        phone: e.target.value,
      })
    }
  />

) : (

   item.phone

)}

</td>
               {/* email */}

            <td>

{editingClinic === item.id ? (

  <input
    value={editData.email}
    onChange={(e) =>
      setEditData({
        ...editData,
        email: e.target.value,
      })
    }
  />

) : (

  item.email

)}

</td>
                  {/* registration no */}

           <td>

{editingClinic === item.id ? (

  <input
    value={editData.state_council_registration_no}
    onChange={(e) =>
      setEditData({
        ...editData,
        state_council_registration_no: e.target.value,
      })
    }
  />

) : (

  item.state_council_registration_no

)}

</td>
                 {/*GSTIN  */}
           <td>

{editingClinic === item.id ? (

  <input
    value={editData.gstin}
    onChange={(e) =>
      setEditData({
        ...editData,
        gstin: e.target.value,
      })
    }
  />

) : (

  item.gstin

)}

</td>
                 {/* Images */}
     <td>
  <div className="table-images">

    {item.logo_file && (
      <div className="image-box">
        <p className="image-title">Logo</p>
        <img
          src={item.logo_file}
          alt="Logo"
          className="small-image"
          onClick={() => openImage(item.logo_file)}
        />
      </div>
    )}

    {item.letterhead_header_file && (
      <div className="image-box">
        <p className="image-title">Header</p>
        <img
          src={item.letterhead_header_file}
          alt="Header"
          className="small-image"
          onClick={() =>
            openImage(item.letterhead_header_file)
          }
        />
      </div>
    )}

    {item.letterhead_footer_file && (
      <div className="image-box">
        <p className="image-title">Footer</p>
        <img
          src={item.letterhead_footer_file}
          alt="Footer"
          className="small-image"
          onClick={() =>
            openImage(item.letterhead_footer_file)
          }
        />
      </div>
    )}

    {item.id_card_background_file && (
      <div className="image-box">
        <p className="image-title">ID Card</p>
        <img
          src={item.id_card_background_file}
          alt="ID Card"
          className="small-image"
          onClick={() =>
            openImage(item.id_card_background_file)
          }
        />
      </div>
    )}
  </div>
</td>
{/* <td>{statusMap[item.id]|| "Active"}</td> */}
 
                      {/* SAVE OR EDIT BUTTON */}
           
<td>

  {editingClinic === item.id ? (

    <button
      className="save-btn-clinic"
      onClick={handleSave}
    >
      Save
    </button>

  ) : (

    <button
      className="edit-btn-clinic"
      onClick={() => handleEdit(item)}
    >
      Edit
    </button>

  )}

  <button
    className="access-btn-clinic"
    onClick={() =>
      navigate(`/clinic-access/${item.id}`)
    }
  >
    Access
  </button>


 
                  {/* DELETE BUTTON */}
{/* <button  className="delete-btn-clinic"  onClick={() =>  handleDelete(item.id) }>
  Delete
</button> */}
             {/*  Suspended button */}

    {/* <button
      className={
        statusMap[item.isSuspended] === "True" //True or 1
          ? "active-btn-clinic"
          : "suspend-btn-clinic"
      }
      onClick={() => handleSuspend(item.id)}
    >
      {statusMap[item.isSuspended] === "True" //True or 1
        ? "Active"
        : "Suspend"}
    </button> */}
 
</td>  
                                     

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

      {/* Image Modal */}
{previewVisible && (

  <div
    className="image-modal-clinic"
    onClick={() =>
      setPreviewVisible(false)
    }
  >

    <div
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <img
        src={selectedImage}
        alt=""
        className="full-image-clinic"
      />

    </div>

  </div>

)}

    </div>
  );
}