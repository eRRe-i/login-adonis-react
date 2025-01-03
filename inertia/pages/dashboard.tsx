import User from '#models/user'

export default function Home( user : User) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Bem-vindo, {user.fullName}!
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Você está logado com sucesso.
        </p>
        <form method="POST" action="/logout" className="text-center">
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </form>
      </div>
    </div>
  )
}