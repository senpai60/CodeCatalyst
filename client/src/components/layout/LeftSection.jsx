import CodeContainer from "../ui/CodeContainer";
import InputBasic from "../ui/InputBasic";
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
          issue:
            "Consider using const instead of let since total is reassigned",
          suggestion: "Use let only when reassignment is necessary",
        },
        {
          severity: "low",
          line: 3,
          issue:
            "Traditional for loop can be replaced with more modern array methods",
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
    <section className="left-main h-full">
      <NavMain />
      <section className="w-full px-5 pb-2">
        <InputBasic />
      </section>

      <section className="code-review-display h-[75svh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-950 scrollbar-">
        {dummyCodeReview.map((codeReview, reviewIndex) => (
          <div
            key={reviewIndex}
            className="review h-30 px-5 mt-10 grid-flow-col-dense"
          >
            <p className="text-sm text-gray-400 italic px-20 my-5">
              🧩 {codeReview.prompt}
            </p>

            {/* --- Code Block --- */}
            <div className="code rounded-2xl p-10 bg-zinc-900 relative">
              <CodeContainer codeReview={codeReview} code={codeReview.code} />
            </div>

            {/* --- Review Summary --- */}
            <div className="px-20 mt-6 text-sm text-gray-300 space-y-4">
              <p>
                <span className="font-semibold text-emerald-400">
                  Overall Review:
                </span>{" "}
                {codeReview.review.overall} ({codeReview.review.score}/10)
              </p>

              {/* Strengths */}
              <div>
                <p className="font-semibold text-blue-400 mb-1">✅ Strengths</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {codeReview.review.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Issues */}
              <div>
                <p className="font-semibold text-rose-400 mb-1">⚠️ Issues</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  {codeReview.review.issues.map((issue, i) => (
                    <li key={i}>
                      <span className="text-yellow-300 font-medium">
                        {issue.severity.toUpperCase()}
                      </span>
                      {issue.line && (
                        <span className="text-gray-500 ml-1">
                          (Line {issue.line})
                        </span>
                      )}
                      : {issue.issue}
                      <br />
                      <span className="text-green-400">
                        💡 Suggestion: {issue.suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improved Code */}
              <div>
                <p className="font-semibold text-indigo-400 mb-2">
                  ✨ Improved Code Suggestion
                </p>
                <div className="code rounded-2xl p-10 bg-zinc-900">
                  <CodeContainer codeReview={codeReview} code={codeReview.review.improvedCode} />
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <p className="font-semibold text-amber-400 mb-1">
                  🧠 Recommendations
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {codeReview.review.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  📊 <span className="font-semibold">Complexity:</span>{" "}
                  {codeReview.review.complexity}
                </p>
                <p>
                  🧾 <span className="font-semibold">Readability:</span>{" "}
                  {codeReview.review.readability}
                </p>
                <p>
                  🧩 <span className="font-semibold">Maintainability:</span>{" "}
                  {codeReview.review.maintainability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default LeftSection;
