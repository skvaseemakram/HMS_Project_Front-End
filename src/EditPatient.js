// src/components/EditPatient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatient = ({ patientId, onClose, onUpdate }) => {
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/patient/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data for editing:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/patient/${patientId}`, patientData);
      onUpdate();  // Notify parent to update the list
      onClose();   // Close the edit modal or form
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  return (
    <div>
      <h2>Edit Patient</h2>

      <label>Name: </label>
      <input type="text" name="name" value={patientData.name || ''} onChange={handleChange} />

      <label>Weight: </label>
      <input type="text" name="weight" value={patientData.weight || ''} onChange={handleChange} />

      <label>Gender: </label>
      <input type="text" name="gender" value={patientData.gender || ''} onChange={handleChange} />

      <label>Age: </label>
      <input type="text" name="age" value={patientData.age || ''} onChange={handleChange} />

      <label>Disease: </label>
      <input type="text" name="disease" value={patientData.disease || ''} onChange={handleChange} />

      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPatient;
