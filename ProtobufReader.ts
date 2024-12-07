import { BufferHandler } from "./BufferHandler";
import { CMSField } from "./interfaces/CMSField";

export class ProtobufReader extends BufferHandler {
  groupings: Record<number, Buffer> = {};

  constructor(buffer: Buffer, shouldProcess: boolean = true) {
    super(buffer);
    if (shouldProcess) {
      this.preprocess();
    }
  }
  preprocess() {
    while (this.hasMore()) {
      const key = this.readKey();
      switch (key.wire) {
        case 0:
          this.groupings[key.field] = this.readVarintBuffer();
          break;
        case 2:
          this.groupings[key.field] = this.readStringBuffer();
          break;
      }
    }
  }
  parse(proto: Record<number, CMSField>) {
    const parsed: Record<string, any> = {};
    for (const key in proto) {
      const values = this.groupings[key];
      parsed[proto[key].name] = this.parseField(
        this.groupings[key],
        proto[key]
      );
    }
    return parsed;
  }
  parseField(field: Buffer, proto: CMSField) {
    switch (proto.type) {
      case "string":
        return field.toString();
      case "group":
        return this.parseGroup(field, proto.fields);
    }
  }
  parseGroup(field: Buffer, proto: Record<number, CMSField>) {
    const { groupings } = new ProtobufReader(field);
    const parsed: Record<string, any> = {};
    for (const key in proto) {
      const entry = proto[key];
      switch (entry.type) {
        case "string":
          parsed[entry.name] = groupings[key].toString();
          break;
        case "string-repeat":
          const row = new ProtobufReader(groupings[key], false);
          const values = [];
          while (row.hasMore()) {
            values.push(row.readStringBuffer().toString());
          }
          parsed[entry.name] = values;
          break;
      }
    }
    return parsed;
  }
}
