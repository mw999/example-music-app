import styled, { css } from "styled-components";

type FlexProps = {
  justify?: "space-between";
  direction?: "column" | "row";
  ySpace?: boolean;
  ySpaceSm?: boolean;
  xSpace?: boolean;
  xSpaceSm?: boolean;
};

const justifyContent = css<FlexProps>`
  ${(props) => {
    if (!props.justify) {
      return null;
    }

    return `justify-content: ${props.justify};'`;
  }}
`;

const direction = css<FlexProps>`
  ${(props) => {
    if (!props.direction) {
      return null;
    }

    return `flex-direction: ${props.direction};'`;
  }}
`;

const spacing = css<FlexProps>`
  & > * {
    ${(props) => props.ySpace && "margin-bottom: 1rem;"}
    ${(props) => props.ySpaceSm && "margin-bottom: 0.5rem;"}
    ${(props) => props.xSpace && "margin-right: 1rem;"}
    ${(props) => props.xSpaceSm && "margin-right: 0.5rem;"}
  }
  & > *:last-child {
    ${(props) => (props.ySpace || props.ySpaceSm) && "margin-bottom: 0;"}
    ${(props) => (props.xSpace || props.xSpaceSm) && "margin-right: 0;"}
  }
`;

const Flex = styled.div<FlexProps>`
  display: flex;
  ${spacing}
  ${direction}
  ${justifyContent}
`;

export default Flex;
