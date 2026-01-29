from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ExpenseViewSet, 
    IncomeViewSet, SavingsGoalViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'expenses', ExpenseViewSet)
router.register(r'incomes', IncomeViewSet)
router.register(r'savings-goals', SavingsGoalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]