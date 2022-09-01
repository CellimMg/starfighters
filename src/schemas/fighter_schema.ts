import joi from "joi";


const fighterSchema = joi.object({
    "firstUser": joi.string().required(),
    "secondUser": joi.string().required()
});


export default fighterSchema;