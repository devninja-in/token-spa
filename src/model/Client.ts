export interface IClient {
    name: string;
    items: IItem[];
    itemConfigurations: IItemConfigurations[];
}

export interface IItem {
    name: string;
    uiFields: IUIFields[];
}

export interface IUIFields {
    name: string;
    label: string;
    type: string;
    maxLength: number;
    required: boolean;
}

export interface IItemConfigurations {
    "day": "string";
    "sellStartTime": "string";
    "sellEndTime": "string";
    "tokenGenerationStart": "string";
    "slotDuration": "string";
    "personPerSlot": number;
}

