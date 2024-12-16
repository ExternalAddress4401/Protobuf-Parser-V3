interface BaseCMSField {
  name: string;
}

interface PlainCMSField extends BaseCMSField {
  type:
    | "varint"
    | "boolean"
    | "string"
    | "string-repeat"
    | "float"
    | "signed-varint";
}

export interface CMSFieldGroupOrPacked extends BaseCMSField {
  type: "group" | "packed";
  fields: Record<number, CMSField>;
}

export interface ChunkedCMSField extends BaseCMSField {
  type: "chunk";
  chunk: string;
}

export interface EnumCMSField extends BaseCMSField {
  type: "enum";
  enums: Record<number, string>;
}

export type CMSField =
  | PlainCMSField
  | CMSFieldGroupOrPacked
  | ChunkedCMSField
  | EnumCMSField;
