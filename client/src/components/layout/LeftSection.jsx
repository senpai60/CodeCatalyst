import { Routes, Route } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import NavMain from "./NavMain";

const dummyCodeReview = [
  {
    prompt: `Reviewing code for potential improvements in readability,
              maintainability, and performance...`,
    code: `import java.util.*;

// Base abstract class representing a general bank account
abstract class BankAccount {
    protected String accountNumber;
    protected String holderName;
    protected double balance;
    protected List<String> transactionHistory;

    public BankAccount(String accountNumber, String holderName, double initialDeposit) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = initialDeposit;
        this.transactionHistory = new ArrayList<>();
        transactionHistory.add("Account created with initial deposit: " + initialDeposit);
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getHolderName() {
        return holderName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit amount must be positive!");
            return;
        }
        balance += amount;
        transactionHistory.add("Deposited: " + amount + " | Balance: " + balance);
        System.out.println("Successfully deposited ₹" + amount);
    }

    public abstract void withdraw(double amount);

    public void showTransactionHistory() {
        System.out.println("\\n--- Transaction History for " + holderName + " ---");
        for (String log : transactionHistory) {
            System.out.println(log);
        }
    }
}
`,
    language: "java",
    review: {
      overall: "Good",
      score: 7.5,
      strengths: [
        "Clear function name that describes its purpose",
        "Simple and straightforward logic",
        "Handles basic calculation correctly",
      ],
      issues: [
        {
          severity: "medium",
          line: 2,
          issue: "Consider using const instead of let since total is reassigned",
          suggestion: "Use let only when reassignment is necessary",
        },
        {
          severity: "low",
          line: 3,
          issue: "Traditional for loop can be replaced with more modern array methods",
          suggestion: "Consider using reduce() for cleaner functional approach",
        },
        {
          severity: "low",
          line: null,
          issue: "Missing input validation",
          suggestion: "Add checks for empty array or invalid item structure",
        },
      ],
      improvedCode: `function calculateTotal(items) {
  if (!items || items.length === 0) {
    return 0;
  }
  
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}`,
      recommendations: [
        "Add JSDoc comments to document parameters and return type",
        "Consider adding error handling for invalid price or quantity values",
        "Use TypeScript for better type safety",
      ],
      complexity: "Low",
      readability: "High",
      maintainability: "Medium",
    },
  },
];

function LeftSection() {
  return (
    <section className="left-main h-full overflow-auto code-review-display">
      <NavMain />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<HomePage dummyCodeReview={dummyCodeReview} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </section>
  );
}

export default LeftSection;
