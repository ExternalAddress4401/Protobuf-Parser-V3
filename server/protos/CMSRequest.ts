export const proto = {
  1: {
    name: "id",
    type: "varint",
  },
  2: {
    name: "version",
    type: "string",
  },
  3: {
    name: "timestamp",
    type: "varint",
  },
  4: {
    name: "empty",
    type: "string",
  },
  5: {
    name: "cms",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "empty",
        type: "string",
      },
      3: {
        name: "unknown",
        type: "varint",
      },
      4: {
        name: "thing",
        type: "group",
        fields: {
          1: {
            name: "cms",
            type: "group",
            fields: {
              1: {
                name: "url",
                type: "string",
              },
              2: {
                name: "version",
                type: "string",
              },
              3: {
                name: "hash",
                type: "string",
              },
              5: {
                name: "contentUrl",
                type: "string",
              },
              7: {
                name: "language",
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
