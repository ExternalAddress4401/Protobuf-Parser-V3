import fs from "fs";
import { ProtobufReader } from "./ProtobufReader";
import { proto } from "./protos/SongConfig";

const file = fs.readFileSync("./cms/SongConfig.bytes");

const reader = new ProtobufReader(file);

const parsed = reader.parse(proto);

fs.writeFileSync("out.txt", JSON.stringify(parsed, null, 2));
