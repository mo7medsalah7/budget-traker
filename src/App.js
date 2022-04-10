import { useBudget } from "./contexts/BudgetsContext";
import styled from "styled-components";
import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Button from "./components/Button";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "./styles.css";
import AddExpenseModal from "./components/AddExpenseModal";

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: Montserrat, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  .header-buttons {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
  }
  h1 {
    font-size: 2rem;
    span {
      color: #d24;
    }
  }
`;

const CardsContainer = styled.div`
  margin-top: 2rem;
  padding: 0px 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
`;
function App() {
  const { budgets, viewBudgetExpenses } = useBudget();
  console.log(budgets);
  return (
    <>
      <ModalProvider>
        <Container>
          <Header>
            <h1>
              Budget<span>+</span>
            </h1>
            <div className="header-buttons">
              <AddBudgetModal btnContent="Add Budget" />
              <AddExpenseModal secondaryBtn btnContent="Add Expense" />
            </div>
          </Header>
          {/* Cards */}
          <CardsContainer>
            {budgets.map((budget) => {
              const amount = viewBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                />
              );
            })}
          </CardsContainer>
        </Container>
      </ModalProvider>
    </>
  );
}

export default App;
