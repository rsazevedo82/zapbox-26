import type { Metadata } from "next";

import {
  LegalList,
  LegalPage,
  LegalSection,
  LegalText,
  Pending,
} from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a Zapbox coleta, usa e protege seus dados pessoais.",
  alternates: { canonical: "/privacidade" },
};

/**
 * Política de Privacidade — MODELO, não texto jurídico aprovado.
 *
 * A estrutura cobre os pontos exigidos pela LGPD e descreve exatamente o que o
 * site coleta hoje (ver `src/lib/validations.ts` e `src/app/api/leads/route.ts`)
 * e quais serviços de terceiros são efetivamente usados. Tudo que depende de
 * decisão da empresa está marcado com <Pending>.
 */
export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="20 de agosto de 2026">
      <LegalSection title="1. Quem é o controlador dos seus dados">
        <LegalText>
          O controlador dos dados pessoais tratados neste site é o {SITE_CONFIG.name}, operado por{" "}
          {SITE_CONFIG.company}, inscrita no CNPJ <Pending>A PREENCHER — CNPJ</Pending> e com sede
          em <Pending>A PREENCHER — ENDEREÇO COMPLETO</Pending>.
        </LegalText>
        <LegalText>
          Encarregado pelo tratamento de dados (DPO):{" "}
          <Pending>A PREENCHER — NOME E CONTATO</Pending>.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Quais dados coletamos">
        <LegalText>
          Coletamos apenas os dados que você informa voluntariamente no formulário de contato e
          alguns dados técnicos de navegação:
        </LegalText>
        <LegalList
          items={[
            <>
              <strong>Dados que você informa:</strong> nome, telefone de WhatsApp e, opcionalmente,
              o nome da sua empresa.
            </>,
            <>
              <strong>Plano de interesse:</strong> quando você inicia o contato a partir de um plano
              específico.
            </>,
            <>
              <strong>Dados de origem:</strong> página do site em que o formulário foi aberto, qual
              botão originou o contato, site que encaminhou você até aqui (referrer) e parâmetros de
              campanha (UTM), quando presentes na URL.
            </>,
            <>
              <strong>Identificador técnico:</strong> um código derivado do seu endereço IP por meio
              de função hash (SHA-256). Não armazenamos o endereço IP em si. Esse código é usado
              apenas para limitar tentativas repetidas de envio e evitar abuso do formulário.
            </>,
            <>
              <strong>Registro do consentimento:</strong> a confirmação de que você marcou a caixa
              de autorização no formulário.
            </>,
          ]}
        />
        <LegalText>
          Não coletamos dados sensíveis, não solicitamos documentos e não há cadastro, login ou área
          de cliente neste site.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. Para que usamos seus dados">
        <LegalList
          items={[
            "Entrar em contato com você pelo WhatsApp ou e-mail sobre planos e soluções da Zapbox.",
            "Notificar internamente nossa equipe comercial sobre um novo contato recebido.",
            "Entender de quais páginas e campanhas vêm os contatos, para melhorar o site.",
            "Proteger o formulário contra envios automatizados e abuso.",
          ]}
        />
        <LegalText>
          Não vendemos seus dados, não os cedemos para terceiros com finalidade publicitária e não
          tomamos decisões automatizadas que afetem você.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Base legal do tratamento">
        <LegalText>
          O tratamento dos dados informados no formulário tem como base legal o{" "}
          <strong>seu consentimento</strong>, conforme o art. 7º, inciso I, da Lei nº 13.709/2018
          (LGPD). O consentimento é manifestado quando você marca a caixa de autorização antes de
          enviar o formulário — sem essa marcação, o envio não é concluído.
        </LegalText>
        <LegalText>
          O identificador técnico usado para limitar abusos do formulário apoia-se no legítimo
          interesse em garantir a segurança do serviço (art. 7º, inciso IX).
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Com quem compartilhamos">
        <LegalText>
          Utilizamos os seguintes serviços para operar o site. Cada um trata apenas os dados
          necessários à sua função:
        </LegalText>
        <LegalList
          items={[
            <>
              <strong>Supabase</strong> — armazenamento dos contatos recebidos pelo formulário.
            </>,
            <>
              <strong>Resend</strong> — envio da notificação interna por e-mail para nossa equipe.
            </>,
            <>
              <strong>Google Analytics</strong>, via Google Tag Manager — estatísticas de uso do
              site. Carregado <strong>somente</strong> se você aceitar os cookies de análise.
            </>,
            <>
              <strong>Vercel</strong> — hospedagem do site.
            </>,
          ]}
        />
        <LegalText>
          Alguns desses serviços podem processar dados fora do Brasil. A transferência internacional
          ocorre nos termos do art. 33 da LGPD.{" "}
          <Pending>REVISAR COM JURÍDICO — TRANSFERÊNCIA INTERNACIONAL</Pending>
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <LegalText>
          Este site não instala cookies de análise ou publicidade antes da sua autorização. Ao
          acessar, você vê um aviso com as opções de aceitar ou recusar.
        </LegalText>
        <LegalList
          items={[
            <>
              <strong>zapbox_consent</strong> — cookie primário (first-party) que registra a sua
              escolha sobre cookies e evita que o aviso reapareça. Validade de 365 dias. É
              necessário ao funcionamento do aviso e não depende de consentimento.
            </>,
            <>
              <strong>Cookies do Google Analytics</strong> — instalados apenas se você escolher
              &quot;Aceitar&quot;. Se você recusar, nenhum script de análise é carregado.
            </>,
          ]}
        />
        <LegalText>
          Você pode revogar a autorização a qualquer momento apagando os cookies do site no seu
          navegador.
        </LegalText>
      </LegalSection>

      <LegalSection title="7. Por quanto tempo guardamos">
        <LegalText>
          Mantemos os dados de contato pelo período necessário ao atendimento comercial e ao
          cumprimento de obrigações legais: <Pending>DEFINIR PERÍODO DE RETENÇÃO</Pending>.
          Encerrado esse prazo, ou mediante seu pedido de exclusão, os dados são eliminados ou
          anonimizados.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Seus direitos">
        <LegalText>
          A LGPD garante a você, a qualquer momento e sem custo, os seguintes direitos sobre seus
          dados pessoais:
        </LegalText>
        <LegalList
          items={[
            "Confirmar se tratamos dados seus e acessá-los.",
            "Corrigir dados incompletos, inexatos ou desatualizados.",
            "Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.",
            "Solicitar a portabilidade dos dados a outro fornecedor.",
            "Revogar o consentimento e pedir a exclusão dos dados tratados com base nele.",
            "Ser informado sobre com quem compartilhamos seus dados.",
            "Opor-se a um tratamento que considere irregular.",
          ]}
        />
        <LegalText>
          Para exercer qualquer um desses direitos, entre em contato pelo canal:{" "}
          <Pending>DEFINIR CANAL — E-MAIL DE CONTATO</Pending>. Responderemos no prazo previsto em
          lei.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Como protegemos seus dados">
        <LegalText>
          Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não
          autorizado, perda ou alteração:
        </LegalText>
        <LegalList
          items={[
            "Tráfego criptografado em todo o site (HTTPS).",
            "Banco de dados com Row Level Security ativado e acesso restrito a credenciais de servidor.",
            "Chaves de acesso mantidas exclusivamente no servidor, nunca expostas no navegador.",
            "Endereços IP armazenados apenas em forma de hash, não em texto legível.",
            "Limitação de tentativas de envio do formulário por origem.",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Alterações nesta política">
        <LegalText>
          Esta política pode ser atualizada para refletir mudanças no site, nos serviços utilizados
          ou na legislação. A data de última atualização, no topo desta página, indica a versão
          vigente. Alterações relevantes serão comunicadas por aviso no site.
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}
