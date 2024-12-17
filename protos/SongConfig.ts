import { CMSField } from "../interfaces/CMSField";
import { Gradient } from "../interfaces/Gradient";

export interface SongConfig {
  version: string;
  GameSKUs: {
    id: number;
    idLabel: string;
  }[];
  Beatmaps: {
    id: number;
    availability: number;
    Song_id: number;
    idLabel: string;
    BeatmapVariantReference_id: number;
  }[];
  BeatmapVariants: {
    id: number;
    idLabel: string;
    Song_id: number;
    MaxNumLanes: number;
    MaxScore: number;
    Difficulty_id: number;
    Version: number;
    isComplete: number;
    InteractionsReference_id: number;
    NumStars: number;
    InteractionsAsset_id: string;
    botScoreCurve: {};
    Description: string;
    BeatmapType: number;
  }[];
  Songs: {
    id: number;
    BPM: number;
    weightingTags: {
      tag_id: number;
      weight3dp: number;
    }[];
    CoverArtAsset_id: string;
    TimeSignature: number;
    BaseColor: string;
    DarkColor: string;
    ColorGradient: Gradient;
    GenreTagsId: number;
    WwiseSwitch: {
      switchId: number;
      switchState: number;
    };
    CheckpointOutlineColour: string;
    ColorGradientInGame: Gradient;
    StreakConfig: {
      GlowColor: string;
      PerfectBarColor: string;
      InvertPerfectBar: boolean;
      VFXColor: string;
      WhizzbangColor: number;
    }[];
    TrackIntensityGlow: string;
    VFXColor: string;
    InvertPerfectBarColor: boolean;
    Audiobanks_id: number;
    BibleId: string;
    idLabel: string;
    ISRC: string;
    LegalState: number;
    LegalAttribution: string;
    SongTitleLocId: string;
    SongArtistLocId: string;
    Rejected: boolean;
    MusicKitData_id: number;
    Groups_id: number;
    removalReason: string;
    songMetaId: number;
    sku_id: number;
    audioAsset_id: string;
    TrackGlow: number;
  }[];
  SongDifficulties: {
    id: number;
    difficulty: number;
    idLabel: string;
  }[];
  SongTags: {
    id: number;
    idLabel: string;
    sku_id: number;
  }[];
  SongWeightingTags: {
    id: number;
    idLabel: string;
  }[];
  BanGroups: {
    id: string;
    blanketBanned: boolean;
  }[];
  SongGroups: {
    id: number;
    idLabel: string;
  }[];
  SongMetas: {
    id: number;
    idLabel: string;
  }[];
  SongArtists: {
    id: string;
    trivia_id: string[];
    albumArtSuitableForLoadingScreen: boolean;
  }[];
  SongSelectionWeightings: {
    id: number;
    idLabel: string;
    totaliser: number;
    shuffle: number;
    easyQueue: number;
    box: number;
  }[];
}

export const proto: Record<number, CMSField> = {
  1: {
    name: "version",
    type: "string",
  },
  3: {
    name: "GameSKUs",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  4: {
    name: "Beatmaps",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      5: {
        name: "availability",
        type: "varint",
      },
      21: {
        name: "Song_id",
        type: "varint",
      },
      37: {
        name: "idLabel",
        type: "string",
      },
      46: {
        name: "BeatmapVariantReference_id",
        type: "varint",
      },
    },
  },
  5: {
    name: "BeatmapVariants",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
      3: {
        name: "Song_id",
        type: "varint",
      },
      4: {
        name: "MaxNumLanes",
        type: "varint",
      },
      5: {
        name: "MaxScore",
        type: "varint",
      },
      6: {
        name: "Difficulty_id",
        type: "varint",
      },
      8: {
        name: "Version",
        type: "varint",
      },
      9: {
        name: "isComplete",
        type: "varint",
      },
      10: {
        name: "InteractionsReference_id",
        type: "varint",
      },
      12: {
        name: "NumStars",
        type: "varint",
      },
      13: {
        name: "InteractionsAsset_id",
        type: "string",
      },
      14: {
        name: "botScoreCurve",
        type: "group",
        fields: {},
      },
      15: {
        name: "Description",
        type: "string",
      },
      16: {
        name: "BeatmapType",
        type: "varint",
      },
    },
  },
  6: {
    name: "Songs",
    type: "group",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      5: {
        name: "BPM",
        type: "float",
      },
      7: {
        name: "weightingTags",
        type: "packed",
        fields: {
          1: {
            name: "tag_id",
            type: "varint",
          },
          2: {
            name: "weight3dp",
            type: "varint",
          },
        },
      },
      19: {
        name: "CoverArtAsset_id",
        type: "string",
      },
      22: {
        name: "TimeSignature",
        type: "varint",
      },
      39: {
        name: "BaseColor",
        type: "string",
      },
      40: {
        name: "DarkColor",
        type: "string",
      },
      45: {
        name: "ColorGradient",
        type: "chunk",
        chunk: "Gradient",
      },
      50: {
        name: "GenreTagsId",
        type: "varint",
      },
      53: {
        name: "WwiseSwitch",
        type: "group",
        fields: {
          1: {
            name: "switchId",
            type: "varint",
          },
          2: {
            name: "switchState",
            type: "varint",
          },
        },
      },
      56: {
        name: "CheckpointOutlineColour",
        type: "string",
      },
      60: {
        name: "ColorGradientInGame",
        type: "chunk",
        chunk: "Gradient",
      },
      61: {
        name: "StreakConfig",
        type: "group",
        fields: {
          2: {
            name: "GlowColor",
            type: "string",
          },
          3: {
            name: "PerfectBarColor",
            type: "string",
          },
          4: {
            name: "InvertPerfectBarColor",
            type: "boolean",
          },
          5: {
            name: "VFXColor",
            type: "string",
          },
          10: {
            name: "WhizzbangColor",
            type: "signed-varint",
          },
        },
      },
      62: {
        name: "TrackIntensityGlow",
        type: "string",
      },
      63: {
        name: "VFXColor",
        type: "string",
      },
      64: {
        name: "VFXAlternativeColor",
        type: "string",
      },
      65: {
        name: "Audiobanks_id",
        type: "varint",
      },
      66: {
        name: "BibleId",
        type: "string",
      },
      67: {
        name: "idLabel",
        type: "string",
      },
      68: {
        name: "ISRC",
        type: "string",
      },
      69: {
        name: "LegalState",
        type: "varint",
      },
      72: {
        name: "LegalAttribution",
        type: "string",
      },
      74: {
        name: "SilentBeats",
        type: "float",
      },
      76: {
        name: "SongTitleLocId",
        type: "string",
      },
      77: {
        name: "SongArtistLocId",
        type: "string",
      },
      78: {
        name: "Rejected",
        type: "boolean",
      },
      79: {
        name: "MusicKitData_id",
        type: "varint",
      },
      80: {
        name: "Groups_id",
        type: "varint", //repeating
      },
      83: {
        name: "RemovalReason",
        type: "string",
      },
      84: {
        name: "SongMetaId",
        type: "varint",
      },
      85: {
        name: "sku_id",
        type: "varint",
      },
      86: {
        name: "audioAsset_id",
        type: "string",
      },
      90: {
        name: "TrackGlow",
        type: "varint",
      },
    },
  },
  7: {
    name: "SongDifficulties",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      3: {
        name: "difficulty",
        type: "varint",
      },
      15: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  8: {
    name: "SongTags",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      14: {
        name: "idLabel",
        type: "string",
      },
      21: {
        name: "sku_id",
        type: "varint",
      },
    },
  },
  10: {
    name: "SongWeightingTags",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  11: {
    name: "BanGroups",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      4: {
        name: "blanketBanned",
        type: "boolean",
      },
      6: {
        name: "removalType",
        type: "varint",
      },
      7: {
        name: "hideCoverArt",
        type: "boolean",
      },
    },
  },
  12: {
    name: "SongGroups",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  13: {
    name: "SongMetas",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
    },
  },
  14: {
    name: "SongArtists",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "trivia_id",
        type: "string-repeat",
      },
      3: {
        name: "albumArtSuitableForLoadingScreen",
        type: "boolean",
      },
    },
  },
  15: {
    name: "SongSelectionWeightings",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "varint",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
      3: {
        name: "totaliser",
        type: "varint",
      },
      4: {
        name: "shuffle",
        type: "varint",
      },
      5: {
        name: "easyQueue",
        type: "varint",
      },
      6: {
        name: "box",
        type: "varint",
      },
    },
  },
};
