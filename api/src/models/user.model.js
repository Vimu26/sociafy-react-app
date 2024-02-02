import { Schema, model } from "mongoose";
import { SalutationEnum } from "../enums/common.enum.js";

//schema for name
const nameSchema = new Schema({
  salutation: {
    type: String,
    required: true,
    enum: SalutationEnum
  },
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String
  },
  last_name: {
    type: String,
    required: true
  }
});

//schema for address
const addressSchema = new Schema({
  no: {
    type: String,
    required: true
  },
  street1: {
    type: String,
    required: true
  },
  street2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const userDetailsSchema = new Schema({
  name: nameSchema,
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact_number: {
    type: String,
    min: [10],
    max: [10],
    required: true
  },
  address: addressSchema,
  password: {
    type: String,
    required: true
  }
});

export default new model("user", userDetailsSchema);
