import {
  proto as AssetsPatchConfigProto,
  AssetsPatchConfig,
} from "./protos/AssetsPatchConfig";
import {
  proto as FontFallbackConfigProto,
  FontFallbackConfig,
} from "./protos/FontFallbackConfig";
import { proto as LangConfigProto, LangConfig } from "./protos/LangConfig";
import { proto as AudioConfigProto, AudioConfig } from "./protos/AudioConfig";
import {
  proto as ScalingConfigProto,
  ScalingConfig,
} from "./protos/ScalingConfig";
import { proto as SongConfigProto, SongConfig } from "./protos/SongConfig";
import { getCMS } from "./server/CMSRequester";
import { ProtobufReader } from "./ProtobufReader";
import { ProtobufWriter } from "./ProtobufWriter";

export {
  AssetsPatchConfigProto,
  FontFallbackConfigProto,
  LangConfigProto,
  ScalingConfigProto,
  SongConfigProto,
  AudioConfigProto,
  AssetsPatchConfig,
  FontFallbackConfig,
  LangConfig,
  ScalingConfig,
  SongConfig,
  AudioConfig,
  ProtobufReader,
  ProtobufWriter,
  getCMS,
};
