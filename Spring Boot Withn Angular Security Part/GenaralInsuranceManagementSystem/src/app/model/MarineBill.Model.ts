import { MarineDetailsModel } from "./MarineDetailsModel";


export class MarineBillModel {

    "id"!: number;
    "marineRate"!: number
    "warSrccRate"!: number;
    "netPremium"!: number;
    "tax"!: number;
    "stampDuty"!: number;
    "grossPremium"!: number;
    marineDetails!: MarineDetailsModel ;

   

}