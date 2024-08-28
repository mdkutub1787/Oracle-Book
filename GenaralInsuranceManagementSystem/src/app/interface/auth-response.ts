import { UserModel } from "../model/user.model";

export interface AuthResponse {

    token: string;
    user: UserModel;
}
