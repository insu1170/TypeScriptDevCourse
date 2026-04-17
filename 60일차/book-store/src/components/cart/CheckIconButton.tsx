import styled from "styled-components";
import { ReactComponent as Circle } from "../../assets/images/circle.svg";

import { ReactComponent as CheckCircle } from "../../assets/images/check_circle.svg";
interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

function CheckIconButton({ isChecked, onCheck }: Props) {
  return (
    <CheckIconButtonStyle onClick={onCheck}>
      {isChecked ? <CheckCircle /> : <Circle />}
    </CheckIconButtonStyle>
  );
}

const CheckIconButtonStyle = styled.div`
  background: none;
  border: 0;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
