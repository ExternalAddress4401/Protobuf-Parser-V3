interface BaseCMSField {
  name: string;
}

interface PlainCMSField extends BaseCMSField {
  type: "varint" | "boolean" | "string" | "string-repeat" | "float";
}

export interface CMSFieldGroupOrPacked extends BaseCMSField {
  type: "group" | "packed";
  fields: Record<number, CMSField>;
}

export interface ChunkedCMSField extends BaseCMSField {
  type: "chunk";
  chunk: string;
}

export type CMSField = PlainCMSField | CMSFieldGroupOrPacked | ChunkedCMSField;
