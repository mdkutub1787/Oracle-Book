import { MarineBillModel } from "./MarineBill.Model";


export class MarineMoneyReceiptModel {
    id?: number;
    issuingOffice?: string;
    classOfInsurance?: string;
    date?: string;
    modeOfPayment?: string;
    issuedAgainst?: string;
   
    marinebill?: MarineBillModel;
}
