import React, {useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from '../../Context/userContext';
import "./About.css"
const About = () => {
  // State to hold the list of data from the API
  const [dataList, setDataList] = useState([]);
  const { state, setState } = useContext(Data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API request using Axios
        const response = await axios.get('https://org-server-br1g.onrender.com/api/users');
        setDataList(response.data);  // Store the data in state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);  // Set error message if API call fails
        setLoading(false);
      }
    };

    fetchData();
  },[]);  // Empty dependency array ensures this runs once when the component mounts

  // Display loading, error, or data list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className='aaa'>
      <h1>Data List from API</h1>
      <ul>
        {dataList.map((item) => (
          <li key={item.id}>
            <p>First Name: {item.firstName}</p>
            <p>Last Name: {item.lastName}</p>
            <p>Phone Number: {item.phoneNumber}</p>
            <p>Email Address: {item.email}</p>
            <p>Address: {item.address}</p>
            <p>
            <img src={item.qrCodeUrl}></img>
            <p>Id: {item._id}</p>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
