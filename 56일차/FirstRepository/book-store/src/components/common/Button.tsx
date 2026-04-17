import styled from "styled-components";
import { ButtonSchema, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // 버튼의 사이즈
  size: ButtonSize;
  // 버튼의 기본적인 스타일 border, background, textcolor
  schema: ButtonSchema;
  // 버튼을 누를 수 있는지 상태
  disabled?: boolean;
  // 버튼을 클릭했을 때 여러번 눌리지 않도록 로딩 상태
  isLoading?: boolean;
}

function Button({
  children,
  size,
  schema,
  disabled,
  isLoading,
  ...props
}: Props) {
  return (
    <ButtonStyle
      size={size}
      schema={schema}
      disabled={disabled}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].color};
  background-color: ${({ theme, schema }) =>
    theme.buttonSchema[schema].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
`;

export default Button;
