import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>401 - Não Autorizado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <button onClick={handleGoHome}>Voltar para a página inicial</button>
    </div>
  )
}

export default Unauthorized
