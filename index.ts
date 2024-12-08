import fs from "fs";
import { ProtobufReader } from "./ProtobufReader";
import { proto } from "./protos/ScalingConfig";

const file = fs.readFileSync("./cms/ScalingConfig.bytes");

const reader = new ProtobufReader(file);

const parsed = reader.parse(proto);

fs.writeFileSync("out.txt", JSON.stringify(parsed, null, 2));
