import { CMSField } from "../interfaces/CMSField";

export interface AudioConfig {
  AudioTriggers: {
    id: number;
    audioEvent_id: number;
    idLabel: string;
  }[];
  AudioEvents: {
    id: number;
    wwiseEvent: number;
    idLabel: string;
  }[];
  version: string;
  EQEntries: {
    id: number;
    order: number;
    rtpc: {
      rtpcId: number;
    };
    amountOfEQ: number;
    idLabel: string;
  }[];
  Settings: {
    MuteTrigger_id: number;
    UnmuteTrigger_id: number;
    CompanyLogoFlowEnterTrigger_id: number;
    CompanyLogoFlowExitTrigger_id: number;
    bootupPreloadAssets_id: string[];
    BootLogoFlowEnter_id: number;
    BootLogoFlowExit_id: number;
    LoadingScreenTitle_id: string;
    GameLogoBankAsset_id: string;
    PersistentBankAsset_id: string;
    InitBankAsset_id: string;
    MusicSystemMetaBankAsset_id: string;
    PlaceholderSongBankAsset_id: string;
  };
  EventSystem_id: string;
  GameCanvas_id: string;
}

export const proto: Record<number, CMSField> = {
  1: {
    name: "AudioTriggers",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      6: {
        name: "audioEvent_id",
        type: "varint",
      },
      7: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  2: {
    name: "AudioEvents",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      3: {
        name: "wwiseEvent",
        type: "varint",
      },
      6: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  100: {
    name: "version",
    type: "string",
  },
  109: {
    name: "EQEntries",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "order",
        type: "varint",
      },
      3: {
        name: "rtpc",
        type: "group",
        fields: {
          1: {
            name: "rtpcId",
            type: "varint",
          },
        },
      },
      4: {
        name: "amountOfEQ",
        type: "varint",
      },
      5: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  1001: {
    name: "Settings",
    type: "group",
    fields: {
      10: {
        name: "MuteTrigger_id",
        type: "varint",
      },
      11: {
        name: "UnmuteTrigger_id",
        type: "varint",
      },
      13: {
        name: "CompanyLogoFlowEnterTrigger_id",
        type: "varint",
      },
      14: {
        name: "CompanyLogoFlowExitTrigger_id",
        type: "varint",
      },
      15: {
        name: "bootupPreloadAssets_id",
        type: "string-repeat",
      },
      17: {
        name: "BootLogoFlowEnter_id",
        type: "varint",
      },
      18: {
        name: "BootLogoFlowExit_id",
        type: "varint",
      },
      19: {
        name: "LoadingScreenTitle_id",
        type: "string",
      },
      21: {
        name: "GameLogoBankAsset_id",
        type: "string",
      },
      22: {
        name: "PersistentBankAsset_id",
        type: "string",
      },
      23: {
        name: "InitBankAsset_id",
        type: "string",
      },
      24: {
        name: "MusicSystemMetaBankAsset_id",
        type: "string",
      },
      25: {
        name: "PlaceholderSongBankAsset_id",
        type: "string",
      },
    },
  },
  1002: {
    name: "EventSystem_id",
    type: "string",
  },
  1003: {
    name: "GameCanvas_id",
    type: "string",
  },
};
