from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100)
    priorityLevel = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    def __str__(self):
        return self.name

class Expense(models.Model):
    wallet = models.ForeignKey('user.Wallet', on_delete=models.CASCADE, related_name='expenses')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_incurred = models.DateField()
    isMonthly = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.title} - {self.amount}"

class Income(models.Model):
    wallet = models.ForeignKey('user.Wallet', on_delete=models.CASCADE, related_name='incomes')
    source = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_received = models.DateField()
    frequency = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.source} - {self.amount}"

class SavingsGoal(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='savings_goals')
    name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=15, decimal_places=2)
    current_amount = models.DecimalField(max_digits=15, decimal_places=2)
    target_date = models.DateField()

    def __str__(self):
        return self.name