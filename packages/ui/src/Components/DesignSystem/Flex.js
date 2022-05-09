import styled, { css } from "styled-components";

const justifyContentValues = {
  between: "space-between",
};

const justifyContent = css`
  ${(props) => {
    if (!props.justify) {
      return null;
    }

    return `justify-content: ${justifyContentValues[props.justify]};'`;
  }}
`;

const directionValues = {
  column: "column",
  row: "row",
};

const direction = css`
  ${(props) => {
    if (!props.direction) {
      return null;
    }

    return `flex-direction: ${directionValues[props.direction]};'`;
  }}
`;

const Flex = styled.div`
  display: flex;

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

  ${direction}
  ${justifyContent}
`;

export default Flex;
