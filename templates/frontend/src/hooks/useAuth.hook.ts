import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()

  // Função para atualizar o localStorage com novos pares chave-valor
  const setAuthHeaders = (newData: Record<string, string>) => {
    for (const [key, value] of Object.entries(newData)) {
      localStorage.setItem(key, value)
    }
  }

  // Função para gerar os headers de autenticação (memoizada)
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('accessToken') // Recupera o token do localStorage

    if (!token) {
      navigate('/unauthorized') // Redireciona se o token não existir
      return null
    }

    return {
      Authorization: `Bearer ${token}`, // Cabeçalho de autenticação
    }
  }, [navigate]) // Dependência: navigate

  return { setAuthHeaders, getAuthHeaders } // Retorna as funções
}

export default useAuth
