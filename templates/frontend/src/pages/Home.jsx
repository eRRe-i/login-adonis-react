import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.hook'

const Home = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const checkLogin = async () => {
      const token = getAuthHeaders()

      if (!token) {
        navigate('/unauthorized') // Redireciona se o token não existir
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logged`, {
          method: 'GET',
          headers: {
            ...token,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user) // Define o usuário autenticado
        } else {
          navigate('/unauthorized') // Redireciona se o token for inválido
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error)
        navigate('/unauthorized') // Redireciona em caso de erro
      } finally {
        setLoading(false) // Finaliza o carregamento
      }
    }

    checkLogin()
  })

  const handleLogout = () => {
    localStorage.removeItem('accessToken') // Remove o token
    navigate('/') // Redireciona para a página de login
  }

  if (loading) {
    return <p>Carregando...</p> // Exibe um loading enquanto verifica o login
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Bem-vindo, {user.firstName}!</h1>
          <p>Você está logado com sucesso.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Você não está autenticado.</p>
      )}
    </div>
  )
}

export default Home
