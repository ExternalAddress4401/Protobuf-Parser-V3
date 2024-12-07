import fs from "fs";
import { ProtobufReader } from "./ProtobufReader";
import { proto } from "./protos/FontFallbackConfig";

const file = fs.readFileSync("./cms/FontFallbackConfig.bytes");

const reader = new ProtobufReader(file);
const parsed = reader.parse(proto);

console.log(parsed);
