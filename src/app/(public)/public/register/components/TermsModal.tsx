"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface TermsModalProps {
  setOpenTermsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TermsModal({ setOpenTermsModal }: TermsModalProps) {
  return (
    <div
      onClick={() => setOpenTermsModal(false)}
      className="bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center bg-black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 z-[999999] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white p-2 text-black shadow-lg md:w-[60%]"
      >
        <button
          onClick={() => setOpenTermsModal(false)}
          className="absolute top-0 left-0 p-1 text-[#FF0080]"
        >
          <ArrowLeft />{" "}
        </button>
        <Image
          alt=""
          width={1000}
          height={300}
          quality={100}
          src={"/logo.png"}
          className="mx-auto h-auto w-5/6 object-contain md:w-80"
        />
        <ScrollArea className="h-[80vh]">
          {/* <div className="flex w-full flex-col gap-4">
            <span className="font-bold">
              TERMO DE USO DA PLATAFORMA INSPIRE AI
            </span>
            <span className="font-bold">
              1. Aceitação dos Termos e Políticas
            </span>
            <span>
              1.1. Este Termo de Uso estabelece os termos e condições aplicáveis
              ao acesso e uso dos serviços oferecidos pela plataforma Inspire
              AI. Ao utilizar a plataforma, o usuário declara que leu,
              compreendeu e concorda integralmente com este Termo e com a
              Política de Privacidade da Inspire AI.
            </span>
            <span>
              1.2. É responsabilidade do usuário cumprir as normas deste Termo,
              bem como garantir que suas atividades na plataforma estejam em
              conformidade com a legislação vigente.
            </span>
            <span>
              1.3. A utilização da plataforma pode estar sujeita a políticas e
              diretrizes adicionais que complementam este Termo, sendo
              publicadas e atualizadas conforme necessário.
            </span>
            <span className="font-bold">2. Definições</span>
            <span>
              2.1. Usuário: Pessoa física ou jurídica que utiliza a plataforma,
              incluindo visitantes, subscritores, administradores e
              representantes de empresas.
            </span>
            <span>
              2.2. Plataforma: Sistema online da Inspire AI, acessível via web e
              dispositivos móveis, que oferece serviços de análise de redes
              sociais, automação e insights estratégicos.
            </span>
            <span>
              2.3. Serviços Premium: Recursos exclusivos disponíveis mediante
              pagamento, como suporte prioritário, relatórios avançados e
              funcionalidades específicas de automação.
            </span>
            <span>
              2.4. Assinatura por Usuário Ativo: Modelo de pagamento baseado no
              número de usuários efetivamente utilizando os serviços em um
              período determinado, conforme contrato entre as partes.
            </span>
            <span>
              2.5. Assinatura por Resultados: Cobrança vinculada a metas e
              resultados atingidos pela plataforma, previamente acordados entre
              Inspire AI e o usuário.
            </span>
            <span>
              2.6. Credenciais de Acesso: Identificadores e senhas utilizados
              pelo usuário para acesso seguro à plataforma, pessoal e
              intransferível.
            </span>
            <span className="font-bold">
              3. Descrição do Serviço ou Produto
            </span>
            <span>
              3.1. A Inspire AI oferece soluções de inteligência artificial para
              análise de redes sociais e automação de marketing, proporcionando
              insights detalhados e estratégicos aos usuários.
            </span>
            <span>
              3.2. Dentre os serviços, incluem-se: análise de métricas,
              monitoramento em tempo real, criação de relatórios personalizados
              e automação de ações em redes sociais para potencializar o alcance
              e engajamento.
            </span>
            <span>
              3.3. Os serviços e recursos podem variar conforme o plano de
              assinatura escolhido, sendo disponibilizadas opções de planos
              gratuitos, testes e assinaturas pagas, com serviços adaptáveis às
              necessidades específicas do usuário.
            </span>
            <span className="font-bold">
              4. Respeito à Propriedade Intelectual
            </span>
            <span>
              4.1. Todo o conteúdo, código, design, gráficos, funcionalidades e
              demais materiais da plataforma são de propriedade exclusiva da
              Inspire AI, protegidos por direitos autorais e demais legislações
              de propriedade intelectual.
            </span>
            <span>
              4.2. O usuário recebe uma licença limitada, não exclusiva e
              intransferível para uso da plataforma exclusivamente para fins
              pessoais e internos. É proibida qualquer reprodução, cópia,
              distribuição ou modificação do conteúdo da plataforma sem
              autorização prévia.
            </span>
            <span>
              4.3. O uso comercial ou a exploração da propriedade intelectual da
              Inspire AI sem consentimento escrito é proibido e pode acarretar
              responsabilizações legais.
            </span>
            <span className="font-bold">
              5. Responsabilidades do Usuário e da Empresa
            </span>
            <span>
              5.1. O usuário compromete-se a utilizar a plataforma de forma
              ética e de acordo com todas as leis e regulamentos aplicáveis. É
              vedada a utilização da plataforma para práticas fraudulentas,
              danosas ou que possam prejudicar a integridade e segurança do
              sistema.
            </span>
            <span>
              5.2. O usuário é responsável pela proteção de suas credenciais de
              acesso e deve comunicar imediatamente à Inspire AI qualquer
              suspeita de uso não autorizado, vazamento ou perda dessas
              credenciais.
            </span>
            <span>
              5.3. A Inspire AI envida esforços para garantir a continuidade dos
              serviços, mas não se responsabiliza por interrupções temporárias
              causadas por manutenção, falhas técnicas ou outros fatores fora do
              controle da empresa.
            </span>
            <span>
              5.4. A Inspire AI não se responsabiliza por prejuízos diretos,
              indiretos, incidentais ou consequenciais, incluindo lucros
              cessantes, resultantes do uso inadequado ou do desempenho da
              plataforma.
            </span>
            <span className="font-bold">6. Mudanças no Termo de Uso</span>
            <span>
              6.1. A Inspire AI reserva-se o direito de modificar este Termo de
              Uso a qualquer momento, visando adaptá-lo a mudanças legislativas
              ou melhorias na plataforma. Alterações substanciais serão
              informadas aos usuários por e-mail ou por meio de notificações na
              própria plataforma.
            </span>
            <span>
              6.2. O uso contínuo da plataforma após a comunicação de mudanças
              será considerado como aceitação integral das modificações
              realizadas neste Termo.
            </span>
            <span className="font-bold">7. Informações para Contato</span>
            <span>
              7.1. Em caso de dúvidas, sugestões ou reclamações relacionadas a
              este Termo de Uso ou ao uso da plataforma, o usuário pode entrar
              em contato com o suporte da Inspire AI por meio de [e-mail de
              contato] ou [telefone], disponível em horário comercial.
            </span>
            <span className="font-bold">
              8. Regras de Conduta, Proibições e Penalidades
            </span>
            <span>
              8.1. É proibido ao usuário praticar qualquer ato que possa
              prejudicar a segurança, funcionamento ou reputação da Inspire AI,
              incluindo atividades de hacking, tentativas de engenharia reversa,
              acesso não autorizado ou inserção de código malicioso.
            </span>
            <span>
              8.2. O usuário não deve transmitir informações falsas,
              difamatórias ou ofensivas através da plataforma, tampouco realizar
              atividades que possam violar a privacidade de outros usuários.
            </span>
            <span>
              8.3. Em caso de violação destas regras, a Inspire AI poderá
              suspender ou cancelar o acesso do usuário e adotar as medidas
              legais cabíveis para compensar eventuais danos causados.
            </span>
            <span className="font-bold">
              9. Políticas de Troca, Cancelamento e Teste Gratuito
            </span>
            <span>
              9.1. O usuário pode ajustar seu plano de assinatura ou cancelar a
              assinatura conforme suas necessidades, respeitando os prazos,
              requisitos e procedimentos estabelecidos na plataforma.
            </span>
            <span>
              9.2. Os testes gratuitos são oferecidos para avaliação de
              determinados serviços, sendo limitados por período e volume de
              uso, conforme descrito no plano promocional. A Inspire AI
              reserva-se o direito de encerrar o acesso ao teste gratuito em
              caso de uso excessivo ou inadequado.
            </span>
            <span>
              9.3. Em caso de cancelamento de assinatura, o usuário poderá
              perder o acesso aos dados e conteúdos gerados durante o período de
              vigência do plano.
            </span>
            <span className="font-bold">10. Jurisdição e Leis Aplicáveis</span>
            <span>
              10.1. Este Termo é regido pelas leis brasileiras e qualquer
              litígio decorrente de sua interpretação ou execução será dirimido
              no foro da Comarca de [Cidade], [Estado], renunciando as partes a
              qualquer outro foro.
            </span>
            <span className="font-bold">11. Disposições Finais</span>
            <span>
              11.1. Este Termo constitui o acordo integral entre o usuário e a
              Inspire AI, prevalecendo sobre quaisquer entendimentos,
              negociações ou comunicações anteriores.
            </span>
            <span>
              11.2. A nulidade ou inexequibilidade de qualquer disposição deste
              Termo não afetará a validade das demais disposições, que
              permanecerão em pleno vigor.
            </span>
            <span>
              11.3. A falha ou tolerância da Inspire AI em exigir o cumprimento
              de qualquer disposição deste Termo não constituirá renúncia ao
              direito de exigir o cumprimento de tal disposição no futuro.
            </span>
          </div> */}
        </ScrollArea>
      </div>
    </div>
  );
}
