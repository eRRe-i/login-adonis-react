import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function Login({ errors }: any) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    router.post('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h1>

        {errors?.error && (
          <div className="mb-4 text-sm text-red-500">{errors?.error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id='emailblock'
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id='email'
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-1 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id='password'
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-smborder focus:outline-none focus:border-1 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white text-sm font-medium ${
              processing
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}