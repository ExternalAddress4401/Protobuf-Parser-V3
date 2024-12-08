import fs from "fs";
import { ProtobufReader } from "./ProtobufReader";
import { proto } from "./protos/AssetsPatchConfig";

const file = fs.readFileSync("./cms/AssetsPatchConfig.bytes");

const reader = new ProtobufReader(file);

const parsed = reader.parse(proto);

console.log(parsed);
