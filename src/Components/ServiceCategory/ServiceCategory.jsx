import React, { useState, useEffect } from "react";
import "./ServiceCategory.css";

import Cookies from "js-cookie";

const BASE_URL =
  "https://clinic-backend-5ucx.onrender.com/api/service-categories";

export default function ServiceCategory() {

  const [categoryName, setCategoryName] = useState("");
  const [categoryFee, setCategoryFee] = useState("");
  const [status, setStatus]=useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  //Get api
useEffect(() => {

  fetchCategories();

}, []);

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

    console.log("GET Categories:", data);

    if (response.ok) {

      if (Array.isArray(data)) {

        setCategories(data);

      } else if (data.data) {

        setCategories(data.data);

      }

    }

  } catch (error) {

    console.log(error);

  }

};

//form validatation
  const validateForm = () => {
    let newErrors = {};

    if (!categoryName.trim()) {
      newErrors.categoryName =
        "Category Name is required";
    }

    if (categoryName.length > 100) {
      newErrors.categoryName =
        "Maximum 100 characters allowed";
    }

    if (!categoryFee) {
 newErrors.categoryFee =
  "Category Fee is required";
} else if ( !/^\d+(\.\d{1,2})?$/.test(categoryFee)) 
{newErrors.categoryFee ="Only 2 decimal places allowed";}

     if (!status) {
      newErrors.status = "Select Status";
     }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //API CALLING ADDING DATA
 
const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  try {

    const token = Cookies.get("token");

    let response;

    if (editId) {

      response = await fetch(
        `https://clinic-backend-5ucx.onrender.com/api/service-categories/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cat_name: categoryName,
            category_fee: categoryFee,
          }),
        }
      );

    } else {

      response = await fetch(
        "https://clinic-backend-5ucx.onrender.com/api/service-categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cat_name: categoryName,
            category_fee: categoryFee,
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
        ? "Category Updated Successfully"
        : "Category Added Successfully"
    );

    setCategoryName("");
    setCategoryFee("");
    setStatus("");
    setEditId(null);

    fetchCategories();

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};

  //EDIT FUNCTION 
 const handleEdit = (item) => {

  setCategoryName(
    item.cat_name
  );

  setCategoryFee(
    item.category_fee
  );

  setStatus(
    item.status || "Active"
  );

  setEditId(item.id);

};

  //DELETE FUNCTION
  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure?"
    );

  if (!confirmDelete) return;

  try {

    const token = Cookies.get("token");

    const response = await fetch(
      `https://clinic-backend-5ucx.onrender.com/api/service-categories/${id}`,
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
      "Category Deleted Successfully"
    );

    fetchCategories();

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};

//Status change

const handleStatusChange = async (
  id,
  currentStatus
) => {
     console.log("Function Called");
  console.log("ID:", id);
  console.log("Status:", currentStatus);
  
  try {

    const token = Cookies.get("token");

    const response = await fetch(
      `https://clinic-backend-5ucx.onrender.com/api/service-categories/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      "PATCH Response:",
      data
    );

    if (!response.ok) {

      alert(
        data.message ||
        "Status Update Failed"
      );

      return;

    }

    await fetchCategories();

  } catch (error) {

    console.log(error);

  }

};

  return (<>
  
    <div className="service-page-category">

      <div className="service-card-category">

        <h2> Service Category </h2>
        
                {/* Category Form */}

        <form onSubmit={handleSubmit}>
          <div className="form-group-category">
              
              {/* Category name */}
            <label>  Category Name </label>  
     <input  type="text" maxLength="100" placeholder="Enter Category Name"
     value={ categoryName}  onChange={(e) => setCategoryName( e.target.value)} />
             
         {errors.categoryName && (
              <p className="error">
                { errors.categoryName }
               </p> )}  
           </div>    
         
           
             {/* category fee */}
          <div className="form-group-category">  
              <label> Category Fee </label>
           <input  type="number"  step="0.01" min="0" placeholder="Enter Fee"
           value={categoryFee} onChange={(e) => { const value = e.target.value;

           if ( value === "" ||  /^\d+(\.\d{0,2})?$/.test(value)
           ) {setCategoryFee(value);}
        }}/>

            {errors.categoryFee && (
              <p className="error-category"> { errors.categoryFee }</p>)}
            </div>   
                  
                  
                  {/* Status */}
            <div className="form-group-category">
           <label>Status</label>
            <div className="radio-group-category">

           <label>
          <input  type="radio"  name="status"  value="Active"
           checked={ status === "Active"}
           onChange={(e) => setStatus( e.target.value) }/>
            Active
           </label>
       
         
           <label>  
             <input type="radio" name="status"  value="Inactive"
                checked={ status === "Inactive"}
               onChange={(e) => setStatus(e.target.value) }/>
              Inactive
              </label>
     </div>    
      
          {errors.status && (
          <p className="error-category">
            {errors.status}
           </p>
           )}

    </div>
          {/* ADD BUTTON */}
        <button  type="submit"  className="add-btn-category">
           {editId ? "Update Category" : "Add Category"}
        
          </button>    
        </form>
      </div>
       
    
                {/*  Form Table  */}

      {categories.length >
        0 && (
        <div className="table-card-category">

          <h3>  Added Categories</h3>
          <div className="table-wrapper-category">

            <table>

              <thead>
                <tr>
                  <th> S.No </th>
                  <th>Category Name</th>
                  <th> Category Fee </th>
                  <th>Status</th>
                  <th> Action </th>
                </tr>
              </thead>

              <tbody>

                {categories.map(
                  (
                    item,
                    index
                  ) => (
                       <tr  key={ item.id}>
                      <td>  {index +1}  </td>
                      <td> { item.cat_name}</td>  
                      <td>₹{ item.category_fee }</td>
          
          {/* status button */}

    <td>
  <button
    type="button"
    className={
      Number(item.is_active) === 1
        ? "status-active-category"
        : "status-inactive-category"
    }
    onClick={() => {
      console.log("Button Clicked");
      console.log("ID:", item.id);
      console.log("Current Status:", item.is_active);

      handleStatusChange(
        item.id,
        item.is_active
      );
    }}
  >
    {Number(item.is_active) === 1
      ? "Active"
      : "Inactive"}
  </button>
</td>
 
        {/* Edit Button */}
     <td className="action-cell-category">
     <button  className="edit-btn-category" onClick={() => handleEdit(item)}>
       Edit
     </button> 
  
           {/* Delete Button */}
  <button  className="delete-btn-category" onClick={() => handleDelete(item.id)} >
  Delete
  </button> 
 </td>
    </tr>
  )

 )}                    
</tbody>                  
</table>               
</div>
</div>              
)}
            
    </div>
    </>
  );
}
          

        
      

