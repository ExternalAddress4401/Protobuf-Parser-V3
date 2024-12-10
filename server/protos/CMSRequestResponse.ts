export const proto = {
  1: {
    name: "id",
    type: "varint",
  },
  2: {
    name: "timestamp",
    type: "varint",
  },
  3: {
    name: "error",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "message1",
        type: "string",
      },
      3: {
        name: "error",
        type: "string",
      },
      4: {
        name: "message2",
        type: "string",
      },
    },
  },
  4: {
    name: "string",
    type: "a",
  },
  5: {
    name: "cms",
    type: "group",
    fields: {
      1: {
        name: "unknown1",
        type: "varint",
      },
      2: {
        name: "unknown2",
        type: "varint",
      },
      3: {
        name: "unknown3",
        type: "varint",
      },
      5: {
        name: "cms",
        type: "group",
        fields: {
          1: {
            name: "cms",
            type: "group",
            fields: {
              1: {
                name: "name",
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
              4: {
                name: "diffs",
                type: "string",
              },
              5: {
                name: "url",
                type: "string",
              },
            },
          },
          2: {
            name: "ads",
            type: "group",
            fields: {
              1: {
                name: "a",
                type: "string",
              },
              2: {
                name: "b",
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
