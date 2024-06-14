import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new AWS.S3({
    accessKeyId: "AKIAUFTEI5IESYISRKX7",//process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: "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",//process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1"//process.env.AWS_REGION,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: "hedomey-buket",//process.env.S3_BUCKET_NAME
        acl: "public-read", // Set the ACL as needed
        metadata: function (_req, file, cb) {
            console.log(2)
            cb(null, { fieldName: file.fieldname });
        },
        key: function (_req, file, cb) {
            console.log(3)
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});

export default upload.single('file'); // Export the multer middleware as a default export
