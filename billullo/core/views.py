from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db import transaction
from user.models import Wallet
from django.utils import timezone
from .models import Category, Expense, Income, SavingsGoal
from .serializers import (
    CategorySerializer, ExpenseSerializer, 
    IncomeSerializer, SavingsGoalSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        wallet = serializer.validated_data.get('wallet')
        amount = serializer.validated_data.get('amount')
        type = serializer.validated_data.get('type')
        with transaction.atomic():

            wallet = Wallet.objects.select_for_update().get(pk=wallet.id)
            
            if wallet.balance < amount:
                return Response(
                    {'error': 'Insufficient wallet balance'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            wallet.balance -= amount
            wallet.save()
            
            # self.perform_create(serializer)
            expense = serializer.save()
            if type in ['weekly', 'monthly']:
                expense.last_deduction_date = timezone.now().date()
                expense.save()

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class SavingsGoalViewSet(viewsets.ModelViewSet):
    queryset = SavingsGoal.objects.all()
    serializer_class = SavingsGoalSerializer