import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 50px;
  border-color: #ffe81f;
  background: ${(props) => (props.isSelected ? '#FFCC33' : '#000')};
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
  color: #fff;
  font-weight: 600px;
  font-size: small;
  margin: 10px;
  margin-bottom: 30px;
  padding: 10px 30px;
  cursor: pointer;
`
