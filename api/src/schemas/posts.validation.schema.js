const createPost = {
  type: "object",
  properties: {
    user: {
      oneOf: [
        {
          type: "string",
        },
        {
          type: "string",
          format: "uuid",
        },
      ],
    },
    comments: {
      type: "array",
      items: {
        type: "string", // Adjust the type based on your requirements
      },
    },
    picture_path: {
      type: "string",
    },
    likes: {
      type: "object", // Adjust the type based on your requirements
      additionalProperties: {
        type: "boolean", // Adjust the type based on your requirements
      },
    },
  },
  required: ["user"],
  additionalProperties: false,
};

export default { createPost };
