var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');

async function mysqlQuery(query, req) {
    return new Promise(function (resolve, reject) {
        connection.query(query, req, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.getAll = (req, res) => {
    mysqlQuery('SELECT * FROM user')
        .then(function (rows) {
            res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getById = (req, res) => {
    mysqlQuery('SELECT * FROM user WHERE id = ?', req.params.id)
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.register = (req, res) => {
    mysqlQuery('INSERT INTO user SET ?', req.body)
        .then(function (rows) {
            console.log('Register by ' + req.body.username + ' successful.!!');
            res.send({ id: rows.insertId });
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    mysqlQuery('SELECT * FROM user WHERE username = ? AND password = ?', [username, password])
        .then(function (rows) {
            if (rows[0]) {
                res.send(rows[0]);
            } else {
                res.send('Username or password incorect.');
            }
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.edit = (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let data = [body.email, body.first_name, body.last_name, body.tel, id];

    mysqlQuery('UPDATE user SET email = ?, first_name = ?, last_name = ?, tel = ? WHERE id = ?', data)
        .then(function (rows) {
            res.send(true);
            // res.send(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM user WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.upload = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;
    uploadImage.uploadToS3(file);
    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // });
};
