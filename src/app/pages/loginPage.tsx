import { AlertTriangle, ArrowLeft } from "lucide-react";

interface LoginPageProps {
  isLoginMode: boolean;
  setIsLoginMode: (value: boolean) => void;

  loginForm: {
    email: string;
    password: string;
  };

  setLoginForm: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;

  registerForm: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  setRegisterForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;

  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;

  isSubmitting: boolean;
  authError: string;
  authMessage: string;
}

export default function LoginPage({
  isLoginMode,
  setIsLoginMode,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  handleLogin,
  handleRegister,
  isSubmitting,
  authError,
  authMessage,
}: LoginPageProps) {
  return (
    <div className="pt-30 pb-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#089448] rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {isLoginMode ? "Login" : "Cadastro"}
          </h1>

          <p className="text-gray-600 mt-2">
            {isLoginMode
              ? "Entre para acessar o sistema"
              : "Crie sua conta para começar"}
          </p>
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm mb-4">
            {authError}
          </div>
        )}

        {authMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm mb-4">
            {authMessage}
          </div>
        )}

        <form
          onSubmit={isLoginMode ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>

              <input
                type="text"
                required
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              required
              value={
                isLoginMode
                  ? loginForm.email
                  : registerForm.email
              }
              onChange={(e) =>
                isLoginMode
                  ? setLoginForm({
                      ...loginForm,
                      email: e.target.value,
                    })
                  : setRegisterForm({
                      ...registerForm,
                      email: e.target.value,
                    })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>

            <input
              type="password"
              required
              value={
                isLoginMode
                  ? loginForm.password
                  : registerForm.password
              }
              onChange={(e) =>
                isLoginMode
                  ? setLoginForm({
                      ...loginForm,
                      password: e.target.value,
                    })
                  : setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>

              <input
                type="password"
                required
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#089448] hover:bg-[#067838] disabled:bg-gray-400 text-white rounded-md font-medium transition-colors py-2"
          >
            {isSubmitting
              ? "Processando..."
              : isLoginMode
              ? "Entrar"
              : "Cadastrar"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          {!isLoginMode && (
            <button
              onClick={() => setIsLoginMode(true)}
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-700 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para login
            </button>
          )}

          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
            }}
            className="text-sm text-green-600 hover:text-green-700"
          >
            {isLoginMode
              ? "Não tem uma conta? Cadastre-se"
              : "Já tem uma conta? Entre"}
          </button>
        </div>
      </div>
    </div>
  );
}