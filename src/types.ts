export interface IWrkIds {
  Id: string;
  updated: string
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