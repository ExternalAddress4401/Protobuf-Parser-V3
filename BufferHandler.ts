import { pad } from "./utils/pad";

export class BufferHandler {
  #buffer: Buffer;
  #index: number = 0;

  constructor(buffer: Buffer) {
    this.#buffer = buffer;
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
  readStringBuffer() {
    const length = this.readVarint();
    const str = this.#buffer.subarray(this.#index, this.#index + length);
    this.#index += length;
    return str;
  }
  hasMore() {
    return this.#index < this.#buffer.length;
  }
  getBuffer() {
    return this.#buffer;
  }
}
