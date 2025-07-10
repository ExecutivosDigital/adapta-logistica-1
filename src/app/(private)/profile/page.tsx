import { Pencil } from "lucide-react";

export default function profile() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">Meu Perfil</span>
      <div className="w-full rounded-xl border border-gray-300">
        <div className="flex w-full justify-between px-6 py-4">
          <div className="flex gap-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-2">
              <Pencil className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Nome do Usuário
              </h1>
              <span className="bg-primary/20 text-primary h-max rounded-sm px-2 py-1 text-sm font-medium">
                Nível de Acesso
              </span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            CPF{" "}
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            000.000.000-00
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* CPF */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            Email Cadastrado
            <span className="text-zinc-500">
              Este é o e-mail que será usado no Adapta e em todas suas contas
            </span>
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            gabriel@adapta.com.br{" "}
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Conta de Recebimento */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            Conta de Recebimento
            <span className="text-zinc-500">
              {" "}
              Conta bancária destinada ao crédito de salários e outros proventos
              do funcionário.
            </span>
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            Banco Itaú: Cc: ****** &nbsp;&nbsp; PIX: ******{" "}
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Data de Nascimento */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            Data de Nascimento
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            10/10/1990{" "}
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Número de Telefone */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            Número de Telefone
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            (41) 9 9999-0000{" "}
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Senha */}
        <div className="grid grid-cols-12 border-t border-gray-300 px-6 py-4">
          <div className="col-span-5 flex flex-col items-start gap-1 text-gray-800">
            Sua senha
            <span className="text-zinc-500">
              Clique em Editar e Siga os Passos
            </span>
          </div>
          <div className="col-span-7 flex flex-col items-start gap-1 text-gray-800">
            ************{" "}
            <button className="text-primary hover:text-primary-dark hover:underline">
              Editar {">"}
            </button>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </div>
  );
}
