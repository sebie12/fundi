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
        const data = await fetch('/api/categories/', {
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
        type: string,
        walletId: number,
        category: number
        ): Promise<Response> {
        const expenseData: CreateExpenseDTO = {
            title: title,
            amount: amount,
            date_incurred: date,        
            type: type,     
            wallet: walletId,
            category: category
        }
        
        const data = await fetch('/api/expenses/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        })
        
        return data
    }

}