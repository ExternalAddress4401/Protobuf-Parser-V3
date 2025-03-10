import { CMSField } from "../interfaces/CMSField";

export interface AssetsPatchConfig {
  version: string;
  assetBundles: {
    id: string;
    DependenciesAndroid_id: string;
    HashAndroid: string;
    SizeInBytesAndroid: number;
    CRCAndroid: number;
    HashIos: string;
    SizeInBytesIos: number;
    CRCIos: number;
    DependenciesIos_id: string;
  }[];
  assets: {
    id: string;
    name: string;
    iosBundle: string;
    androidBundle: string;
  }[];
  downloadUrl: string;
  downloadBucketVersion: string;
}

export const proto: Record<number, CMSField> = {
  1: {
    name: "version",
    type: "string",
  },
  4: {
    name: "assetBundles",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "DependenciesAndroid_id",
        type: "string",
      },
      5: {
        name: "HashAndroid",
        type: "string",
      },
      6: {
        name: "SizeInBytesAndroid",
        type: "varint",
      },
      7: {
        name: "CRCAndroid",
        type: "varint",
      },
      8: {
        name: "HashIos",
        type: "string",
      },
      9: {
        name: "SizeInBytesIos",
        type: "varint",
      },
      10: {
        name: "CRCIos",
        type: "varint",
      },
      11: {
        name: "DependenciesIos_id",
        type: "string",
      },
    },
  },
  5: {
    name: "assets",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "name",
        type: "string",
      },
      3: {
        name: "iosBundle",
        type: "string",
      },
      4: {
        name: "androidBundle",
        type: "string",
      },
    },
  },
  6: {
    name: "downloadUrl",
    type: "string",
  },
  7: {
    name: "downloadBucketVetsion",
    type: "string",
  },
};
