import PacketServer from "./PacketServer";
import { cms } from "./CMSFiles";
import { proto as CMSRequestProto } from "./protos/CMSRequest";
import { proto as CMSRequestResponseProto } from "./protos/CMSRequestResponse";
import { proto as ResponseHeaderProto } from "./protos/ResponseHeader";

export async function getCms() {
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
  console.log("here", json.body.cms[0].cms[0]);

  return json.body.cms[0].cms[0];
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
