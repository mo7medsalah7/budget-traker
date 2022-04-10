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
`;

function AddBudgetModal({ btnContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    setIsOpen(false);
    console.log(`Added ${nameRef}`);
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
      <Button primaryBtn buttonContent={btnContent} clicked={toggleModal} />

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
            <h4>Enter Your Budget</h4>
          </header>
          <FormWrapper>
            <div className="input-wrapper">
              <label>Name</label>
              <input ref={nameRef} type="text" name="Amount" />
            </div>
            <div className="input-wrapper">
              <label>Max</label>
              <input ref={maxRef} type="number" name="Max" />
            </div>
            <Button buttonContent="Submit" primaryBtn clicked={handleSubmit} />
          </FormWrapper>
        </ModalLayout>
      </StyledModal>
    </>
  );
}

export default AddBudgetModal;
