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
    name: "rpc",
    type: "string",
  },
  7: {
    name: "version",
    type: "string",
  },
  11: {
    name: "timestamp",
    type: "varint",
  },
  112: {
    name: "data",
    type: "group",
    fields: {
      3: {
        name: "id",
        type: "string",
      },
      15: {
        name: "unknown",
        type: "varint",
      },
      20: {
        name: "base64",
        type: "string",
      },
    },
  },
};
