/**
* Programmer: D'Riski Maulana
* Filename: auth.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: middleware for verify the token with server
**/

import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.SECRET_JWT;

const auth = (/**@type import('express').Request */ req, /**@type import('express').Response */ res, next ) => {

    try {

        // check if token is valid
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;
        if(token) {
            decodedData = jwt.verify(token, jwtSecret);
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        console.log(error);
    }

}


export default auth;