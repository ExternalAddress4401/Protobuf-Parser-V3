import path from "path";
import { BufferHandler } from "./BufferHandler";
import { CMSField } from "./interfaces/CMSField";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProtobufReader extends BufferHandler {
  groupings: Record<number, ProtobufReader[]> = {};

  constructor(buffer: Buffer, shouldProcess: boolean = true) {
    super(buffer, "READ");
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
        case 5:
          this.groupings[key.field].push(
            new ProtobufReader(this.readBytes(4), false)
          );
      }
    }
  }
  parse(proto: Record<number, CMSField>) {
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
        case "signed-varint":
          const v = this.groupings[key][0].readVarint();
          const big = BigInt(v);
          const zigzag = (big >> 1n) ^ -(big & 1n);
          parsed[proto[key].name] = Number(zigzag);
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
          parsed[proto[key].name] = this.groupings[key][0].readVarint() === 1;
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
              .readFileSync(
                path.join(
                  __dirname,
                  "protos/chunks",
                  `${proto[key].chunk}.json`
                )
              )
              .toString()
          );
          this.groupings[key][0].preprocess();
          parsed[proto[key].name] = this.groupings[key][0].parse(chunk.fields);
          break;
        case "enum":
          try {
            const e = JSON.parse(
              fs
                .readFileSync(
                  path.join(
                    __dirname,
                    "protos/enums",
                    `${proto[key].enums[parsed.type]}.json`
                  )
                )
                .toString()
            );
            this.groupings[key][0].preprocess();
            parsed[proto[key].name] = this.groupings[key][0].parse(e);
          } catch (e) {
            parsed[proto[key].name] = this.groupings[key][0].getBuffer();
          }
          break;
      }
    }
    return parsed;
  }
}
