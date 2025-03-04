import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

export default function SignIn() {
  const [jwtEmail, setJwtEmail] = useState('')
  const [jwtPassword, setJwtPassword] = useState('')
  const [sessionEmail, setSessionEmail] = useState('')
  const [sessionPassword, setSessionPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  // console.log(import.meta.env)
  // Função para login JWT
  function loginJWT(event) {
    event.preventDefault()
    setDisabled(true)
    const user = { email: jwtEmail, password: jwtPassword }
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login-jwt`, user)
      .then((res) => {
        console.log('Login JWT realizado:', res.data)
        alert('Login JWT realizado com sucesso!')
        setDisabled(false)
        navigate('/home')
      })
      .catch((err) => {
        console.error('Erro no login JWT:', err.response?.data)
        alert(err.response?.data || 'Erro ao realizar login JWT')
        setDisabled(false)
      })
  }

  // Função para login por sessão
  function loginSession(event) {
    event.preventDefault()
    setDisabled(true)
    const user = { email: sessionEmail, password: sessionPassword }
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login-session`, user)
      .then((res) => {
        console.log('Login por sessão realizado:', res.data)
        alert('Login por sessão realizado com sucesso!')
        setDisabled(false)
        navigate('/home')
      })
      .catch((err) => {
        console.error('Erro no login por sessão:', err.response?.data)
        alert(err.response?.data || 'Erro ao realizar login por sessão')
        setDisabled(false)
      })
  }

  return (
    <Container>
      {/* Formulário para Login JWT */}
      <Form onSubmit={loginJWT}>
        <h2>Login JWT</h2>
        <input
          placeholder="E-mail"
          type="email"
          value={jwtEmail}
          disabled={disabled}
          onChange={(e) => setJwtEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={jwtPassword}
          autoComplete="new-password"
          disabled={disabled}
          onChange={(e) => setJwtPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={disabled}>
          Entrar com JWT
        </button>
      </Form>

      {/* Formulário para Login por Sessão */}
      <Form onSubmit={loginSession}>
        <h2>Login por Sessão</h2>
        <input
          placeholder="E-mail"
          type="email"
          value={sessionEmail}
          disabled={disabled}
          onChange={(e) => setSessionEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={sessionPassword}
          autoComplete="new-password"
          disabled={disabled}
          onChange={(e) => setSessionPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={disabled}>
          Entrar com Sessão
        </button>
      </Form>
    </Container>
  )
}

// Estilização
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  gap: 2rem; /* Espaço entre os formulários */
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 320px;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;
    color: #6c63ff;
  }

  input {
    margin-bottom: 1rem;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  input:focus {
    border-color: #6c63ff;
    outline: none;
  }

  button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #6c63ff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #4d44fa;
  }
`
