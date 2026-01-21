# Fundi
### Objectives
1. **MVP:** Core features for saving and declaring expenses (recurring/monthly or one-time), basic statistics, and a dashboard.    
2. **Future:** AI integration.
---
### Data Model

- **Expense:**
    - Amount
    - Description
    - Category (FK)
- **Recurring/Monthly Expense:**
    - Amount
    - Description
    - Category (FK)
    - Billing/Deduction Date
- **Income:**
    - Amount
    - Description
    - Frequency (Monthly, Weekly)
- **Category:**
    - Name
    - Priority Level (1-10)
---
### Functionalities
1. **Log an Expense:** Record a one-time transaction.
2. **Declare a Monthly Expense:** Set up a recurring payment.
### Calculated Statistics
- **Net Balance:** Total remaining (positive or negative) at the end of the month.
- **Low-Priority Spending:** Total spent on items with a priority level of 5 or lower (adjustable threshold).

---