import styled from 'styled-components'

export const Collapse = styled.div`
  min-width: 20ch;
  max-width: 35ch;
  display: ${(props) => (props.in ? 'block' : 'none')};
`

export const Alert = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.severity === 'error' ? 'red' : 'green'};
  border: 1px solid ${(props) => (props.severity === 'error' ? 'red' : 'green')};
  border-radius: 0.25em;
  padding: 0.5em 1em;
  color: #fff;
  display: flex;
  align-items: center;
  button {
    background: none;
    border: none;
    position: absolute;
    right: 1em;
    top: 0.5em;
    bottom: 0.5em;
    cursor: pointer;
  }
`
