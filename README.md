# Billullo

### Objectives
1. **MVP:** Core features for managing wallets, tracking expenses (one-time & recurring), and viewing financial health.
2. **Future:** AI integration for smart insights.

---

### Data Model

![Database Schema](images/image.png)

- **User:** App account holder.
- **Wallet:** Container for funds (linked to User). Tracks current balance and all-time totals.
- **Category:** Expense classification with a `Priority Level` (1-10).
- **Expense:** One-time transaction linked to a specific **Wallet** and **Category**.
- **Monthly Expense:** Recurring obligation linked to a **Wallet**, with a specific billing date.
- **Income:** Earnings source linked to a **Wallet**, including frequency.
- **Savings Goal:** Targets for saving specific amounts by a specific date.

---

### Functionalities
1. **Create Wallets:** Manage multiple accounts/funds per user.
2. **Log Transactions:** Record expenses or income to specific wallets.
3. **Set Recurring Payments:** Automate monthly obligations.

### Calculated Statistics
- **Net Balance:** Real-time wallet balance (Income - Expenses).
- **Low-Priority Spending:** Aggregated spend on categories with priority ≤ 5.
- **Wallet Health:** Comparison of `alltimeIncome` vs `alltimeExpenses`.

### Future Tasks (When App is Working):
- [ ] Dockerize backend
- [ ] Set up production database
- [ ] Configure Nginx
- [ ] Build Electron/WebView wrapper
- [ ] Deploy to server