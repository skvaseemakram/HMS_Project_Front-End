import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPatient from './EditPatient';

const Home = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [editPatientId, setEditPatientId] = useState(null);

  useEffect(() => {

    const fetchPatientsAndDoctors = async () => {
      try {
        const patientsResponse = await axios.get('http://localhost:8080/patient'); // Replace with your actual endpoint
        const doctorsResponse = await axios.get('http://localhost:8080/doctor'); // Replace with your actual endpoint
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPatientsAndDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const selectedDoctorId = parseInt(event.target.value);
    setSelectedDoctorId(selectedDoctorId);
  };

  const filteredPatients = selectedDoctorId
    ? patients.filter(patient => patient.doctor?.id === selectedDoctorId)
    : patients;

  const handleEdit = (patientId) => {
    setEditPatientId(patientId);
  };

  const handleCloseEdit = () => {
    setEditPatientId(null);
  };

  const handleUpdate = () => {
    setEditPatientId(null);
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://localhost:8080/patient/${patientId}`);

      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <center>
      <div>
        <h2>Patients</h2>
        <label>Select Doctor: </label>
        <select onChange={handleDoctorChange}>
          <option value={null}>All Doctors</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.speciality}
            </option>
          ))}
        </select>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Disease</th>
              <th>Doctor</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.weight}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.disease}</td>
                <td>
                  {patient.doctor?.name} - {patient.doctor?.speciality}
                </td>
                <td>
                  <button onClick={() => handleEdit(patient.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editPatientId !== null && (
          <EditPatient
            patientId={editPatientId}
            onClose={handleCloseEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </center>
  );
};

export default Home;
