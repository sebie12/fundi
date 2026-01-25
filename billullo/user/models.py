from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    # email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # date_joined = models.DateTimeField(auto_now_add=True)
    wallet = models.OneToOneField('Wallet', on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.username

class Wallet(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    alltimeExpenses = models.DecimalField(max_digits=15, decimal_places=2)
    alltimeIncome = models.DecimalField(max_digits=15, decimal_places=2)
    def __str__(self):
        return f"Wallet - Balance: {self.balance}"
