import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import ResetPassword from '../../components/ResetPassword';
import { useHistory } from "react-router-dom";
import api from '../../services/Api';

export default function Profile() {
  const history = useHistory();
  const [excludeAcc, setExcludeAcc] = React.useState("");
  const [resetPassword, setResetPassword] = React.useState("");
  const [courses, setCourses] = React.useState([]);
  const student = {
    name: JSON.parse(localStorage.getItem('student')).name,
    email: JSON.parse(localStorage.getItem('student')).email,
    id_course: JSON.parse(localStorage.getItem('student')).id_course,
    reg_student: JSON.parse(localStorage.getItem('student')).reg_student,
  }

  useEffect(() => {
    api.get('/course')
    .then(response => {
      setCourses(response.data);
    })
  }, []);

  function getCourseName() {
    let cont = 0;
      while (cont < courses.length) {
        if (courses[cont++].id_course == student.id_course)
          return courses[cont - 1].name;
      }
  }

  function makeResetPassword() {
      return setResetPassword(<ResetPassword 
        onClick={() => setResetPassword("")} 
        student= {student} 
        />)
  }

  function excludeAccount(){
    api.delete("/student/" + student.reg_student)
    .then(response => {
      //console.log(response);
      history.push('/user/login') 
    })
    .catch(error =>  {
      console.log(error.response);
    }
    )
  }

  function makeSure() {
    return (
      setExcludeAcc(
        <ContentExclude >
          <header>Tem certeza?</header>
          <BtsExclude>
            <Button backColor='#26A69A' padding='10px 10px' text='SIM' onClick={() => excludeAccount()} />
            <Button backColor='#26A69A' padding='10px 7px' text='NÃO' onClick={() => setExcludeAcc('')} />
          </BtsExclude>
        </ContentExclude>)
      )
  }

  return (
    <Container display='flex' backColor='#E0E0E0'>
      {resetPassword}
      {excludeAcc}
      <Title>Configurações de conta</Title>
      <Container backColor='#FFFFFF' width='240px' height='115px'>
        <p>Nome Completo: {student.name}</p>
        <p>E-mail: {student.email}</p>
        <p>Curso: {getCourseName()}</p>
      </Container>
      <BtnReset text='ALTERAR SENHA' backColor='#FFF9C4' padding='5px' onClick={() => makeResetPassword()} />
      <Container txtAlign='center' backColor='#FFFFFF' width='430px' height='115px'>
        <p>Quantidade de avaliações realizadas: </p>
        <p>Quantidade de pessoas que concordaram com suas avaliações: </p>
        <p>Quantidade de pessoas que discordaram com suas avaliações: </p>
      </Container>
      <BtnExcluir text='EXCLUIR CONTA' backColor='#F44336' padding='5px' onClick={() => makeSure()} />
    </Container>)
}

const Container = styled.div`
    display: ${props => props.display ? props.display : ''};
    flex-direction:column;
    align-items: center;
    width: ${props => props.width ? props.width : '460px'};
    height: ${props => props.height ? props.height : '460px'};
    background-color: ${props => props.backColor ? props.backColor : ''};
    border-radius: 20px;
    text-align: ${props => props.txtAlign ? props.txtAlign : ''};

    p{
      font-size: 14px;
      margin-left: 5px;
    }
`;

const ContentExclude = styled.div`
    position: absolute;
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    background-color: #FFF9C4;
    margin-top: 180px;
    border-radius: 10px;

    header{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #212121;
      color: white;
      text-align: center;
    }
`

const BtsExclude = styled.div`
    display: flex;
    flex-direction: row;
    background-color: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    Button{
      color: white;
    }
`

const BtnReset = styled(Button)`
    margin-top: 20px;
    margin-bottom: 20px;
`

const BtnExcluir = styled(Button)`
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Title = styled.h4`
    display: flex;
    justify-content: center;
    margin-bottom:20px;
    margin-top: 40px;
`;