import { ReceiptModel } from "./receipt.model";

export class MoneyReceiptModel {
    id?: number;
    issuingOffice?: string;
    moneyReceiptNo?: number;
    classOfInsurance?: string;
    date?: string;
    receivedFrom?: string;
    modeOfPayment?: string;
    issuedAgainst?: string;
  
    receipt?: ReceiptModel;
}
