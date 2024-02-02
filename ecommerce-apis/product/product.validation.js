import Joi from "joi";

export const addValidationSchema= Joi.object({
    name: Joi.string().required().trim().min(2).max(55),
    image: Joi.string().trim(),
    description: Joi.string().required().trim().min(100).max(1000),
    company: Joi.string().required().trim().min(2).max(55),
    price: Joi.number().required().min(0),
    category:Joi.string().required().trim().valid("glocery","clothing","kitchen","electronics","bakery","furniture"),
    freeShipping: Joi.boolean(),
    quantity: Joi.number().required().min(1).integer(),
    color: Joi.array().items(Joi.string().lowercase()),
});


export const paginationValidationSchema= Joi.object({
    page:Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
    searchText: Joi.string().trim().allow(""),
});


export const buyerProductListValidationSchema= Joi.object({
    page:Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
    searchText: Joi.string().trim().allow(""),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    category: Joi.array().allow(null).items(
        Joi.string().
            required().
            trim().
            valid("glocery","clothing","kitchen","electronics","bakery","furniture"),
    )
})