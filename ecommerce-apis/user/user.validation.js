import Joi from "joi";


export const registerUserValidationSchema= Joi.object({
    email:Joi.string().email().required().trim().min(5).max(55).lowercase(),
    password:Joi.string().required().
        trim().
        max(20).
        pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    firstName:Joi.string().required().trim().min(2).max(55),
    lastName:Joi.string().required().trim().min(3).max(55),
    gender:Joi.string().required().trim().valid("male","female","other"),
    location:Joi.string().required().trim().min(2).max(55),
    role:Joi.string().required().trim().valid("buyer","seller"),
});




export const loginUserValidationSchema= Joi.object({
    email:Joi.string().email().required().trim().lowercase(),
    password:Joi.string().required().trim(),
});



export const updateUserValidationSchema= Joi.object({
    password:Joi.string().required().
        trim().
        max(20).
        pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    firstName:Joi.string().required().trim().min(2).max(55),
    lastName:Joi.string().required().trim().min(3).max(55),
    gender:Joi.string().required().trim().valid("male","female","other"),
    location:Joi.string().required().trim().min(2).max(55),
});
