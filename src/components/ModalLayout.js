import styled from "styled-components";

const ModalLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function ModalLayout(props) {
  return <ModalLayoutWrapper>{props.children}</ModalLayoutWrapper>;
}

export default ModalLayout;
