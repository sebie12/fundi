import { Wallet, User } from "./types";

export type CreateWalletDTO = Omit<Wallet, 'id'>;

export type CreateUserDTO = Omit<User, 'id'>