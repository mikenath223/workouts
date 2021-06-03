export interface IWrkIds {
  Id: string;
  updated: string;
}

export interface IWrk {
  Id: number;
  Name: string;
  Tss: number;
  AverageFtpPercent: number;
  Zones: string[];
  Description: string;
  Duration: string;
}

export interface IShow {
  [key: string]: boolean | string;
}

export interface INext {
  next: number;
  query: string;
}
