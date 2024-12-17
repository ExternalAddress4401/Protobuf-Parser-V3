import { CMSField } from "../interfaces/CMSField";

export interface ScalingConfig {
  version: string;
  levels: {
    id: string;
    module: {
      type: number;
      slice: any;
    };
  }[];
  groups: {
    id: string;
    priority: number;
    requirements: {};
    level_id: string;
  }[];
  devices: {
    id: number;
    idLabel: string;
    platform: number;
    level_id: string;
  };
}

export const proto: Record<number, CMSField> = {
  1: {
    name: "version",
    type: "string",
  },
  2: {
    name: "levels",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "module",
        type: "group",
        fields: {
          1: {
            name: "type",
            type: "varint",
          },
          2: {
            name: "slice",
            type: "enum",
            enums: {
              7: "ShaderScalingModule",
              102: "FlamingoScalingModuleTemplate",
            },
          },
        },
      },
    },
  },
  3: {
    name: "groups",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "priority",
        type: "varint",
      },
      3: {
        name: "requirements",
        type: "group",
        fields: [],
      },
      4: {
        name: "level_id",
        type: "string",
      },
    },
  },
  4: {
    name: "devices",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
      3: {
        name: "platform",
        type: "varint",
      },
      4: {
        name: "level_id",
        type: "string",
      },
    },
  },
};
