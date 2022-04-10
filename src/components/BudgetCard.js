import styled from "styled-components";
import { currencyFormatter } from "../utils";
import { CircleProgress } from "react-gradient-progress";
import Button from "./Button";
const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 2px solid #001f3f;
    h2 {
      font-weight: 500;
    }
    .max-amount {
      display: flex;
      align-items: baseline;
      span {
        opacity: 0.7;
        font-size: 0.8em;
      }
    }
  }
`;
const CircleProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const ButtonsWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

function BudgetCard({ name, amount, max }) {
  const amountFormatted = currencyFormatter.format(amount);
  const maxFormatted = currencyFormatter.format(max);
  let percentage = (amount / max) * 100;
  percentage = Number(percentage.toFixed(2));
  return (
    <>
      <Card>
        <header>
          <h2>{name}</h2>
          <div className="max-amount">
            {amountFormatted}
            <span>/ {maxFormatted}</span>
          </div>
        </header>
        <CircleProgressContainer>
          <CircleProgress
            percentage={percentage}
            strokeWidth={8}
            fontSize="32"
            font-family="Montserrat"
            strokeLinecap="butt"
            secondaryColor="#AAAAAA"
          />
        </CircleProgressContainer>
        <ButtonsWrapper>
          <Button buttonContent="Add Expense" secondaryBtn />
          <Button buttonContent="View Expense" primaryBtn />
        </ButtonsWrapper>
      </Card>
    </>
  );
}

export default BudgetCard;
