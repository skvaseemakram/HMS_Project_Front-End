import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
    doctor: {
      id: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('doctor.')) {
      const key = name.split('.')[1];
      setPatientData((prevData) => ({
        ...prevData,
        doctor: {
          ...prevData.doctor,
          [key]: value,
        },
      }));
    } else {
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...patientData,
        weight: Number(patientData.weight),
        age: Number(patientData.age),
      };
  
      const response = await axios.post('http://localhost:8080/patient', dataToSubmit);
      console.log('Patient created:', response.data);
      setPatientData({
        name: '',
        weight: '',
        gender: '',
        age: '',
        disease: '',
        doctor: {
          id: '',
        }
      });
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error creating patient: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response from the server. Please check your backend.');
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <center>
      <div>
        <h2>Create New Patient</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={patientData.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Weight:
            <input type="text" name="weight" value={patientData.weight} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Gender:
            <input type="text" name="gender" value={patientData.gender} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Age:
            <input type="number" name="age" value={patientData.age} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Disease:
            <input type="text" name="disease" value={patientData.disease} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Doctor ID:
            <input type="number" name="doctor.id" value={patientData.doctor.id} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">Create Patient</button>
        </form>
      </div>
    </center>
  );
};

export default PatientForm;
