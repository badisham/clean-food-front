const async = require('async');
var connection = require('../condb');
const uploadFile = require('./upload-image');
var moment = require('moment');

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
    const genre = req.query.genre;
    console.log(genre);
    mysqlQuery('SELECT * FROM restaurant WHERE genre = ? ORDER BY id DESC', [genre])
        .then(function (rows) {
            res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getProfileById = (req, res) => {
    console.log('get by id');
    mysqlQuery('SELECT * FROM restaurant WHERE user_id = ?', req.params.id)
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getStoreById = (req, res) => {
    console.log('store' + req.params.id);
    mysqlQuery('SELECT * FROM restaurant WHERE id = ?', req.params.id)
        .then(function (rows) {
            console.log(rows[0]);
            res.send(rows[0]);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.create = (req, res) => {
    res.send(createRes(req, res));
};

exports.upsert = async (req, res) => {
    const body = JSON.parse(req.body.body);
    const id = req.params.id;
    let data = [body.name, body.genre, body.description];
    let queryImg = '';
    let fileName = '';
    if (req.files !== null) {
        queryImg = ', img = ?';
        fileName = await uploadImage(req.files.file);
        data.push(fileName);
    }
    data.push(body.user_id);

    mysqlQuery(`UPDATE restaurant SET name = ?, genre = ?, description = ?${queryImg} WHERE user_id = ?`, data)
        .then(function (rows) {
            if (rows.changedRows <= 0) {
                let createData = JSON.parse(req.body.body);
                createData['img'] = fileName;
                createRes(createData, res);
                return;
            }
            console.log('Update');
            res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM restaurant WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

const createRes = (req, res) => {
    console.log('Create');
    mysqlQuery('INSERT INTO restaurant SET ?', req)
        .then(function (rows) {
            console.log('Create');
            res.send({ id: rows.insertId });
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

const uploadImage = (file) => {
    var nameSplit = file.name.split('.');
    let filename = moment().unix().toString();
    filename += '.' + nameSplit[nameSplit.length - 1];

    // return filename;
    return uploadFile
        .uploadToS3(file, filename)
        .then(() => filename)
        .catch((err) => '');
};
