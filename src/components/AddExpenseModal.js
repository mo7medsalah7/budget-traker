import { useRef, useState } from "react";
import Modal from "styled-react-modal";
import Button from "./Button";
import ModalLayout from "./ModalLayout";
import styled from "styled-components";
import { useBudget } from "../contexts/BudgetsContext";

const StyledModal = Modal.styled`

  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  height: 100%;
  label {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  .input-wrapper {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    input {
      padding: 8px;
    }
    label {
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
  .select-wrapper select {
    display: flex;
    justify-content: flex-start;
    background: transparent;
    width: 100%;
    outline: none;
    border: 1px solid #eed;
    padding: 0.7rem;
    margin-bottom: 0.9rem;
    cursor: pointer;

    option {
      padding: 10px;
      cursor: pointer;
    }
  }
`;

function AddExpenseModal({ btnContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      name: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    setIsOpen(false);
    console.log(`Added ${budgetIdRef}`);
  }

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  return (
    <>
      <Button secondaryBtn buttonContent={btnContent} clicked={toggleModal} />

      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <ModalLayout>
          <header>
            <h4>Enter Your Expense</h4>
          </header>
          <FormWrapper>
            <div className="input-wrapper">
              <label>Description</label>
              <input ref={descriptionRef} type="text" name="description" />
            </div>
            <div className="input-wrapper">
              <label>Amount</label>
              <input
                ref={amountRef}
                type="number"
                name="Amount"
                min={0}
                step={0.01}
              />
            </div>
            <div className="select-wrapper">
              <select ref={budgetIdRef}>
                <option>UnCategorized</option>
                {budgets.map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button buttonContent="Submit" primaryBtn clicked={handleSubmit} />
          </FormWrapper>
        </ModalLayout>
      </StyledModal>
    </>
  );
}

export default AddExpenseModal;
