import { chunk } from "./utils/chunk";
import { pad } from "./utils/pad";

export class BufferHandler {
  #buffer: Buffer;
  #index: number = 0;
  operation: "READ" | "WRITE";

  constructor(buffer: Buffer, operation: "READ" | "WRITE") {
    this.#buffer = buffer;
    this.operation = operation;
  }
  readVarint() {
    const buff = this.readVarintBuffer();
    const bytes = Array.from(buff)
      .map((byte) => byte & 0x7f)
      .reverse();

    const varint = bytes.map((byte) => pad(byte.toString(2), 7, "0")).join("");
    return parseInt(varint, 2);
  }
  readVarintBuffer() {
    let bytes = [];
    while (true) {
      const byte = this.readByte();
      bytes.push(byte);
      if ((byte & 0x80) === 0) {
        break;
      }
    }
    return Buffer.from(bytes);
  }
  readKey() {
    const varint = this.readVarint();

    return {
      wire: varint & 0b00000111,
      field: varint >> 3,
    };
  }
  readByte() {
    return this.#buffer.readUInt8(this.#index++);
  }
  readBytes(count: number) {
    const bytes = this.#buffer.subarray(this.#index, this.#index + count);
    this.#index += count;
    return bytes;
  }
  readStringBuffer() {
    const length = this.readVarint();
    const str = this.#buffer.subarray(this.#index, this.#index + length);
    this.#index += length;
    return str;
  }
  readFloat() {
    const f = this.#buffer.readFloatLE(this.#index);
    this.#index += 4;
    return f;
  }
  hasMore() {
    return this.#index < this.#buffer.length;
  }
  getBuffer() {
    if (this.operation === "READ") {
      return this.#buffer;
    } else {
      return this.#buffer.subarray(0, this.#index);
    }
  }
  getRawBuffer() {
    return this.#buffer;
  }
  writeBuffer(buffer: Buffer) {
    buffer.copy(this.#buffer, this.#index);
    this.#index += buffer.length;
  }
  writeVarint(varint: number) {
    const binary = varint.toString(2);
    const chunks = chunk(binary)
      .map((el) => pad(el, 7, "0"))
      .reverse();
    if (chunks.length === 0) {
      chunks[0] = "0" + chunks[0];
    } else {
      for (var i = 0; i < chunks.length - 1; i++) {
        chunks[i] = "1" + chunks[i];
      }
      chunks[chunks.length - 1] = "0" + chunks[chunks.length - 1];
    }

    this.writeBuffer(Buffer.from(chunks.map((el) => parseInt(el, 2))));
  }
  writeKey(wire: number, field: number) {
    const end = pad(wire.toString(2), 3, "0");
    const start = field.toString(2);
    const c = parseInt(start + end, 2);
    this.writeVarint(c);
  }
  writeString(str: string, field: number) {
    this.writeKey(2, field);
    this.writeVarint(new TextEncoder().encode(str).length);
    this.writeBuffer(Buffer.from(str));
  }
  get index() {
    return this.#index;
  }
}
