import styled from 'styled-components';

export const ScoreButton = styled.button`
  display:inline-flex;
  border:0;
  width:27px;
  margin:3px;
  border-radius:3px;
  border:#000 solid 1px;
  height:40px;
  font-size: 14px;
  padding:5px;
  cursor:pointer;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
  background-color:${props => props.theme};
  font-family:Arial, Helvetica, sans-serif;

&:hover {
  opacity:50%;
}
`