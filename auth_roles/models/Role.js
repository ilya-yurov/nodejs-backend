import {Schema, model} from "mongoose";

const Role = new Schema({
    // Можно указать дефолтное значение в default
    // unique, т.к. две одинаковые роли у юзера быть не может
    value: {type: String, unique: true, default: "USER"},
})

export default model('Role', Role);
