import React from "react";
import { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

// budget{id, name, max}
// expense {id,budgetId, name, desc, amount}

export function useBudget() {
  return useContext(BudgetsContext);
}

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const viewBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => {
      console.log(expense);
      return expense.budgetId === budgetId;
    });
  };

  function addBudget({ name, max }) {
    // if (!name || !max) {
    //   setBudgets((prevBudgets) => {
    //     prevBudgets = {};
    //     return prevBudgets;
    //   });
    // }
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  const deleteBudget = ({ id }) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };
  const addExpense = ({ name, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      if (prevExpenses.find((expense) => expense.name === name))
        return prevExpenses;

      return [...prevExpenses, { id: uuidV4(), name, amount, budgetId }];
    });
  };
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        viewBudgetExpenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
