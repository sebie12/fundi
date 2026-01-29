import { User } from './types';
import {CreateCategoryDTO, CreateExpenseDTO} from './dtos'

export class DataService{
    async getCategories():Promise<Response>{
        const data = await fetch('/api/categories')
        return data;
    }
    async createCategory(name:string, priorityLevel:number):Promise<Response>{
        const categoryData : CreateCategoryDTO = {
            name: name,
            priorityLevel: priorityLevel
        }
        const data = await fetch('/api/wallets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        });
        return data;
    }

    async createExpense(
        
        title: string,
        amount: number,
        date: string,
        isMonthly: Boolean,
        walletId: number,
        category: number

    ):Promise<Response>{
        const expenseData : CreateExpenseDTO = {
            title: title,
            amount:amount,
            date: date,
            isMonthly: isMonthly,
            walletId: walletId,
            category: category
        }
        const data = fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        })
        return data
    }

}