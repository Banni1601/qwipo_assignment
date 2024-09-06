import React, { useState } from "react";

export const Data = React.createContext();

// Provider and Consumer the Data with Context
export const UserContext = ({ children }) => {
  const [state, setState] = useState({
    emailId: "bunnyv092@gmail.com",
    password: "Banni@2004",
    viewPassword: true,
    userNameError: false,
    mailIdError: false,
    passwordError: false,
    registerStatus: false,
    registerMessage:"",
    loginMessage:"",
    loginStatus: false,
    isUserLogin: false,
    currentUserFirstName: "",
    currentUserLastName: "",
    currentUserPhoneNo: "",
    currentUserEmail:"",
    currentUserAddress: "",
    currentUserQrCodeURL: "",
    currentUserId:"",
    allCustomerDetails:[]
      });
  const [popUps, setPopUps] = useState({ showToast: false, loading: false });
  return (
    <Data.Provider value={{ state, setState, popUps, setPopUps }}>
      {children}
    </Data.Provider>
  );
};

export default UserContext;
