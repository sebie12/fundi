from rest_framework import viewsets
from .models import Wallet, Category, Expense, MonthlyExpense, Income, SavingsGoal
from .serializers import (
    WalletSerializer, CategorySerializer, ExpenseSerializer, 
    MonthlyExpenseSerializer, IncomeSerializer, SavingsGoalSerializer
)

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class MonthlyExpenseViewSet(viewsets.ModelViewSet):
    queryset = MonthlyExpense.objects.all()
    serializer_class = MonthlyExpenseSerializer

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class SavingsGoalViewSet(viewsets.ModelViewSet):
    queryset = SavingsGoal.objects.all()
    serializer_class = SavingsGoalSerializer