import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

function EllipsisBox({ children, linelimit }: Props) {
  // 더보기시 모든 내용 출력을 위한 expanded
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          schema="normal"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "펼치기"}
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

// styledcomponent는 boolean값을 그냥 받을 수 없다..!
interface EllipsisBoxStyleProps {
  linelimit: number;
  $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    /* ... */
    text-overflow: ellipsis;
    display: -webkit-box;
    /* linelimit줄까지 보여줌 */
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? "none" : linelimit};
    -webkit-box-orient: vertical;
    padding: 20px 0 0;
    margin: 0;
  }
  .toggle {
    display: flex;
    justify-content: end;
  }
`;

export default EllipsisBox;
