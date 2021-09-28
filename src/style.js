import styled from 'styled-components'
// Colors
var selectBorder = '#777'
// var selectFocus = 'blue'
var selectArrow = selectBorder

export const SelectWrapper = styled.div`
  width: 100%;
  margin-right: 90px;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid ${selectBorder};
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  display: grid;

  &::after {
    content: '';
    width: 0.8em;
    height: 0.5em;
    background-color: ${selectArrow};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }
  select {
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    grid-area: select;
    /* color: #fff; */
    &::-ms-expand {
      display: none;
    }
  }
`
