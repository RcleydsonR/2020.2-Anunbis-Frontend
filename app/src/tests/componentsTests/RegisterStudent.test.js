import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterStudent from '../../components/RegisterStudent';
import mock from '../mock/index';
import { validStudent } from '../mock/fixtures/stored_users';
import '@testing-library/jest-dom';

mock.onGet('/course').reply(200, [
  {
    id_course: '1',
    name: 'Engenharia de Software',
  },
]);

const mockPost = (number) => {
  if (number === 409) {
    mock.onPost('/student').reply(409, {
      name: 'Estudante teste',
      reg_student: '123456789',
      email: '123456789@aluno.unb.br',
      id_course: '1',
      password: '12345678',
    });
  } else {
    mock.onPost('/student').reply(201, {
      name: 'Estudante teste',
      reg_student: '123456789',
      email: '123456789@aluno.unb.br',
      id_course: '1',
      password: '12345678',
    });
  }
};

describe('Testing forms functionability', () => {
  it('window location must be change when click on CANCELAR', () => {
    render(<RegisterStudent />);
    const buttonCancel = screen.getByText('CANCELAR');
    userEvent.click(buttonCancel);

    expect(window.location.pathname).toEqual('/');
  });

  it('Submit Valid student', async () => {
    const redirect = jest.fn();
    mockPost(201);
    render(<RegisterStudent onRegister={redirect} />);

    const inputName = screen.getByPlaceholderText('Nome');
    const inputReg = screen.getByPlaceholderText('Matrícula');
    const inputEmail = screen.getByPlaceholderText('Email Institucional');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const inputCoPassword = screen.getByPlaceholderText('Confirmar Senha');
    const btnConfirm = screen.getByText('CONFIRMAR');

    userEvent.type(inputName, validStudent.name);
    userEvent.type(inputReg, validStudent.reg_student);
    userEvent.type(inputEmail, validStudent.email);
    userEvent.type(inputPassword, validStudent.password);
    userEvent.type(inputCoPassword, validStudent.password);
    await waitFor(() => {
      expect(screen.getByText('Engenharia de Software')).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByRole('option', { name: 'Engenharia de Software' }),
      { target: { selected: true } },
    );
    userEvent.click(btnConfirm);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalled();
    });
  });
  it('ErrorDB must appear on Repeated Student ', async () => {
    mockPost(409);

    render(<RegisterStudent />);

    const inputName = screen.getByPlaceholderText('Nome');
    const inputReg = screen.getByPlaceholderText('Matrícula');
    const inputEmail = screen.getByPlaceholderText('Email Institucional');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const inputCoPassword = screen.getByPlaceholderText('Confirmar Senha');
    const btnConfirm = screen.getByText('CONFIRMAR');

    userEvent.type(inputName, validStudent.name);
    userEvent.type(inputReg, validStudent.reg_student);
    userEvent.type(inputEmail, validStudent.email);
    userEvent.type(inputPassword, validStudent.password);
    userEvent.type(inputCoPassword, validStudent.password);

    await waitFor(() => {
      expect(screen.getByText('Engenharia de Software')).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByRole('option', { name: 'Engenharia de Software' }),
      { target: { selected: true } },
    );
    userEvent.click(btnConfirm);

    await waitFor(() => {
      expect(screen.getByText('Estudante já cadastrado')).toBeInTheDocument();
    });
  });
});
