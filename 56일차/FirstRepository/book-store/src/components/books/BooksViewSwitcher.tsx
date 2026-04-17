import styled from "styled-components";
import Button from "../common/Button";
import { ReactComponent as GridIcon } from "../../assets/images/grid.svg";
import { ReactComponent as ListIcon } from "../../assets/images/list.svg";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";

const viewOptions = [
  {
    value: "list",
    icon: ListIcon,
  },
  {
    value: "grid",
    icon: GridIcon,
  },
];

export type ViewMode = "grid" | "list";

// gridview와 listview
function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };
  // 첫 시작시 view가 존재하지 않을때
  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);
  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            size="medium"
            schema={
              searchParams.get(QUERYSTRING.VIEW) === option.value
                ? "primary"
                : "normal"
            }
            onClick={() => handleSwitch(option.value)}
          >
            <Icon />
          </Button>
        );
      })}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: white;
  }
`;

export default BooksViewSwitcher;
