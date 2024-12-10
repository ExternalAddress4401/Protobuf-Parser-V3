import { getRandom } from "../utils/getRandom";
import tls from "tls";
import { randomUUID } from "crypto";
import Packet from "./Packet";
import { proto as LoginPacketProto } from "./protos/LoginPacket";
import { proto as ResponseHeaderProto } from "./protos/ResponseHeader";
import { proto as LoginPacketResponseProto } from "./protos/LoginPacketResponse";
import { proto as HeaderProto } from "./protos/Header";

type EndPoints = "socket-gateway.prod.flamingo.apelabs.net";
export type Service = "userservice" | "cmsservice" | "gameservice";

interface Header {
  version: string;
  service: Service;
  rpc: string;
  id?: string;
  base64?: string;
}

class PacketServer {
  id: string = "";
  base64: string = "";
  isAuthenticated: boolean = false;
  socket: tls.TLSSocket | null = null;
  endPoint: EndPoints;

  constructor(endPoint: EndPoints) {
    this.endPoint = endPoint;
  }

  getRandomRpc(index: number) {
    return `rpc-${index}-${getRandom(100000, 999999)}`;
  }
  async authenticate() {
    this.socket = tls.connect(443, "socket-gateway.prod.flamingo.apelabs.net");

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
}

export default PacketServer;
