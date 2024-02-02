// export const quantityValidationSchema= Joi.number().min(1).required();

import Joi from "joi";
import Yup from "yup";

export const quantityValidationSchema= Joi.object({
    quantity:Joi.number().min(1).required(),
});



export const updateQuantitySchema= Yup.object({
    option: Yup.string().oneOf[("increase","decrease")],
})