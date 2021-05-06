import styled from 'styled-components';

export const InputStyle = styled.input`
  display: inline-block;
  border: none;
  border-bottom: 1px solid #000000;
  background-color: #ffffff00;
  margin: 15px 0;
  width: ${(props) => (props.width ? props.width : 'inherit')};
  height: inherit;
  align-self: right;
  outline: none;

  &::-webkit-input-placeholder {
    color: rgba(61, 58, 58, 0.603);
    position: relative;
    padding-left: 0;
    -webkit-transition: 1s ease;
    transition: 1s ease;
  }

  &:hover::-webkit-input-placeholder,
  :focus::-webkit-input-placeholder {
    transform: translateX(50%);
  }
`;
