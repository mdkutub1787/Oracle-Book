
import { BillModel } from "./bill.model";

export class MoneyReceiptModel {
    id?: number;
    issuingOffice?: string;
    classOfInsurance?: string;
    date?: string;
    modeOfPayment?: string;
    issuedAgainst?: string;
   
    bill?: BillModel;
}
