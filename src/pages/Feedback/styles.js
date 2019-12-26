import styled from 'styled-components';

export const ScoreButton = styled.button`
  display:inline-flex;
  border:0;
  width:24px;
  margin:3px;
  border-radius:3px;
  border:#000 solid 1px;
  height:40px;
  font-size: 14px;
  padding:5px;
  justify-content: center; 
  cursor:pointer;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
  background-color:${props => props.theme};
  font-family:Arial, Helvetica, sans-serif;

  &:hover {
    opacity:50%;
  }
`
export const QuestionBox = styled.div`
  div{
    justify-content:center;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    display:flex;

  }
  button.btn{
    margin-top:20px;
    border: 0;
    border-radius: 2px;
    width: 100%;
    height: 42px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: bold;
    background: #f05a5b;
    color: #fff;
    cursor: pointer;
  }
`
export const QInput = styled.div`
    /* border: 2px dashed rgba(170,170,170,0.34); */    
    input{
      border-radius:5px;
      width:100%;
      height:100px;
      padding:5px;
      box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
    }
`

export const PHigh = styled.p`
  font-weight:bold;
  margin:10px;
`
export const Kbutton = styled.p`
  font-weight:bold;
  margin:10px;
`
export const PSmall = styled.p`
  margin:10px;
  color:#888;

`