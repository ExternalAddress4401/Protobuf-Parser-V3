import PacketServer from "./PacketServer";
import { cms, CMSTitles } from "./CMSFiles";
import { proto as CMSRequestProto } from "./protos/CMSRequest";
import { proto as CMSRequestResponseProto } from "./protos/CMSRequestResponse";
import { proto as ResponseHeaderProto } from "./protos/ResponseHeader";
import zlib from "zlib";
import { ProtobufReader } from "../ProtobufReader";
import {
  AssetsPatchConfigProto,
  FontFallbackConfigProto,
  LangConfigProto,
  AudioConfig,
  ScalingConfigProto,
  SongConfigProto,
  AudioConfigProto,
  LangConfig,
  AssetsPatchConfig,
  FontFallbackConfig,
  NotificationConfigProto,
  NotificationConfig,
  ScalingConfig,
  SongConfig,
} from "../index";

interface CMSVersion {
  name: CMSTitles;
  version: string;
  hash: string;
  url: string;
}

export async function getCMS(): Promise<CMSVersion[]> {
  const server = new PacketServer("socket-gateway.prod.flamingo.apelabs.net");
  await server.authenticate();

  const cmsRequest = {
    id: 1,
    version: "999.9.9.99999",
    timestamp: Date.now(),
    empty: "",
    cms: [
      {
        id: 1,
        empty: "",
        unknown: 1,
        thing: [
          {
            cms,
          },
        ],
      },
    ],
  };

  const response = await server.writePacket(
    "cmsservice",
    2,
    cmsRequest,
    CMSRequestProto
  );
  const json = response.toJson(ResponseHeaderProto, CMSRequestResponseProto);

  return json.body.cms[0].cms[0].cms;
}

export async function getCMSFile(title: CMSTitles) {
  const cms = await getCMS();
  const url = cms.find((el) => el.name === title)?.url;
  if (!url) {
    throw new Error("Unknown CMS title given.");
  }
  const response = await fetch(url, {
    method: "GET",
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return zlib.gunzipSync(buffer);
}

export async function getParsedCMSFile(title: CMSTitles) {
  const file = await getCMSFile(title);
  const reader = new ProtobufReader(file);

  switch (title) {
    case "GameConfig":
      return;
    case "LangConfig":
      return reader.parse(LangConfigProto) as LangConfig;
    case "AssetsPatchConfig":
      return reader.parse(AssetsPatchConfigProto) as AssetsPatchConfig;
    case "AudioConfig":
      return reader.parse(AudioConfigProto) as AudioConfig;
    case "FontFallbackConfig":
      return reader.parse(FontFallbackConfigProto) as FontFallbackConfig;
    case "NotificationConfig":
      return reader.parse(NotificationConfigProto) as NotificationConfig;
    case "ScalingConfig":
      return reader.parse(ScalingConfigProto) as ScalingConfig;
    case "SongConfig":
      return reader.parse(SongConfigProto) as SongConfig;
  }
}

/*export async function getExtraCms() {
  if (!PacketServer.isAuthenticated) {
    await PacketServer.authenticate();
  }

  const syncRequest = {
    id: 2,
    version: "999.9.9.99999",
    timestamp: Date.now(),
    unknown: "",
    something: {
      id: 1,
      empty: "",
      unknown: 5,
      device: {
        phone: {
          id: 2,
          info: {
            version: {
              version: "999.9.9.9999",
            },
          },
          timestamp: Date.now(),
          uuid: PacketServer.id,
          info2: {
            uuid: PacketServer.id,
            u1: 2900,
            uuid2: "",
            u2: 1,
            u3: 22,
            version: "999.9.9.99999",
            endpoint: "flamingo.prod.android",
            u4: "",
          },
        },
        newsFeedVersion: "29.0.0.190+en",
        v2: "29.0.0.139",
        v3: "29.0.0.139",
        v4: "28.0.content.1694617152",
        v5: "28.0.prod.1694794268",
        v6: "28.0.content.1694617958+en",
      },
    },
    authToken: PacketServer.base64,
  };

  const response = await PacketServer.writePacket(
    "gameservice",
    3,
    syncRequest,
    await readProto("./protos/login/SyncReq.json"),
    { thing: 1, thing2: 2 }
  );

  const json = response.toJson(
    await readProto("./protos/login/ResponseHeader.json"),
    await readProto("./protos/login/SyncReqResponse.json")
  );

  const { news, liveopsbundles, liveopsdeeplink, liveopsevent, seasonsconfig } =
    json.body.info.cms;

  fs.writeFileSync("./fetched/NewsFeed.json", JSON.stringify(news, null, 2));
  fs.writeFileSync(
    "./fetched/LiveOpsBundleConfig.json",
    JSON.stringify(liveopsbundles, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsDeeplinkRewardConfig.json",
    JSON.stringify(liveopsdeeplink, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsEventConfig.json",
    JSON.stringify(liveopsevent, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsSeasonConfig.json",
    JSON.stringify(seasonsconfig, null, 2)
  );
}*/
