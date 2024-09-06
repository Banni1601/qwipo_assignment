import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DeleteUser.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Data } from '../../Context/userContext';
//Component for Support


const DeleteCustomer = () => {
  const { state, setState } = useContext(Data);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (Cookies.get("p_token") === undefined) {
    return navigate("/login");
  }
  let response;
  // Search customer by name or phone number
  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
       response = await axios.get(`https://org-server-br1g.onrender.com/api/customers/search?query=${searchTerm}`);
      if (response.data) {
        await setCustomerData(response.data);
      } else{
        setError('Customer not found');
        setCustomerData(null);
      }
    } catch (err) {
      setError('Customer not found');
    }
  };

  // Handle customer deletion with confirmation
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      console.log(customerData);
      const response = await axios.delete(`https://org-server-br1g.onrender.com/api/deleteuser/:${state.currentUserId}`);
      if (response.status === 200) {
        setMessage('Customer deleted successfully.');
        setCustomerData(null);
        setSearchTerm(''); // Reset the search
      } else {
        setError('Failed to delete the customer.');
      }
    } catch (err) {
      setError('Error deleting customer record.');
    }
  };

  return (
    <div className="delete-customer-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5 p-4 shadow">
              <h2 className="text-center mb-4">Delete Customer Record</h2>
              <form onSubmit={handleSearch}>
                <div className="form-group mb-3">
                  <label>Search by Name or Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mail or phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Search
                </button>
              </form>

              {/* If a customer is found, display the info */}
              {customerData && (
                <div className="customer-info">
                  <h5>Customer Details:</h5>
                  <p>First Name: {customerData.firstName}</p>
                  <p>last Name: {customerData.lastName}</p>
                  <p>Email: {customerData.email}</p>
                  <p>Phone Number: {customerData.phoneNumber}</p>
                  <p>Address: {customerData.address}</p>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleDelete()}
                  >
                    Delete Customer
                  </button>
                </div>
              )}

              {message && <p className="alert alert-success mt-3">{message}</p>}
              {error && <p className="alert alert-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomer;


