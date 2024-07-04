import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    //get
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctor');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };


    fetchDoctors();
  }, []);

  return (
    <div>
      <center>
        <h2>Doctors</h2>
        {
          doctors.map(doctor => (
            <div key={doctor.id}>
              <p><strong>{doctor.name}</strong> - {doctor.speciality}</p>
              <p>Doctor ID: {doctor.id}</p>
            </div>
          ))
        }

      </center>
    </div>
  );
};

export default Doctor;
