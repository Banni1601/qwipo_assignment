import React ,{useContext} from 'react'
import { Data } from '../../Context/userContext'
import "./Account.css"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
 import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"


// display for LoggedIn User data
const User = () => {

  const { state}=useContext(Data);
  const navigate = useNavigate();
  if (Cookies.get("p_token") === undefined) {
    return navigate("/login"); // navigate to the Login Page
  }
      
  return(
    
    <div className="profile-container mt-5">
      

      <div className="profile-info aaaaa">
        <h1>Customer Details</h1>
        <h1>first Name: {state.currentUserFirstName}</h1>
        <p><strong>last Name:</strong> {state.currentUserLastName}</p>
        <p><strong>Phone number:</strong> {state.currentUserPhoneNo}</p>
        <p><strong>Email:</strong> {state.currentUserEmail}</p>
        <p><strong>Address:</strong> {state.currentUserAddress}</p>
        <img src={state.currentUserQrCodeURL} alt="QR Code" className="qr-code" />
        <p>Your Id: {state.currentUserId}</p>
      </div>
    </div>
    

  )
}


//return the User Component
function Account() {
  return (
    <div>
      {<User/>}
    </div>
  )
}

export default Account;