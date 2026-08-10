import React, { useEffect, useState } from "react";
import './AddDoctorList.css'
import { BASE_URL } from "../../config/api";
export default function AddDoctorList() {


  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editDoctorId, setEditDoctorId] = useState(null);

  const [editDoctorData, setEditDoctorData] = useState({
    doctor_name: "",
    mobile: "",
    hospital_name: "",
    address: "",
  });

  // ===========================
  // GET TOKEN
  // ===========================

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  // ===========================
  // FETCH DOCTOR LIST
  // ===========================

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/doctor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setDoctorList(data.data);
      } else {
        setDoctorList([]);
      }
    } catch (error) {
      console.log(error);
      setDoctorList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ===========================
  // DELETE api
  // ===========================

 const handleDelete = async (id) => {
  if (!window.confirm("Delete this doctor?")) return;

  try {
    const response = await fetch(
      `${BASE_URL}/api/doctor/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      fetchDoctors();
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
};

  // ===========================
  // EDIT
  // ===========================

  const handleEdit = (doctor) => {
    setEditDoctorId(doctor.id);

    setEditDoctorData({
      doctor_name: doctor.doctor_name,
      mobile: doctor.mobile,
      hospital_name: doctor.hospital_name,
      address: doctor.address,
    });
  };

  // ===========================
  // INPUT CHANGE
  // ===========================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // UPDATE api
  // ===========================

const handleSave = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/doctor/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorName: editDoctorData.doctor_name,
          mobile: editDoctorData.mobile,
          hospitalName: editDoctorData.hospital_name,
          address: editDoctorData.address,
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      alert("Doctor Updated Successfully");
      setEditDoctorId(null);
      fetchDoctors();
    } else {
      alert(data.message || "Update failed");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
};
  // ===========================
  // CANCEL
  // ===========================

  const handleCancel = () => {
    setEditDoctorId(null);
  };

  return (
    <div className="container-doctor-list">
      <div className="content-doctor-list">
        <div className="header-doctor-list">
          <h2 className="heading-doctor-list">
            Doctor List
          </h2>
        </div>

        <div className="table-wrapper-doctor-list">
          <table className="table-doctor-list">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Doctor Name</th>
                <th>Mobile</th>
                <th>Hospital Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    Loading...
                  </td>
                </tr>
              ) : doctorList.length > 0 ? (
                doctorList.map((doctor, index) => (
                  <tr key={doctor.id}>
                    <td>{index + 1}</td>

                    <td>
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="doctor_name"
                          value={
                            editDoctorData.doctor_name
                          }
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.doctor_name
                      )}
                    </td>

                    <td>
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="mobile"
                          value={editDoctorData.mobile}
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.mobile
                      )}
                    </td>

                    <td>
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="hospital_name"
                          value={
                            editDoctorData.hospital_name
                          }
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.hospital_name
                      )}
                    </td>

                    <td>
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="address"
                          value={editDoctorData.address}
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.address
                      )}
                    </td>

                    <td>
                      {editDoctorId === doctor.id ? (
                        <>
                          <button
                            className="save-button-doctor-list"
                            onClick={() =>
                              handleSave(doctor.id)
                            }
                          >
                            Save
                          </button>

                          <button
                            className="cancel-button-doctor-list"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit-button-doctor-list"
                            onClick={() =>
                              handleEdit(doctor)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button-doctor-list"
                            onClick={() =>
                              handleDelete(
                                doctor.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    No Doctor Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}