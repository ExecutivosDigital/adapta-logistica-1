"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface PrivacyModalProps {
  setOpenPrivacyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PrivacyModal({ setOpenPrivacyModal }: PrivacyModalProps) {
  return (
    <div
      onClick={() => setOpenPrivacyModal(false)}
      className="bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center bg-black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 z-[999999] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white p-2 text-black shadow-lg md:w-[60%]"
      >
        <button
          onClick={() => setOpenPrivacyModal(false)}
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
              POLÍTICA DE PRIVACIDADE DA PLATAFORMA INSPIRE AI
            </span>
            <span>
              A Inspire AI valoriza a privacidade e a proteção dos dados
              pessoais dos seus usuários. Esta Política de Privacidade descreve
              como coletamos, utilizamos e protegemos as informações pessoais
              dos usuários que acessam nosso site e utilizam nossos serviços
              digitais.
            </span>
            <span className="font-bold">1. Coleta de Informações</span>
            <span>
              1.1. A Inspire AI coleta informações pessoais de seus usuários
              apenas quando necessário para oferecer e melhorar nossos serviços,
              sempre de forma justa, transparente e conforme a legislação
              aplicável.
            </span>
            <span>
              1.2. A coleta de dados é realizada com o consentimento explícito
              do usuário, que será informado sobre a finalidade da coleta e o
              uso pretendido dos dados.
            </span>
            <span>
              1.3. As informações coletadas podem incluir dados pessoais, como
              nome, e-mail, telefone, dados de navegação e informações técnicas,
              coletadas por meio de cookies ou tecnologias semelhantes.
            </span>
            <span>
              1.4. Em situações específicas, como análise de uso e segurança,
              coletamos dados técnicos sobre dispositivos e navegadores
              utilizados para acessar a plataforma.
            </span>
            <span className="font-bold">2. Uso e Retenção de Dados</span>
            <span>
              2.1. Os dados coletados pela Inspire AI são usados unicamente para
              as finalidades informadas ao usuário, como entrega de serviços,
              suporte, melhoria de funcionalidades e envio de comunicações que
              possam interessar ao usuário.
            </span>
            <span>
              2.2. A Inspire AI mantém os dados apenas pelo tempo necessário
              para cumprir a finalidade para a qual foram coletados, em
              conformidade com a legislação e com as necessidades operacionais e
              comerciais da empresa.
            </span>
            <span>
              2.3. Implementamos medidas de segurança, técnicas e
              administrativas para proteger as informações dos usuários contra
              acesso não autorizado, divulgação, uso indevido, modificação ou
              destruição.
            </span>
            <span className="font-bold">3. Divulgação a Terceiros</span>
            <span>
              3.1. A Inspire AI não compartilha informações de identificação
              pessoal dos usuários com terceiros, exceto:
            </span>
            <span className="ml-4 text-sm">
              Quando exigido por lei, em atendimento a ordens judiciais ou
              solicitações governamentais legítimas;
            </span>
            <span className="ml-4 text-sm">
              Quando necessário para a operação dos serviços, incluindo empresas
              parceiras, contratadas para execução de atividades complementares,
              sempre sob contratos que asseguram o cumprimento de medidas de
              segurança de dados.
            </span>

            <span>
              3.2. Quando o compartilhamento de dados for necessário e opcional,
              o usuário será informado previamente e poderá recusar o
              compartilhamento.
            </span>
            <span>
              3.3. A Inspire AI não realiza a venda ou aluguel de informações
              pessoais a terceiros.
            </span>
            <span className="font-bold">4. Links Externos</span>
            <span>
              4.1. Nosso site e plataforma podem conter links para sites
              externos que não são operados pela Inspire AI. Estes links são
              fornecidos como conveniência ao usuário.
            </span>
            <span>
              4.2. A Inspire AI não controla, monitora ou endossa as práticas de
              privacidade e políticas de uso de terceiros e recomenda que o
              usuário consulte as políticas de privacidade de cada site antes de
              fornecer qualquer informação pessoal.
            </span>
            <span className="font-bold">
              5. Recusa de Fornecimento de Dados
            </span>
            <span>
              5.1. O usuário tem o direito de recusar o fornecimento de
              informações pessoais. Contudo, a recusa pode afetar o acesso a
              determinados serviços e funcionalidades oferecidos pela
              plataforma.
            </span>
            <span>
              5.2. Em alguns casos, a recusa de fornecimento de dados pessoais
              pode limitar a experiência do usuário e a personalização dos
              serviços, afetando, por exemplo, recomendações de conteúdo e
              exibição de anúncios.
            </span>

            <span className="font-bold">
              6. Consentimento Contínuo e Direitos dos Usuários
            </span>
            <span>
              6.1. Ao continuar a utilizar nossos serviços, o usuário concorda
              com as práticas de coleta e uso de dados descritas nesta Política
              de Privacidade.
            </span>
            <span>
              6.2. O usuário tem o direito de acessar, corrigir, atualizar e
              excluir suas informações pessoais, bem como de revogar o
              consentimento para o uso dos dados a qualquer momento, mediante
              solicitação formal à Inspire AI.
            </span>
            <span>
              6.3. Para qualquer questão ou dúvida sobre nossas práticas de
              tratamento de dados pessoais, o usuário pode entrar em contato com
              o serviço de atendimento ao cliente da Inspire AI através das
              informações fornecidas no site.
            </span>
            <span className="font-bold">7. Uso do Google AdSense</span>
            <span>
              7.1. A Inspire AI utiliza o serviço Google AdSense para veicular
              anúncios relevantes aos usuários. A política de privacidade do
              Google AdSense, incluindo o uso de cookies DoubleClick, está
              disponível para consulta nas FAQs sobre privacidade do Google.
            </span>
            <span>
              7.2. Cookies DoubleClick permitem ao Google e a seus parceiros
              exibir anúncios personalizados com base no histórico de navegação
              do usuário. O usuário pode gerenciar suas preferências de anúncios
              e desativar a personalização de anúncios nas configurações do
              Google.
            </span>
            <span className="font-bold">
              8. Cookies de Publicidade Comportamental
            </span>
            <span>
              8.1. A Inspire AI utiliza cookies para coletar dados anônimos
              sobre os interesses do usuário e fornecer anúncios personalizados
              de acordo com esses interesses.
            </span>
            <span>
              8.2. Os cookies permitem monitorar o comportamento do usuário para
              melhorar a experiência e garantir que os anúncios apresentados
              sejam relevantes. A Inspire AI também utiliza cookies de parceiros
              afiliados para garantir que os créditos sejam devidamente alocados
              a parceiros de publicidade quando o site é acessado através de
              links específicos.
            </span>
            <span>
              8.3. O usuário pode desativar cookies no navegador a qualquer
              momento, no entanto, isso pode impactar a experiência de navegação
              e a exibição de anúncios personalizados.
            </span>
            <span className="font-bold">9. Compromisso do Usuário</span>
            <span>9.1. Os usuários da Inspire AI se comprometem a:</span>
            <span className="ml-4 text-sm">
              Não realizar atividades ilegais, fraudulentas ou que atentem
              contra a boa fé e a ordem pública ao utilizar os serviços da
              plataforma;
            </span>
            <span className="ml-4 text-sm">
              Evitar disseminação de conteúdos de natureza ofensiva, incluindo
              materiais racistas, xenofóbicos, sexistas ou contrários aos
              direitos humanos;
            </span>
            <span className="ml-4 text-sm">
              Proteger os sistemas da Inspire AI de ameaças e danos, abstendo-se
              de introduzir malwares, vírus ou realizar atividades de hacking.
            </span>
            <span>
              9.2. A violação destes compromissos poderá resultar em medidas
              legais e restrições ao uso dos serviços da Inspire AI.
            </span>
            <span className="font-bold">
              10. Direitos de Privacidade do Usuário
            </span>
            <span>
              10.1. A Inspire AI respeita e assegura os direitos de privacidade
              dos usuários, incluindo, mas não se limitando a:
            </span>
            <span className="ml-4 text-sm">
              Direito de acesso às suas informações pessoais;
            </span>
            <span className="ml-4 text-sm">
              Direito de correção de dados imprecisos;
            </span>
            <span className="ml-4 text-sm">
              Direito de exclusão de dados, dentro dos limites estabelecidos
              pela lei;
            </span>
            <span className="ml-4 text-sm">
              Direito de portabilidade de dados.
            </span>
            <span className="font-bold">
              11. Atualizações e Vigência da Política
            </span>
            <span>
              11.1. Esta Política de Privacidade foi atualizada pela última vez
              em [Data Atual]. A Inspire AI reserva-se o direito de revisar esta
              política periodicamente para refletir mudanças legislativas,
              avanços tecnológicos ou novas práticas de negócios.
            </span>
            <span>
              11.2. Em caso de atualizações significativas, o usuário será
              informado por meio de notificações na plataforma ou por e-mail.
              Recomendamos a revisão regular desta política para que o usuário
              se mantenha atualizado quanto a eventuais mudanças.
            </span>
            <span>
              11.3. O uso contínuo dos serviços da Inspire AI após a publicação
              das atualizações constitui a aceitação do usuário às mudanças.
            </span>
          </div> */}
        </ScrollArea>
      </div>
    </div>
  );
}
