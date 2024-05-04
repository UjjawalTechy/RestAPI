const { create, getUserByUSerId, getUsers, UpdateUser, DeleteUsers, getUserByEmail, contactUs } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt")

const { sign } = require("jsonwebtoken")
module.exports = {
    createUser: (req, res) => {
        
        const body = req.body;
        const file = req.file;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create({...body,image:file.originalname}, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DataBase Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: {
                    ...results,
                    profile:`http://localhost:8000/public/images/${file.originalname}`
                },
                message: "User is created successfully"
            })
        })
    },
    getUserByUSerId: (req, res) => {
        const id = req.params.id;
        getUserByUSerId(id, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    UpdateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        UpdateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Fail To Update User"
                })
            }
            return res.json({
                success: 1,
                message: "Updated Successfully"
            })
        })
    },
    DeleteUsers: (req, res) => {
        const data = req.query.id;
        console.log("delete::", data)
        DeleteUsers(req.query.id, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "User Deleted Successfully"
            })
        })
    },
    Login: (req, res) => {
        const data = req.body;
        getUserByEmail(data.email, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(data.password, results.password)
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe7060", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                })
            } else {
                return res.json({
                    sucess: 0,
                    data: "Invalid Email or Passsowrd"
                })
            }
        })
    },
    contactUs: (req, res) => {
        const body = req.body;
        contactUs(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DataBase Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "data is Submitted successfully"
            })
        })
    },
}