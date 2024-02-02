// authentication

// ?register
// 1. extract req.body
// 2. validate the data with joi (trycatch use)
// 3. make sure the email used to register is not already used by other user
        //find email exists by using findOne
        // i.e. one email is used to create account
// 4.hash password(use bcrypt.hash)
// 5.create user
// 6. send response

// ?login
// 1.req.body (email and password) validation
// 2.check if user exists with email
// 3.if no user is found by this email,terminate
// 4.check for password match(use bcrypt.compare)
// 5.if not password match, terminate
// 6.generate token(jsonwebtoken package is used and method is jwt.sign,secret key is also required.)
// put unique information of user in token e.g _id,email
//7.send response including user data and token

// ?isUser middleware
// * Note: we have to add token to headers for every routes
// 1.extract token from headers
// token is in req.headers.authorization in format "Bearer eyJhbGciOiJIUzI1NiIsInR....."
// {
// we have to split the string by space (" ")
// it returns array with two elements ["Bearer","eyJhbGciOiJIUzI1NiIsInR....."]
// token  = splittedArray[1]
// }

// 2. decrypt the token with jwt.verify(token,secretKey)
// decrypted value gives the unique information we have put during encryption
// let us suppose we had put email in token
// after decryption, we get that user email
// check whether user with that email exists or not
// if not user , terminate and send "Unauthorized"
// if user is found, let him use other service/call next function