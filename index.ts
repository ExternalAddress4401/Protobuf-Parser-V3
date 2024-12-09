import { proto as AssetsPatchConfigProto } from "./protos/AssetsPatchConfig";
import { proto as FontFallbackConfig } from "./protos/FontFallbackConfig";
import { proto as LangConfig } from "./protos/LangConfig";
import { proto as ScalingConfig } from "./protos/ScalingConfig";
import { proto as SongConfig } from "./protos/SongConfig";
import { getCms } from "./server/CMSRequester";

export default {
  AssetsPatchConfigProto,
  FontFallbackConfig,
  LangConfig,
  ScalingConfig,
  SongConfig,
  getCms,
};
