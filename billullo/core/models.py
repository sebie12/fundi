from django.db import models

class Wallet(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    alltimeExpenses = models.DecimalField(max_digits=15, decimal_places=2)
    alltimeIncome = models.DecimalField(max_digits=15, decimal_places=2)
    def __str__(self):
        return f"Wallet - Balance: {self.balance}"

from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100)
    priorityLevel = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
class Expense(models.Model):
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_incurred = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.title} - {self.amount} on {self.date_incurred}"
    
class MonthlyExpense(models.Model):
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    billingDate = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.description} {self.category.name} - {self.amount} on {self.billingDate}"
    
class Income(models.Model):
    source = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_received = models.DateField()
    frequency = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.source} - {self.amount} on {self.date_received}"
    
class SavingsGoal(models.Model):
    name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=15, decimal_places=2)
    current_amount = models.DecimalField(max_digits=15, decimal_places=2)
    target_date = models.DateField()
    def __str__(self):
        return f"{self.name} - Target: {self.target_amount}, Current: {self.current_amount}"