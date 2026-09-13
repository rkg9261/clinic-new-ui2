import React, { useState, useEffect } from "react";
import "./Services.css";
import Cookies from "js-cookie";

const SERVICE_API =
  "https://clinic-backend-5ucx.onrender.com/api/services";

const CATEGORY_API =
  "https://clinic-backend-5ucx.onrender.com/api/service-categories";

const SUB_CATEGORY_API =
  "https://clinic-backend-5ucx.onrender.com/api/service-sub-categories";

export default function Services() {

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    serviceName: "",
    standardRecharge: "",
    serviceType: "",
    advancedRecharge: "",
    priceSubCategory: "",
    status:"",
  });



  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  //use Effect
useEffect(() => {
  fetchCategories();
  fetchSubCategories();
  fetchServices();
}, []);

//CATEGORY GET API
const fetchCategories = async () => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(
      CATEGORY_API,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setCategories(data.data || []);
    }
  } catch (error) {
    console.log(error);
  }
};

//GET API FOR SUB CATEGORY
const fetchSubCategories = async () => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(
      SUB_CATEGORY_API,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSubCategories(data.data || []);
    }
  } catch (error) {
    console.log(error);
  }
};

//SERVICE GET API
const fetchServices = async () => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(
      SERVICE_API,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(
      "GET Services:",
      data
    );

    if (response.ok) {
      setServices(data.data || []);
    }
  } catch (error) {
    console.log(error);
  }
};


  const handleChange = (e) => {

    const { name, value } = e.target;

    if (
      name === "standardRecharge" ||
      name === "advancedRecharge" ||
      name === "priceSubCategory"
    ) {

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

    if (!formData.category)
      newErrors.category =
        "Category Required";

    if (!formData.subCategory)
      newErrors.subCategory =
        "Sub Category Required";

    if (!formData.serviceName.trim())
      newErrors.serviceName =
        "Service Name Required";

    if (
      formData.serviceName.length > 100
    )
      newErrors.serviceName =
        "Maximum 100 Characters";

    if (!formData.standardRecharge)
      newErrors.standardRecharge =
        "Standard Recharge Required";

    if (!formData.serviceType)
      newErrors.serviceType =
        "Select Service Type";

    if (!formData.advancedRecharge)
      newErrors.advancedRecharge =
        "Advanced Recharge Required";

    if (!formData.priceSubCategory)
      newErrors.priceSubCategory =
        "Prize Sub Category Required";

      if (!formData.status)
      newErrors.status =
        "Select Status";

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };
//handel submit with post and put api
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const token = Cookies.get("token");

    let response;

    const payload = {
      cat_id: formData.category,
      sub_cat_id: formData.subCategory,
      service_name: formData.serviceName,
      service_type: formData.serviceType,
      standard_price:
        formData.standardRecharge,
      advance_price:
        formData.advancedRecharge,
      price_sub_cat_id:
        formData.priceSubCategory,
    };

    if (editId) {
      response = await fetch(
        `${SERVICE_API}/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            payload
          ),
        }
      );
    } else {
      response = await fetch(
        SERVICE_API,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            payload
          ),
        }
      );
    }

    const data =
      await response.json();

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
        ? "Service Updated Successfully"
        : "Service Added Successfully"
    );

    fetchServices();

    setEditId(null);

    setFormData({
      category: "",
      subCategory: "",
      serviceName: "",
      standardRecharge: "",
      serviceType: "",
      advancedRecharge: "",
      priceSubCategory: "",
      status: "",
    });

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
};

//HANDLE EDIT
const handleEdit = (item) => {

  setFormData({
    category: item.cat_id,
    subCategory: item.sub_cat_id,
    serviceName: item.service_name,
    standardRecharge:
      item.standard_price,
    serviceType:
      item.service_type,
    advancedRecharge:
      item.advance_price,
    priceSubCategory:
      item.price_sub_cat_id,
    status:
      Number(item.is_active) === 1
        ? "Active"
        : "Inactive",
  });

  setEditId(item.id);
};


//HANDLE DELETE
 const handleDelete = async (id) => {

  if (
    !window.confirm(
      "Delete Service?"
    )
  )
    return;

  try {

    const token =
      Cookies.get("token");

    const response =
      await fetch(
        `${SERVICE_API}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.message ||
        "Delete Failed"
      );
      return;
    }

    alert(
      "Service Deleted Successfully"
    );

    fetchServices();

  } catch (error) {
    console.log(error);
  }
};

//STATUS PATCH API
const handleStatusChange =
  async (
    id,
    currentStatus
  ) => {

    try {

      const token =
        Cookies.get("token");

      const response =
        await fetch(
          `${SERVICE_API}/${id}/status`,
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
                Number(
                  currentStatus
                ) === 1
                  ? 0
                  : 1,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "PATCH Service:",
        data
      );

      fetchServices();

    } catch (error) {
      console.log(error);
    }
  };


  return (<>
    
    <div className="service-page">

      <div className="service-form">

        <h2>Services</h2>

        <form onSubmit={handleSubmit}>
                
                {/* category */}
          <div className="form-group-services">
            <label>Category</label>

         <select
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="">
    Select Category
  </option>

  {categories.map((cat) => (
    <option
      key={cat.id}
      value={cat.id}
    >
      {cat.cat_name}
    </option>
  ))}
</select>

            <p className="error-services">{errors.category} </p>
          </div>    


          {/* sub category */}
          <div className="form-group-services">
            <label>Sub Category</label>
 
          <select
  name="subCategory"
  value={formData.subCategory}
  onChange={handleChange}
>
  <option value="">
    Select Sub Category
  </option>

  {subCategories.map((sub) => (
    <option
      key={sub.id}
      value={sub.id}
    >
      {sub.sub_category_name}
    </option>
  ))}
</select>

            <p className="error-services">{errors.subCategory}   </p>
          </div>    
         

          <div className="form-group-services">
            <label>Service Name</label>
              
            <input type="text" maxLength="100" name="serviceName"
             value={  formData.serviceName}
             onChange={handleChange} />

            <p className="error-services">
              {errors.serviceName}
            </p>
          </div>

          <div className="form-group-services">
            <label> Standard Service Recharge </label>

            <input type="text" name="standardRecharge"
              value={formData.standardRecharge}
              onChange={handleChange}/>

            <p className="error-services">
              { errors.standardRecharge}
            </p>   
           </div>    
            
          <div className="form-group-services">
            <label>Service Type </label>
            <div className="radio-group-services">

              <label>
                <input  type="radio"  name="serviceType" value="M"
                 checked={ formData.serviceType ==="M"}
                 onChange={handleChange}/>
                  Machine
              </label>    

              <label>
                <input type="radio" name="serviceType"value="T"
                 checked={ formData.serviceType ===  "T"}
                 onChange={handleChange}/>
                 Therapy  
              </label>   
            </div>       

            <p className="error-services"> {errors.serviceType}</p>
         </div>    
            
          <div className="form-group-services">
            <label> Advanced Service Recharge </label>
             
           

            <input  type="text"  name="advancedRecharge"
              value={formData.advancedRecharge}
             onChange={handleChange} />

            <p className="error-services">
              {errors.advancedRecharge}
             </p>    
          </div>

          <div className="form-group-services">
            <label>Prize Sub Category </label>
              
           

            <input type="text" name="priceSubCategory"
              value={   formData.priceSubCategory}
             onChange={handleChange}/>

            <p className="error-services">
              {errors.priceSubCategory}
             </p>     
          </div>    

          <div className="form-group-services">

  <label>Status</label>

  <div className="radio-group-services">

    <label>
      <input
        type="radio"
        name="status"
        value="Active"
        checked={
          formData.status ===
          "Active"
        }
        onChange={handleChange}
      />
      Active
    </label>

    <label>
      <input
        type="radio"
        name="status"
        value="Inactive"
        checked={
          formData.status ===
          "Inactive"
        }
        onChange={handleChange}
      />
      Inactive
    </label>

  </div>

  <p className="error-services">
    {errors.status}
  </p>

</div>
        
          <button   type="submit"  className="save-btn">
          {editId  ? "Update Service" : "Add Service"}
         </button>  
        
        </form>

      </div>

      {services.length > 0 && (

        <div className="table-wrapper-services">

          <table className="table-services">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Service Name</th>
                <th>Type</th>
                <th>Standard</th>
                <th>Advanced</th>
                <th>Prize</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {services.map(
                (item, index) => (
                  <tr key={item.id}>

                    <td>{index + 1}</td>
                  <td>{item.cat_name}</td>
                 <td>{item.sub_category_name}</td>
                 <td>{item.service_name}</td>
                     <td>{item.service_type}</td>
                 <td>₹{item.standard_price}</td>
                <td>₹{item.advance_price}</td>
               <td>{item.price_sub_cat_name}</td>

                {/* Status Column */}
<td>

  <button
    type="button"
    className={
      Number(item.is_active) === 1
        ? "status-active-services"
        : "status-inactive-services"
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


                    <td>

                      <button
                        className="edit-btn-services"
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn-services"
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
    </>
  );
}