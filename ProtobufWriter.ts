import { BufferHandler } from "./BufferHandler";
import { CMSField } from "./interfaces/CMSField";

export class ProtobufWriter extends BufferHandler {
  constructor() {
    super(Buffer.alloc(1000000), "WRITE");
  }
  build(
    data: Record<string, any>,
    proto: Record<number, CMSField>,
    sub: boolean = false
  ) {
    const ent = Object.entries(proto);
    let temp: ProtobufWriter;
    for (const key in data) {
      const row: any = ent.find((el) => el[1].name === key);
      if (!row) {
        console.log("thing", data, ent, key);
        throw new Error("Invalid whatever found.");
      }
      const [protoKey, prot] = row;
      switch (prot.type) {
        case "varint":
          this.writeKey(0, parseInt(protoKey));
          this.writeVarint(data[key]);
          break;
        case "string":
          this.writeString(data[key], parseInt(protoKey));
          break;
        case "group":
          temp = new ProtobufWriter();
          console.log("DATA", data, key);
          for (const entry of data[key]) {
            const b = new ProtobufWriter();
            const buf = b.build(entry, prot.fields, true);
            temp.writeKey(2, parseInt(protoKey));
            temp.writeVarint(buf.length);
            temp.writeBuffer(buf);
          }
          this.writeBuffer(temp.getBuffer());
          break;
        case "packed":
          this.writeKey(2, parseInt(protoKey));
          temp = new ProtobufWriter();
          for (const entry of data[key]) {
            const b = new ProtobufWriter();
            const buf = b.build(entry, prot.fields);
            temp.writeVarint(buf.length);
            temp.writeBuffer(buf);
          }
          this.writeVarint(temp.index);
          this.writeBuffer(temp.getBuffer());
          break;
        case "boolean":
          this.writeKey(0, parseInt(protoKey));
          this.writeVarint(data[key] ? 0 : 1);
          break;
        default:
          console.log("wtf is this shit?", row);
          break;
      }
    }
    return this.getBuffer();
  }

  /*parse(proto: Record<number, CMSField>) {
    const parsed: Record<string, any> = {};
    for (const key in this.groupings) {
      const field = proto[key];
      if (!field) {
        parsed[key] = this.groupings[key][0].getBuffer();
        continue;
      }
      const values: any[] = [];
      let reader: ProtobufReader;
      switch (proto[key].type) {
        case "varint":
          parsed[proto[key].name] = this.groupings[key][0].readVarint();
          break;
        case "string":
          parsed[proto[key].name] = this.groupings[key][0]
            .getBuffer()
            .toString();
          break;
        case "float":
          parsed[proto[key].name] = this.groupings[key][0].readFloat();
          break;
        case "string-repeat":
          reader = this.groupings[key][0];
          while (reader.hasMore()) {
            values.push(reader.readStringBuffer().toString());
          }
          parsed[proto[key].name] = values;
          break;
        case "boolean":
          parsed[proto[key].name] = this.groupings[key][0].readVarint() === 0;
          break;
        case "group":
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
        case "packed":
          reader = this.groupings[key][0];
          while (reader.hasMore()) {
            const subReader = new ProtobufReader(reader.readStringBuffer());
            values.push(subReader.parse(proto[key].fields));
          }
          parsed[proto[key].name] = values;

          break;
        case "chunk":
          const chunk = JSON.parse(
            fs
              .readFileSync(`./protos/chunks/${proto[key].chunk}.json`)
              .toString()
          );
          this.groupings[key][0].preprocess();
          parsed[proto[key].name] = this.groupings[key][0].parse(chunk.fields);
          break;
        case "enum":
          const e = JSON.parse(
            fs
              .readFileSync(
                `./protos/enums/${proto[key].enums[parsed.type]}.json`
              )
              .toString()
          );
          this.groupings[key][0].preprocess();
          parsed[proto[key].name] = this.groupings[key][0].parse(e);
          break;
      }
    }
    return parsed;
  }*/
}
