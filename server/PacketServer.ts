import { getRandom } from "../utils/getRandom";
import tls from "tls";
import { randomUUID } from "crypto";
import Packet from "./Packet";
import { proto as LoginPacketProto } from "./protos/LoginPacket";
import { proto as LoginPacketResponseProto } from "./protos/LoginPacketResponse";
import { proto as HeaderProto } from "./protos/Header";
import { proto as CMSRequestProto } from "./protos/CMSRequest";
import { proto as CMSRequestResponseProto } from "./protos/CMSRequestResponse";
import { proto as ResponseHeaderProto } from "./protos/ResponseHeader";
import { cms, CMSTitles } from "./CMSFiles";
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

type EndPoints =
  | "socket-gateway.prod.flamingo.apelabs.net"
  | "socket-gateway.prod.robin.apelabs.net";

export type Service = "userservice" | "cmsservice" | "gameservice";

interface CMSVersion {
  name: CMSTitles;
  version: string;
  hash: string;
  url: string;
}

interface Header {
  version: string;
  service: Service;
  rpc: string;
  id?: string;
  base64?: string;
}

interface Options {
  stringifyBuffer: boolean;
}

export class PacketServer {
  id: string = "";
  base64: string = "";
  isAuthenticated: boolean = false;
  socket: tls.TLSSocket | null = null;
  endPoint: EndPoints;
  stringifyBuffers: boolean = false;

  constructor(endPoint: EndPoints) {
    this.endPoint = endPoint;
  }

  getRandomRpc(index: number) {
    return `rpc-${index}-${getRandom(100000, 999999)}`;
  }
  options(options: Options) {
    this.stringifyBuffers = options.stringifyBuffer ?? false;
  }
  async authenticate() {
    this.socket = tls.connect(443, this.endPoint);

    const body = {
      id: 1,
      type: 7,
      version: "999.9.9.9999",
      timestamp: Date.now(),
      data: [
        {
          id: randomUUID(),
          unknown: 3,
        },
      ],
    };

    const response = await this.writePacket(
      "userservice",
      1,
      body,
      LoginPacketProto
    );
    const json = response.toJson(ResponseHeaderProto, LoginPacketResponseProto);
    if (json.body.httpCode === 200) {
      this.base64 = json.body.auth[0].base64;
      this.id = json.body.unknown1;
      this.isAuthenticated = true;
    }
  }
  async writePacket(
    service: Service,
    rpcValue: number,
    body: any,
    bodyProto: any,
    extraHeader?: any
  ): Promise<Packet> {
    const self = this;

    const packet = new Packet();
    const header: Header = {
      version: "999.9.9.99999",
      service,
      rpc: this.getRandomRpc(rpcValue),
      ...extraHeader,
    };

    if (this.isAuthenticated) {
      header.id = this.id;
      header.base64 = this.base64;
    }

    packet.setHeader(header, HeaderProto);
    packet.setBody(body, bodyProto);

    const p = packet.build();

    return new Promise((resolve) => {
      let expectedLength = 0;
      let finalData = Buffer.alloc(0);

      const get = async (data: any) => {
        if (!expectedLength) {
          expectedLength = data.readUInt32BE();
        }
        if (data.length - 4 === expectedLength) {
          self.socket?.off("data", get);
          resolve(new Packet().read(data));
          expectedLength = 0;
        } else {
          finalData = Buffer.concat([finalData, data]);
          if (finalData.length - 4 === expectedLength) {
            self.socket?.off("data", get);
            resolve(new Packet().read(finalData));
            expectedLength = 0;
            finalData = Buffer.alloc(0);
          }
        }
      };

      self.socket?.on("data", get);
      self.socket?.write(p);
    });
  }
  async getCMS(): Promise<CMSVersion[]> {
    await this.authenticate();

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

    const response = await this.writePacket(
      "cmsservice",
      2,
      cmsRequest,
      CMSRequestProto
    );
    const json = response.toJson(ResponseHeaderProto, CMSRequestResponseProto);

    return json.body.cms[0].cms[0].cms;
  }
  async getCMSFile(title: CMSTitles) {
    const cms = await this.getCMS();
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

  async getParsedCMSFile(title: CMSTitles) {
    const file = await this.getCMSFile(title);
    const reader = new ProtobufReader(file);

    let parsed;

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
  safeBuffer(data: Record<any, any>) {
    return data.map((item) => {
      const cleanItem = { ...item };

      // Remove or condvert Buffer fields
      Object.keys(cleanItem).forEach((key) => {
        if (cleanItem[key] instanceof Buffer) {
          cleanItem[key] = JSON.stringify(cleanItem[key]);
        }
      });

      return cleanItem;
    });
  }
}

export default PacketServer;
