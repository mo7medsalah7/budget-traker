import styled from "styled-components";

const ButtonContainer = styled.a`
  cursor: pointer;
  font-size: 1rem;
  padding: 0.6rem;
  background: ${(props) => (props.primaryBtn ? "#001f3f" : "#fff")};
  color: ${(props) => (props.primaryBtn ? "#fff" : "#001f3f")};
  border-bottom: ${(props) =>
    props.secondaryBtn ? "1px solid #001f3f" : null};
  span {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.2px;
  }
`;

function Button({ buttonContent, primaryBtn, secondaryBtn, clicked }) {
  return (
    <ButtonContainer
      onClick={clicked}
      primaryBtn={primaryBtn}
      secondaryBtn={secondaryBtn}
    >
      <span>{buttonContent}</span>
    </ButtonContainer>
  );
}

export default Button;
