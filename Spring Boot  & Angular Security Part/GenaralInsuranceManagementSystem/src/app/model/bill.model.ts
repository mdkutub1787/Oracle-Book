
import { PolicyModel } from "./policy.model";

export class BillModel {
    "id"!: number;
    "fire"!: number
    "rsd"!: number;
    "netPremium"!: number;
    "tax"!: number;
    "grossPremium"!: number;

    policy!:PolicyModel

}