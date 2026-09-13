import React, { useState, useEffect } from "react";
import "./ServicesSubCategory.css";

import Cookies from "js-cookie";


//BASE URL
const BASE_URL =
  "https://clinic-backend-5ucx.onrender.com/api/service-sub-categories";

export default function ServicesSubCategory() {

  const [formData, setFormData] = useState({
    category: "",
    subCategoryName: "",
    subCategoryFee: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);

 
  //ADD GET API
useEffect(() => {

  fetchSubCategories();

  fetchCategories();

}, []);


//fetch sub categories
const fetchSubCategories = async () => {
  try {

    const token = Cookies.get("token");

    const response = await fetch(
      BASE_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("GET Sub Categories:", data);

    if (response.ok) {

      if (Array.isArray(data)) {
        setSubCategories(data);
      } else if (data.data) {
        setSubCategories(data.data);
      }

    }

  } catch (error) {
    console.log(error);
  }
};

//fatch categories 
const fetchCategories = async () => {

  try {

    const token = Cookies.get("token");

    const response = await fetch(
      "https://clinic-backend-5ucx.onrender.com/api/service-categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(
      "Category API:",
      data
    );

    if (response.ok) {

      if (Array.isArray(data)) {

        setCategoriesList(data);

      } else if (data.data) {

        setCategoriesList(data.data);

      }

    }

  } catch (error) {

    console.log(error);

  }

};


//handle change
  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "subCategoryFee") {

      if (
        value === "" ||
        /^\d+(\.\d{0,2})?$/.test(value)
      ) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.category) {
      newErrors.category =
        "Category is required";
    }

    if (!formData.subCategoryName.trim()) {
      newErrors.subCategoryName =
        "Select Status";
    }

       if (!formData.status) {
      newErrors.status =
        "Sub Category Name is required";
    }

    if (
      formData.subCategoryName.length > 100
    ) {
      newErrors.subCategoryName =
        "Maximum 100 characters allowed";
    }

    if (!formData.subCategoryFee) {
      newErrors.subCategoryFee =
        "Fee is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  try {

    const token = Cookies.get("token");

    let response;

    if (editId) {

      response = await fetch(
        `${BASE_URL}/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            category_id: formData.category,
            sub_category_name:
              formData.subCategoryName,
            sub_category_fee:
              formData.subCategoryFee,
          }),
        }
      );

    } else {

      response = await fetch(
        BASE_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            category_id: formData.category,
            sub_category_name:
              formData.subCategoryName,
            sub_category_fee:
              formData.subCategoryFee,
          }),
        }
      );

    }

    const data = await response.json();

    console.log(data);

    if (!response.ok) {

      alert(
        data.message ||
        "Operation Failed"
      );

      return;
    }

    alert(
      editId
        ? "Updated Successfully"
        : "Added Successfully"
    );

    setFormData({
      category: "",
      subCategoryName: "",
      subCategoryFee: "",
      status: "",
    });

    setEditId(null);

    fetchSubCategories();

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};

//HANDLE EDIT
 const handleEdit = (item) => {

  setFormData({
    category:
      item.category_id,
    subCategoryName:
      item.sub_category_name,
    subCategoryFee:
      item.sub_category_fee,
    status:
      Number(item.is_active) === 1
        ? "Active"
        : "Inactive",
  });

  setEditId(item.id);

};


//HANDLE DELETE
const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure?"
    );

  if (!confirmDelete) return;

  try {

    const token =
      Cookies.get("token");

    const response = await fetch(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data =
      await response.json();

    console.log(data);

    if (!response.ok) {

      alert(
        data.message ||
        "Delete Failed"
      );

      return;
    }

    alert(
      "Deleted Successfully"
    );

    fetchSubCategories();

  } catch (error) {

    console.log(error);

  }

};

// STATUS CHANGE  Patch api 
const handleStatusChange = async (
  id,
  currentStatus
) => {

  try {

    const token =
      Cookies.get("token");

    const response =
      await fetch(
        `${BASE_URL}/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            is_active:
              Number(currentStatus) === 1
                ? 0
                : 1,
          }),
        }
      );

    const data =
      await response.json();

    console.log(
      "PATCH:",
      data
    );

    fetchSubCategories();

  } catch (error) {

    console.log(error);

  }

};

  return (<>


    <div className="sub-page">

      <div className="sub-form-card">

        <h2>Services Sub Category </h2>
          
                {/* Form */}
 
        <form onSubmit={handleSubmit}>

          <div className="form-group-sub-category">

            <label>Category</label>
         <select
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="">
    Select Category
  </option>

  {categoriesList.map((cat) => (

    <option
      key={cat.id}
      value={cat.id}
    >
      {cat.cat_name}
    </option>

  ))}

</select>   
             {errors.category && (
              <p className="error-text-sub-category">
                {errors.category}
              </p>
            )}

          </div>  

                    {/* Sub Category Name */}
          <div className="form-group-sub-category">
            <label> Sub Category Name</label>
            <input type="text"  name="subCategoryName"
               maxLength="100" placeholder="Enter Sub Category Name"
              value={ formData.subCategoryName}
              onChange={handleChange}  />

            {errors.subCategoryName && (
              <p className="error-text-sub-category">
                { errors.subCategoryName }
               </p>)}   
            </div>   
             
                  {/* Sub Category Fee */}
          <div className="form-group-sub-category">
            <label>Sub Category Fee</label>
            <input  type="text"  name="subCategoryFee"
              placeholder="Enter Fee" value={ formData.subCategoryFee  }
             onChange={handleChange} />
            {errors.subCategoryFee && (
              <p className="error-text-sub-category">
                { errors.subCategoryFee}
              </p> )}  
            </div>     
                
                   {/* Sub Category status */}
        
          <div className="form-group-sub-category">

           <label>Status</label>
          <div className="radio-group-sub-category">
 

    <label>  <input  type="radio"  name="status"
     value="Active"  checked={formData.status === "Active"}
       onChange={handleChange}/> Active</label>
      
        
       <label>
      <input type="radio"  name="status"  value="Inactive"
        checked={formData.status === "Inactive"} onChange={handleChange}/>
       Inactive
    </label>  
   </div>     
          {errors.status && (
       <p className="error-text-sub-category">
         {errors.status}
       </p>)}
  </div>
       
                {/* Submit button*/}
     
     <button  type="submit"  className="save-btn-sub-category">
           {editId  ? "Update Sub Category" : "Add Sub Category"}
          </button>
        </form>  
 </div>

     
                   {/* Data Table */}
      {subCategories.length > 0 && (

        <div className="table-card-sub-category">

          <h3> Added Sub Categories</h3>
          <div className="table-wrapper-sub-category">

            <table className="table-sub-category">

              <thead>

                <tr>
                  <th>S.No</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {subCategories.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td> {index + 1}</td>
                      <td>{item.category_name}</td>
                      <td>{item.sub_category_name }</td>
                      <td>   ₹{item.sub_category_fee}</td>

                      {/* submit button */}
          <td>
  <button
    type="button"
    className={
      Number(item.is_active) === 1
        ? "status-active-sub-category"
        : "status-inactive-sub-category"
    }
    onClick={() =>
      handleStatusChange(
        item.id,
        item.is_active
      )
    }
  >
    {Number(item.is_active) === 1
      ? "Active"
      : "Inactive"}
  </button>
</td>


                <td className="action-cell-sub-category">
                     
                        <button  className="edit-btn-sub-category"
                        onClick={() => handleEdit(item)}>Edit
                        </button>

                        <button  className="delete-btn-sub-category"
                         onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>   
                           
                         </td>   
                    </tr>      
                   ) )}      
              </tbody>           

            </table>

          </div>

        </div>

      )}

    </div>
    </>
  );
}