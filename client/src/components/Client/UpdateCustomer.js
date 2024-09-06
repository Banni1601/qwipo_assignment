import React, { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateCustomer.css'; // For background styling
import { Data } from '../../Context/userContext';

const UpdateCustomer = ({ customerId }) => {
  const { state, setState } = useContext(Data);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch customer data by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`https://org-server-br1g.onrender.com/api/updateuserdata/${state.currentUserId}`);
        setCustomerData(response.data);
      } catch (err) {
        setError('Update Your Details');
      }
    };
    fetchCustomer();
  }, [state.currentUserId]);

  // Validate input fields
  const validateInput = () => {
    const { email, phoneNumber } = customerData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return false;
    }
    if (!phonePattern.test(phoneNumber)) {
      setError('Invalid phone number. It should be 10 digits.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!validateInput()) return;

    try {
      // API call to update customer information
      const response = await axios.put(`https://org-server-br1g.onrender.com/api/updateuserdata/${state.currentUserId}`, customerData);
      if (response.status === 200) {
        setMessage('Customer information updated successfully.');
        alert("Your details are Successfully Updated...")
        setState(i=>({...i,
          currentUserFirstName: response.data.firstName,
              currentUserLastName: response.data.lastName,
              currentUserPhoneNo: response.data.phoneNumber,
              currentUserEmail: response.data.email,
              currentUserAddress: response.data.address,
        }))
        
        setCustomerData({ firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',})
          setTimeout(()=> setMessage("") ,1000);
          
      } else {
        setError('Failed to update customer information.');
      }
    } catch (err) {
      setError('Error updating customer information.');
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <div className="update-customer-page bb">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5 p-4 shadow">
              <h2 className="text-center mb-4">Update Customer Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={customerData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={customerData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={customerData.address}
                    onChange={handleChange}
                    
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </form>

              {message && <p className="alert alert-success mt-3">{message}</p>}
              {error && <p className="alert alert-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
