from django.db import models


class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.username

class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallets')
    name = models.CharField(max_length=150)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    alltimeExpenses = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    alltimeIncome = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    
    class Meta:
        unique_together = ['user', 'name'] 
    
    def __str__(self):
        return f"{self.user.username}'s {self.name} - Balance: {self.balance}"