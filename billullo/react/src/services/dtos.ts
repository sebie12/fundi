import { Wallet, User, Category, Expense } from "./types";

export type CreateWalletDTO = Omit<Wallet, 'id'>;

export type CreateUserDTO = Omit<User, 'id'>

export type CreateCategoryDTO = Omit<Category, 'id'>

export type CreateExpenseDTO = Omit<Expense, 'id'>