import { UserModel } from "./user.model";

export class TokenModule {
   
    id!: number;
    token!: string;
    user!: UserModel;
 }