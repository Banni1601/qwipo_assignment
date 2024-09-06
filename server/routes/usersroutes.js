
const express = require("express");
const { createCustomer, login,getAllUsersData,getOneUsersData,updateUserData,deleteUserData,searchAUserForDelete } = require("../controller/usersapi.js");

const route = express.Router();

//added the routes

route.post("/createCustomer", createCustomer);
route.get('/customers/search', searchAUserForDelete);
route.post("/login", login);
route.get("/users", getAllUsersData); 
route.get("/users/:id", getOneUsersData); 
route.put("/updateuserdata/:id", updateUserData);
route.delete("/deleteuser/:id", deleteUserData);



module.exports = route;

