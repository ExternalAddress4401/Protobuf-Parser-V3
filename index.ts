import fs from "fs";
import { ProtobufReader } from "./ProtobufReader";
import { proto } from "./protos/LangConfig";

const file = fs.readFileSync("./cms/LangConfig.bytes");

const reader = new ProtobufReader(file);

const parsed = reader.parse(proto);

console.log(parsed);
