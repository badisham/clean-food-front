const AWS = require('aws-sdk');

exports.uploadToS3 = async (file, filename) => {
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
        Bucket: process.env.BUCKET_NAME,
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: file.data,
            ACL: 'public-read',
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                return false;
            }
            console.log('upload success');
            return true;
        });
    });
};
