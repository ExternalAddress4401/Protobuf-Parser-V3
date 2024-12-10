export const proto = {
  1: {
    name: "id",
    type: "varint",
  },
  2: {
    name: "type",
    type: "varint",
  },
  3: {
    name: "httpCode",
    type: "varint",
  },
  4: {
    name: "errorCode",
    type: "varint",
  },
  5: {
    name: "error",
    type: "string",
  },
  10: {
    name: "unknown1",
    type: "string",
  },
  112: {
    name: "auth",
    type: "group",
    fields: {
      1: {
        name: "base64",
        type: "string",
      },
      2: {
        name: "id",
        type: "string",
      },
      3: {
        name: "timestamp",
        type: "varint",
      },
      4: {
        name: "token",
        type: "string",
      },
    },
  },
};
