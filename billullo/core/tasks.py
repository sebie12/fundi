# expenses/tasks.py
from celery import shared_task
from django.utils import timezone
from django.db import transaction
from datetime import timedelta
from .models import Expense
from user.models import Wallet

@shared_task
def process_recurring_expenses():
    """
    Process all recurring expenses (weekly and monthly).
    Runs daily at midnight.
    One-time expenses are only charged when created.
    """
    today = timezone.now().date()
    processed = 0
    failed = 0
    
    # Get weekly and monthly expenses (not one-time)
    recurring_expenses = Expense.objects.exclude(type='one-time')
    
    for expense in recurring_expenses:
        # Should we charge this expense today?
        if should_charge_today(expense, today):
            try:
                with transaction.atomic():
                    wallet = Wallet.objects.select_for_update().get(pk=expense.wallet.id)
                    
                    if wallet.balance >= expense.amount:
                        # Deduct the money
                        wallet.balance -= expense.amount
                        wallet.save()
                        
                        # Remember when we charged this
                        expense.last_deduction_date = today
                        expense.save()
                        
                        processed += 1
                        print(f"✓ Charged ${expense.amount} for '{expense.title}' ({expense.frequency})")
                    else:
                        failed += 1
                        print(f"✗ Not enough money for '{expense.title}'")
                        
            except Exception as e:
                failed += 1
                print(f"✗ Error with '{expense.title}': {e}")
    
    result = {
        'processed': processed,
        'failed': failed,
        'date': str(today)
    }
    print(f"\nRecurring expenses processed: {result}")
    return result


def should_charge_today(expense, today):
    """
    Decide if we should charge this expense today based on frequency.
    
    Logic:
    - Weekly: charge every 7 days
    - Monthly: charge once per month on the same day
    - One-time: never (handled at creation)
    """
    # Never charged before?
    if not expense.last_deduction_date:
        # Only charge if we've reached the initial date
        return today >= expense.date_incurred
    
    # Calculate days since last charge
    days_since_last_charge = (today - expense.last_deduction_date).days
    
    if expense.frequency == 'weekly':
        # Charge every 7 days
        return days_since_last_charge >= 7
    
    elif expense.frequency == 'monthly':
        # Calculate months since last charge
        months_passed = (today.year - expense.last_deduction_date.year) * 12 + \
                        (today.month - expense.last_deduction_date.month)
        
        # What day of month should we charge?
        charge_day = expense.date_incurred.day
        
        # Charge if it's been at least a month AND we're on/past the charge day
        return months_passed >= 1 and today.day >= charge_day
    
    # One-time expenses are never charged by the scheduled task
    return False


@shared_task
def test_task():
    """Simple test to check if Celery is working"""
    print("✓ Celery is working!")
    return "Success"