import React, { useRef } from 'react';
import { Form } from '@unform/web';
import Input from './components/Input';
import * as Yup from 'yup';

function App() {
  const formRef = useRef(null);

  const handleSubmit = async data => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Deve ser do tipo email')
          .required('Email obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo 6 caracteres')
          .required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <h1>Faça login</h1>

      <Input name="email" />
      <Input type="password" name="password" />

      <button type="submit">Login</button>
    </Form>
  );
}

export default App;
