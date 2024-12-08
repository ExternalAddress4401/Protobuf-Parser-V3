import { BufferHandler } from "./BufferHandler";
import { CMSField, CMSFieldGroupOrPacked } from "./interfaces/CMSField";

export class ProtobufReader extends BufferHandler {
  groupings: Record<number, ProtobufReader[]> = {};

  constructor(buffer: Buffer, shouldProcess: boolean = true) {
    super(buffer);
    if (shouldProcess) {
      this.preprocess();
    }
  }
  preprocess() {
    while (this.hasMore()) {
      const key = this.readKey();
      if (!this.groupings[key.field]) {
        this.groupings[key.field] = [];
      }
      switch (key.wire) {
        case 0:
          this.groupings[key.field].push(
            new ProtobufReader(this.readVarintBuffer(), false)
          );
          break;
        case 2:
          this.groupings[key.field].push(
            new ProtobufReader(this.readStringBuffer(), false)
          );
          break;
      }
    }
  }
  parse(proto: Record<number, CMSField>) {
    const parsed: Record<string, any> = {};
    for (const key in proto) {
      const values: any[] = [];
      switch (proto[key].type) {
        case "varint":
          parsed[proto[key].name] = this.groupings[key][0].readVarint();
          break;
        case "string":
          parsed[proto[key].name] = this.groupings[key][0]
            .getBuffer()
            .toString();
          break;
        case "string-repeat":
          const reader = this.groupings[key][0];
          while (reader.hasMore()) {
            values.push(reader.readStringBuffer().toString());
          }
          parsed[proto[key].name] = values;
          break;
        case "group":
        case "packed":
          this.preprocess();
          if (!this.groupings[key]) {
            break;
          }
          for (const reader of this.groupings[key]) {
            reader.preprocess();
            values.push(reader.parse(proto[key].fields));
          }

          parsed[proto[key].name] = values;
          break;
      }
    }
    return parsed;
  }
  /*parseField(reader: ProtobufReader, proto: CMSField) {
    switch (proto.type) {
      case "varint":
        return reader.readVarint();
      case "string":
        return reader.getBuffer().toString();
      case "string-repeat":
        const values = [];
        while (reader.hasMore()) {
          values.push(reader.readStringBuffer().toString());
        }
        return values;
    }
  }*/
  /*parseGroup(field: ProtobufReader[], proto: Record<number, CMSField>) {
    const parsed: any[] = [];

    for (const reader of field) {
      reader.preprocess();
      const record: Record<string, any> = {};

      for (const key in proto) {
        const entry = proto[key];
        record[entry.name] = this.parseField(reader, proto[key]);
      }

      parsed.push(record);
    }
    return parsed;
  }*/
}
