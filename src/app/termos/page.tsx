import type { Metadata } from "next";
import Link from "next/link";

import { LegalList, LegalPage, LegalSection, LegalText } from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da Zapbox e do contato comercial pelos canais oficiais.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de Uso" updatedAt="25 de agosto de 2026">
      <LegalSection title="1. Objeto">
        <LegalText>
          {/*
            No texto legal vale o domínio sem protocolo nem "www." — os termos
            regulam o site nas duas formas, e a URL canônica (com www) é
            assunto de SEO, não de redação jurídica.
          */}
          Estes termos regulam o uso do site{" "}
          {SITE_CONFIG.url.replace("https://", "").replace(/^www\./, "")}, mantido pelo{" "}
          {SITE_CONFIG.name}, operado por{" "}
          <a
            href="https://www.rc2solucoes.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 font-medium underline underline-offset-2"
          >
            {SITE_CONFIG.company}
          </a>
          , e o contato comercial iniciado por meio dele.
        </LegalText>
        <LegalText>
          O site tem finalidade informativa e de contato comercial. Ele apresenta a plataforma, os
          planos e as soluções da Zapbox e permite que você solicite atendimento.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Aceitação">
        <LegalText>
          Ao navegar por este site ou enviar seus dados pelo formulário de contato, você declara que
          leu, compreendeu e concorda com estes termos e com a{" "}
          <Link
            href="/privacidade"
            className="text-accent-700 font-medium underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
          . Se você não concorda, não utilize o site nem envie seus dados.
        </LegalText>
        <LegalText>
          O envio do formulário exige que você seja maior de 18 anos ou esteja devidamente
          autorizado a representar a empresa que informar.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. Sobre os serviços">
        <LegalText>
          Este site <strong>não realiza contratação automática</strong>. Não há checkout, criação de
          conta, área de cliente, login ou período de teste disponível nesta página.
        </LegalText>
        <LegalText>
          O envio do formulário registra uma solicitação de contato. A contratação de qualquer plano
          ou solução é feita posteriormente, por meio de atendimento comercial humano, e depende de
          proposta e aceite formalizados em instrumento próprio.
        </LegalText>
        <LegalText>
          A prestação do serviço Zapbox em si é regida pelo contrato firmado no momento da
          contratação, que prevalece sobre estes termos em caso de divergência.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Propriedade intelectual">
        <LegalText>
          A marca Zapbox, o logotipo, a identidade visual, os textos, as imagens, o código-fonte e
          os demais elementos deste site pertencem a{" "}
          <a
            href="https://www.rc2solucoes.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 font-medium underline underline-offset-2"
          >
            {SITE_CONFIG.company}
          </a>{" "}
          ou a terceiros que licenciaram seu uso, e são protegidos pela legislação brasileira.
        </LegalText>
        <LegalText>
          É vedada a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo
          deste site sem autorização prévia e por escrito. Marcas de terceiros eventualmente citadas
          pertencem a seus respectivos titulares.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Limitação de responsabilidade">
        <LegalList
          items={[
            "As informações deste site têm caráter informativo e podem ser alteradas a qualquer momento, sem aviso prévio.",
            "Os valores de planos apresentados são referenciais e devem ser confirmados com a equipe comercial antes de qualquer contratação.",
            "Funcionalidades descritas como soluções avançadas ou módulos adicionais não integram os planos de software e são contratadas separadamente, mediante análise.",
            "Não garantimos que o site estará disponível de forma ininterrupta ou livre de erros, embora trabalhemos para isso.",
            "Não nos responsabilizamos por conteúdos de sites de terceiros eventualmente acessados por links a partir daqui.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Uso adequado">
        <LegalText>
          Você concorda em não utilizar este site para fins ilícitos, não tentar obter acesso não
          autorizado a sistemas, não enviar dados falsos ou de terceiros sem autorização e não
          empregar meios automatizados para envio massivo pelo formulário.
        </LegalText>
      </LegalSection>

      <LegalSection title="7. Modificações destes termos">
        <LegalText>
          Podemos atualizar estes termos a qualquer momento. A versão vigente é sempre a publicada
          nesta página, identificada pela data de última atualização no topo. O uso continuado do
          site após a publicação implica concordância com a versão revisada.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Legislação aplicável e foro">
        <LegalText>
          Estes termos são regidos pelas leis da República Federativa do Brasil, em especial pelo
          Código Civil, pelo Código de Defesa do Consumidor, pelo Marco Civil da Internet (Lei nº
          12.965/2014) e pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </LegalText>
        <LegalText>
          Fica eleito o foro da comarca de Guarulhos — SP para dirimir controvérsias decorrentes
          destes termos, com renúncia a qualquer outro, por mais privilegiado que seja.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Contato">
        <LegalText>
          Dúvidas sobre estes termos podem ser encaminhadas para{" "}
          <a
            href="mailto:somos@rc2solucoes.com.br"
            className="text-accent-700 font-medium underline underline-offset-2"
          >
            somos@rc2solucoes.com.br
          </a>
          .
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}
