import React, { useContext } from "react";
import "./Home.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Data } from "../../Context/userContext";
import InteractiveImage from "../InteractiveImage/InteractiveImage";



//Component for Home for Interactive Image and Content
function Home() {
  const { state, popUps, setPopUps } = useContext(Data);

  return (
    <div className="home-page-main-div ">

      {/* Home Page */}
      <div className="home-page-div">
        <div className="home-page-para-div">
          <h1>Welcome To MINI QWIPO Website</h1>
          <p>Access the user Details in the Account page</p>
        </div>
        <div className="home-page-image-div">
        <InteractiveImage />
        </div>
        </div>
     

      {/* Toast container */}
      <ToastContainer
        className="p-5"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast
          show={popUps.showToast}
          onClose={() => setPopUps((i) => ({ ...i, showToast: false }))}
          className=""
        >
          <Toast.Header className="">
            <img
              src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
              className="rounded me-0 "
              height={30}
              alt=""
            />
            <strong className="me-auto ">Hi {state.currentUserFirstName + " "+state.currentUserLastName }</strong>
          </Toast.Header>
          <Toast.Body className="text-center text-dark">
            You successfully logged in
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Home;
