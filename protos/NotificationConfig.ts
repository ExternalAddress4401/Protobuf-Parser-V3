import { CMSField } from "../interfaces/CMSField";

export interface NotificationConfig {
  id: string;
  view: string;
  title_id: string;
  body_id: string;
  channel_id: string;
  icon: string;
  bigIcon: string;
  iosBody_id: string;
  Channels: {
    id: string;
    idLabel: string;
    title_id: string;
    sound: string;
    vibration: boolean;
    light: boolean;
    requestPermissionsTip_id: string;
    cooldownInMinutes: number;
    requestPermissionsTipTitle_id: string;
    requestPermissionsTipTitleOk_id: string;
    requestPermissionsTipTitleCancel_id: string;
    requestSettingsTitle_id: string;
    requestSettingsBody_id: string;
    requestSettingsOk_id: string;
    requestSettingsCancel_id: string;
  }[];
  Schedules: {
    type: number;
    slice: any;
    id: number;
    idLabel: string;
    notificationOptions_id: string[];
    enabled: boolean;
  };
}

export const proto: Record<number, CMSField> = {
  1: {
    name: "Notifications",
    type: "packed",
    fields: {
      3: {
        name: "id",
        type: "string",
      },
      4: {
        name: "view",
        type: "string",
      },
      5: {
        name: "title_id",
        type: "string",
      },
      6: {
        name: "body_id",
        type: "string",
      },
      9: {
        name: "channel_id",
        type: "string",
      },
      12: {
        name: "icon",
        type: "string",
      },
      13: {
        name: "bigIcon",
        type: "string",
      },
      14: {
        name: "iosBody_id",
        type: "string",
      },
    },
  },
  2: {
    name: "Channels",
    type: "packed",
    fields: {
      1: {
        name: "id",
        type: "string",
      },
      2: {
        name: "idLabel",
        type: "string",
      },
      3: {
        name: "title_id",
        type: "string",
      },
      4: {
        name: "sound",
        type: "string",
      },
      5: {
        name: "vibration",
        type: "boolean",
      },
      6: {
        name: "light",
        type: "boolean",
      },
      7: {
        name: "requestPermissionsTip_id",
        type: "string",
      },
      8: {
        name: "cooldownInMinutes",
        type: "varint",
      },
      9: {
        name: "requestPermissionsTipTitle_id",
        type: "string",
      },
      10: {
        name: "requestPermissionsTipTitleOk_id",
        type: "string",
      },
      11: {
        name: "requestPermissionsTipTitleCancel_id",
        type: "string",
      },
      12: {
        name: "requestSettingsTitle_id",
        type: "string",
      },
      13: {
        name: "requestSettingsBody_id",
        type: "string",
      },
      14: {
        name: "requestSettingsOk_id",
        type: "string",
      },
      15: {
        name: "requestSettingsCancel_id",
        type: "string",
      },
    },
  },
  3: {
    name: "Schedules",
    type: "packed",
    fields: {
      1: {
        name: "type",
        type: "varint",
      },
      2: {
        name: "slice",
        type: "enum",
        enums: {
          2: "ReactivationBundleNotificationSchedule",
          102: "ChallengeNotificationSchedule",
          103: "SeasonNotificationSchedule",
          104: "LiveOpsEventNotificationSchedule",
          105: "PeriodicRequirementsSchedule",
          106: "ShopItemNotificationSchedule",
        },
      },
      3: {
        name: "id",
        type: "varint",
      },
      4: {
        name: "idLabel",
        type: "string",
      },
      6: {
        name: "notificationOptions_id",
        type: "string-repeat",
      },
      8: {
        name: "enabled",
        type: "boolean",
      },
    },
  },
};
