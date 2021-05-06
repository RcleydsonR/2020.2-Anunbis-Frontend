import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import schema from './validations';
import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import api from '../../services/Api';
import { getCourses } from '../../services/Courses';

export default function RegisterStudent() {
  const history = useHistory();
  const [courses, setCourses] = React.useState([]);
  const [errorDB, setErrorDB] = React.useState('');
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  function coursesOptions(coursesO) {
    const coursesArray = [];
    coursesO?.map((course) =>
      coursesArray.push({ id: course.id_course, name: course.name }),
    );
    return coursesArray;
  }

  useEffect(() => {
    getCourses(setCourses);
  }, []);

  function onSubmit(data) {
    const body = {
      reg_student: Number(data.reg_student),
      name: data.name,
      id_course: Number(data.id_course),
      email: data.email,
      password: data.password,
    };

    api
      .post('/student', body)
      .then((response) => {
        if (response.status === 201) {
          history.push('/visitant/login');
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setErrorDB('Estudante já cadastrado');
        }
      });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field errorMsg={errors.name?.message}>
        <Input type="text" text="Nome" name="name" register={register} />
      </Form.Field>
      <Form.Field>
        <Select
          id="courses"
          backColor="#FFD54F"
          text="Selecione um Curso"
          options={coursesOptions(courses)}
          name="id_course"
          register={register}
          error={errors.id_course !== undefined}
        />
      </Form.Field>
      <Form.Field errorMsg={errors.reg_student?.message}>
        <Input
          type="text"
          text="Matrícula"
          name="reg_student"
          register={register}
        />
      </Form.Field>
      <Form.Field errorMsg={errors.email?.message}>
        <Input
          type="email"
          text="Email Institucional"
          name="email"
          register={register}
        />
      </Form.Field>
      <Form.Field errorMsg={errors.password?.message}>
        <Input
          type="password"
          text="Senha"
          name="password"
          register={register}
        />
      </Form.Field>
      <Form.Field errorMsg={errors.co_password?.message}>
        <Input
          type="password"
          text="Confirmar Senha"
          name="co_password"
          register={register}
        />
      </Form.Field>
      <Form.Field>
        <div className="errorDB">{errorDB}</div>
      </Form.Field>
      <Form.Footer>
        <Button
          text="CONFIRMAR"
          type="submit"
          backColor="#FFF9C4"
          padding="12px 8px"
        />
        <Button
          text="CANCELAR"
          backColor="#FFF9C4"
          padding="12px 8px"
          onClick={() => history.push('/')}
        />
      </Form.Footer>
    </Form>
  );
}
