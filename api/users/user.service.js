const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstname, middlename, lastname, email, password, phonenumber,image)
            values(?,?,?,?,?,?,?)`,
            [
                data.firstname,
                data.middlename,
                data.lastname,
                data.email,
                data.password,
                data.phonenumber,
                data.image
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            'select id,firstname, middlename, lastname, email, password, phonenumber from registration',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserByUSerId: (id, callBack) => {
        pool.query(
            'select id,firstname, middlename, lastname, email, password, phonenumber from registration where id=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    UpdateUser: (data, callBack) => {
        pool.query(
            `update registration set firstname=?, middlename=?, lastname=?, email=?, password=?, phonenumber=? where id=?`,
            [
                data.firstname,
                data.middlename,
                data.lastname,
                data.email,
                data.password,
                data.phonenumber,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    DeleteUsers: (data, callBack) => {
        console.log("dataId::", data)
        pool.query(
            `delete from registration where id=?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    contactUs: (data, callBack) => {
        pool.query(
            `insert into contactus( firstname, middlename, lastname, phonenumber, email, message)
            values(?,?,?,?,?,?)`,
            [
                data.firstname,
                data.middlename,
                data.lastname,
                data.email,
                data.phonenumber,
                data.message
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}