import { SalutationEnum } from "../enums/common.enum.js";

const createUser = {
  type: "object",
  properties: {
    name: {
      $ref: "#/definitions/nameSchema"
    },
    email: {
      type: "string",
      format: "email"
    },
    contact_number: {
      type: "string",
      minLength: 10,
      maxLength: 10
    },
    address: {
      $ref: "#/definitions/addressSchema"
    },
    password: {
      type: "string"
    }
  },
  required: ["name", "email", "contact_number", "address", "password"],
  definitions: {
    nameSchema: {
      type: "object",
      properties: {
        salutation: {
          type: "string",
          enum: SalutationEnum
        },
        first_name: {
          type: "string"
        },
        middle_name: {
          type: "string"
        },
        last_name: {
          type: "string"
        }
      },
      required: ["salutation", "first_name", "last_name"],
      additionalProperties: false
    },
    addressSchema: {
      type: "object",
      properties: {
        no: {
          type: "string"
        },
        street1: {
          type: "string"
        },
        street2: {
          type: "string"
        },
        city: {
          type: "string"
        }
      },
      required: ["no", "street1", "street2", "city"],
      additionalProperties: false
    }
  },
  additionalProperties: false
};

export default { createUser };
