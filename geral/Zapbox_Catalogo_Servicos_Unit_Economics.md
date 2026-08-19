# Zapbox — Catálogo de Serviços, Operação e Unit Economics

**Versão:** 1.0  
**Data de referência:** 12/08/2026  
**Objetivo:** estruturar o Zapbox como produto recorrente de atendimento e vendas, com três serviços principais na Fase 1 e módulos de expansão na Fase 2.

> **Nota importante:** todos os valores financeiros deste documento são propostas e premissas de planejamento, não dados históricos da operação. O objetivo é criar um modelo comercial testável e recalibrável à medida que surgirem dados reais de aquisição, suporte, churn, consumo e implantação.

---

## 1. Tese do produto

O Zapbox não deve ser vendido como uma coleção de ferramentas.

O cliente não compra Chatwoot, BottleCRM, n8n, Evolution API, Typebot ou Cal.com.

O cliente compra uma evolução operacional:

1. **Atender melhor**
2. **Organizar o comercial**
3. **Automatizar e aplicar IA**
4. **Adicionar módulos conforme a maturidade aumenta**

A stack é a infraestrutura invisível.

### Posicionamento recomendado

**Zapbox = plataforma gerenciada de atendimento e vendas.**

A RC2 continua sendo a empresa responsável por projetos mais complexos, integrações especiais, desenvolvimento, arquitetura e consultoria.

---

# 2. Arquitetura funcional da stack

```text
                    CLIENTE / LEAD
                          │
                      WhatsApp
                          │
                  Evolution API
                          │
                      Chatwoot
                 Atendimento / Inbox
                          │
                          ▼
                         n8n
                    Orquestração
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
          BottleCRM    Typebot      Cal.com
           Pipeline   Qualificação   Agenda
              │           │           │
              └───────────┼───────────┘
                          │
                          ▼
                          IA
                 Agentes / Copilotos
```

## Responsabilidade de cada camada

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| WhatsApp | Evolution API | conectividade e eventos de mensagens |
| Atendimento | Chatwoot | conversas, inbox, usuários, filas, histórico e handoff humano |
| CRM | BottleCRM | leads, contatos, empresas, oportunidades, pipeline, tarefas e carteira |
| Orquestração | n8n | webhooks, regras, integrações, sincronização e automações |
| Qualificação | Typebot | coleta estruturada e fluxos determinísticos |
| Agenda | Cal.com | disponibilidade, reuniões e calendários |
| IA | LLMs/agentes | interpretação, resposta, resumo, classificação e execução assistida |

---

# 3. Fontes da verdade do ambiente

Para evitar uma arquitetura confusa, cada sistema deve ter uma responsabilidade principal.

## Chatwoot

Fonte da verdade para:

- mensagens;
- conversas;
- inbox;
- atendentes;
- departamentos;
- histórico de atendimento;
- status da conversa;
- notas internas relacionadas ao atendimento.

## BottleCRM

Fonte da verdade para:

- leads;
- contatos;
- empresas;
- oportunidades;
- pipeline;
- valor da oportunidade;
- etapa da venda;
- responsável comercial;
- tarefas;
- previsão de fechamento;
- motivo de perda;
- carteira comercial.

## n8n

Não deve ser fonte da verdade.

É a camada responsável por:

- reagir a eventos;
- transportar dados;
- aplicar regras;
- executar integrações;
- controlar retries;
- gerar logs;
- sincronizar sistemas.

---

# 4. Estratégia comercial: SaaS de entrada + serviço gerenciado

Hoje o site público do Zapbox possui planos de entrada em **R$149, R$319 e R$499/mês**.

A recomendação é **não eliminar essa camada imediatamente**.

Ela pode continuar funcionando como produto de entrada de baixo toque.

## Camada 1 — Zapbox Software

Para clientes que querem essencialmente a central de atendimento.

Faixa atual:

- Essencial: R$149/mês
- Time: R$319/mês
- Operação: R$499/mês

Objetivo:

- baixo CAC;
- venda simples;
- onboarding padronizado;
- pouco serviço humano;
- gerar base instalada;
- identificar clientes com potencial de expansão.

## Camada 2 — Zapbox Managed Services

Para empresas que querem a RC2/Zapbox operando e evoluindo o ambiente.

Três serviços principais:

1. **Zapbox Atendimento**
2. **Zapbox Comercial**
3. **Zapbox Sales AI**

Essa camada deve ter:

- setup;
- mensalidade recorrente;
- escopo definido;
- limites claros;
- suporte;
- acompanhamento operacional;
- módulos adicionais.

---

# 5. FASE 1 — Os três serviços principais

---

# 5.1 Zapbox Atendimento

## Promessa

**Transforme o WhatsApp da empresa em uma operação profissional de atendimento.**

## Dor que resolve

- várias pessoas usando o mesmo número sem organização;
- mensagens esquecidas;
- respostas duplicadas;
- perda de histórico;
- dificuldade para saber quem está atendendo;
- falta de visibilidade para o gestor;
- dependência de um único aparelho.

## Stack principal

```text
WhatsApp
   ↓
Evolution API
   ↓
Chatwoot
   ↓
Equipe humana
```

## Entrega padrão

- 1 número de WhatsApp;
- até 6 usuários;
- central de atendimento;
- usuários individuais;
- equipes/departamentos;
- atribuição de conversas;
- tags;
- respostas rápidas;
- notas internas;
- histórico;
- configuração de horário;
- mensagem de ausência;
- organização inicial das filas;
- treinamento de implantação;
- backup;
- monitoramento da infraestrutura;
- suporte operacional.

## Implantação

### Etapa 1 — Diagnóstico

Mapear:

- quantidade de usuários;
- departamentos;
- volume aproximado;
- horário de atendimento;
- tipos de solicitação;
- regras de distribuição;
- responsáveis.

### Etapa 2 — Provisionamento

- criar tenant/ambiente;
- configurar domínio;
- configurar Chatwoot;
- configurar Evolution;
- criar inbox;
- conectar número;
- criar usuários;
- criar equipes;
- configurar permissões.

### Etapa 3 — Organização

- tags;
- respostas rápidas;
- departamentos;
- status;
- regras básicas;
- mensagem fora de horário.

### Etapa 4 — Testes

Testar:

- mensagem recebida;
- mensagem enviada;
- mídia;
- transferência;
- atribuição;
- acesso de usuários;
- aplicação móvel;
- reconexão;
- histórico.

### Etapa 5 — Go-live

- treinamento;
- checklist de entrada;
- acompanhamento inicial;
- correções de configuração.

## Operação mensal

A Zapbox deve executar:

- monitoramento de saúde;
- acompanhamento de uso;
- atualizações controladas;
- rotina de backup;
- verificação de falhas;
- suporte dentro do SLA;
- gestão básica de usuários;
- pequenas alterações de configuração.

## KPIs do cliente

- tempo de primeira resposta;
- conversas sem resposta;
- conversas abertas;
- conversas por atendente;
- taxa de resolução;
- volume por período;
- percentual respondido no mesmo dia.

## Limites sugeridos

- 1 número;
- até 6 usuários;
- 2 departamentos;
- suporte em horário comercial;
- sem automações customizadas;
- sem integrações customizadas;
- sem CRM avançado.

## Preço sugerido

**Setup:** R$1.990  
**MRR:** R$997/mês

### Piso comercial para lançamento

R$797/mês, apenas para primeiros clientes/casos estratégicos.

O piso não deve virar preço oficial.

---

# 5.2 Zapbox Comercial

## Promessa

**Transforme conversas em oportunidades comerciais organizadas e acompanhe cada venda até o fechamento.**

## Dor que resolve

A empresa atende, mas não consegue responder:

- quantos leads estão em aberto;
- quais propostas estão paradas;
- quanto existe em pipeline;
- quais vendedores precisam fazer follow-up;
- quantas oportunidades foram perdidas;
- por que foram perdidas;
- qual origem gera mais vendas.

## Stack principal

```text
WhatsApp
   ↓
Evolution
   ↓
Chatwoot
   ↓
n8n
   ↓
BottleCRM
```

## Inclui tudo do Zapbox Atendimento

Mais:

- CRM;
- cadastro estruturado de leads;
- contatos;
- empresas;
- oportunidades;
- pipeline;
- etapas comerciais;
- valor da oportunidade;
- probabilidade;
- previsão de fechamento;
- tarefas;
- responsável;
- motivo de perda;
- campos personalizados;
- sincronização básica Chatwoot → CRM;
- até 3 automações padrão;
- dashboard comercial básico;
- reunião mensal de operação.

## Modelo de pipeline inicial

```text
NOVO LEAD
    ↓
CONTATO
    ↓
QUALIFICADO
    ↓
REUNIÃO
    ↓
PROPOSTA
    ↓
NEGOCIAÇÃO
    ↓
 ┌─────────┐
 ↓         ↓
GANHO    PERDIDO
```

O pipeline deve ser adaptado ao negócio, mas nunca começar com dezenas de etapas.

## Fluxo operacional

### Entrada de lead

Quando um novo contato comercial entra:

```text
Nova conversa no Chatwoot
          ↓
         n8n
          ↓
Busca contato no BottleCRM
          ↓
Existe?
 ├── Sim → atualiza atividade
 └── Não → cria Lead
```

## Conversão para oportunidade

Quando o lead for considerado qualificado:

```text
Lead qualificado
      ↓
BottleCRM
      ↓
Contato / Empresa
      ↓
Oportunidade
      ↓
Valor + responsável + etapa
```

## Sincronização recomendada

Não sincronizar tudo.

### Chatwoot → CRM

Enviar apenas informações relevantes:

- ID do contato;
- telefone;
- nome;
- origem;
- tags comerciais;
- atendente;
- resumo;
- data do último contato.

### CRM → Chatwoot

Enviar apenas contexto operacional:

- etapa;
- valor;
- responsável;
- status;
- prioridade;
- ID da oportunidade.

## IDs externos

Cada registro integrado deve possuir identificadores cruzados.

Exemplo:

```text
chatwoot_contact_id
bottlecrm_lead_id
bottlecrm_contact_id
bottlecrm_opportunity_id
```

Isso reduz duplicações e facilita troubleshooting.

## Automações padrão incluídas

### 1. Novo lead

Cria ou atualiza o lead no CRM.

### 2. Lead qualificado

Cria oportunidade.

### 3. Oportunidade parada

Gera alerta para o vendedor.

Não incluir automações ilimitadas.

## KPIs comerciais

- leads novos;
- leads qualificados;
- oportunidades criadas;
- taxa lead → oportunidade;
- oportunidades por etapa;
- valor do pipeline;
- aging por etapa;
- taxa de ganho;
- ticket médio;
- ciclo de vendas;
- motivo de perda;
- vendas por vendedor;
- vendas por origem.

## Operação mensal

- monitorar integrações;
- revisar erros de sincronização;
- acompanhar duplicidades;
- checar automações;
- revisar pipeline;
- ajustar campos;
- reunião mensal de 30–45 minutos;
- relatório simplificado.

## Limites sugeridos

- 1 número;
- até 10 usuários;
- 1 CRM;
- 1 pipeline principal;
- até 3 automações padrão;
- até 10 campos customizados;
- uma reunião mensal;
- integrações externas não incluídas.

## Preço sugerido

**Setup:** R$4.990  
**MRR:** R$1.997/mês

### Piso comercial para lançamento

R$1.497/mês.

---

# 5.3 Zapbox Sales AI

## Promessa

**Uma operação digital que atende, interpreta, organiza e auxilia o time comercial 24 horas por dia.**

## Objetivo

Não vender apenas um chatbot.

Vender uma camada de inteligência capaz de:

- responder;
- interpretar;
- classificar;
- resumir;
- qualificar;
- consultar contexto;
- registrar dados;
- acionar humanos;
- auxiliar vendedores.

## Stack principal

```text
WhatsApp
   ↓
Evolution
   ↓
Chatwoot
   ↓
IA
   ↓
n8n
   ↓
BottleCRM
```

Typebot, Cal.com e automações adicionais podem ser acoplados na Fase 2.

## Inclui tudo do Zapbox Comercial

Mais:

- 1 agente de IA;
- base de conhecimento;
- instruções de comportamento;
- classificação de intenção;
- triagem;
- respostas automáticas;
- resumo de conversa;
- coleta de dados;
- criação/atualização de lead;
- sugestão de resposta;
- handoff para humano;
- regras de segurança;
- observabilidade;
- revisão mensal de qualidade.

## O agente deve possuir três modos

### Modo 1 — Responder

Exemplo:

- horários;
- políticas;
- produtos;
- serviços;
- dúvidas comuns.

### Modo 2 — Coletar

Exemplo:

- nome;
- empresa;
- necessidade;
- orçamento;
- cidade;
- prazo;
- interesse.

### Modo 3 — Executar

Exemplo:

- atualizar CRM;
- criar tarefa;
- classificar lead;
- gerar resumo;
- encaminhar conversa;
- buscar informações autorizadas.

## Handoff humano

O agente deve interromper a automação quando:

- cliente pedir humano;
- confiança for baixa;
- houver reclamação sensível;
- houver negociação;
- houver exceção fora da base;
- houver ação irreversível;
- política exigir aprovação.

## Política de ações

### IA pode executar automaticamente

- pesquisar;
- classificar;
- resumir;
- criar lead;
- adicionar tag;
- criar tarefa;
- sugerir resposta.

### IA deve pedir confirmação ou passar ao humano

- excluir registros;
- cancelar contratos;
- aplicar desconto;
- alterar valores;
- emitir documento financeiro;
- concluir negociação;
- executar ação irreversível.

## Base de conhecimento

Estruturar:

- perguntas frequentes;
- serviços;
- regras;
- documentos;
- políticas;
- preços autorizados;
- diferenciais;
- procedimentos.

Evitar jogar documentos sem curadoria em um agente.

## QA mensal de IA

Revisar amostra de conversas e classificar:

- correto;
- parcialmente correto;
- incorreto;
- transferiu cedo;
- transferiu tarde;
- inventou informação;
- deixou de responder;
- falha de ferramenta.

## KPIs

- percentual de conversas tratadas pela IA;
- taxa de handoff;
- taxa de resolução sem humano;
- leads qualificados;
- custo de IA por conversa;
- tempo até primeira resposta;
- taxa de erro;
- taxa de resposta inválida;
- conversão após qualificação;
- horas humanas poupadas.

## Limites sugeridos

- até 15 usuários;
- 1 agente principal;
- 1 base de conhecimento;
- até 5 ferramentas/ações do agente;
- consumo de IA com franquia;
- excedente cobrado separadamente;
- revisão mensal de qualidade.

## Preço sugerido

**Setup:** R$8.990  
**MRR:** R$3.997/mês

### Piso comercial para lançamento

R$2.997/mês.

### Consumo de IA

Nunca vender IA ilimitada.

Usar um dos modelos:

1. franquia incluída + excedente;
2. consumo repassado;
3. pacote de créditos;
4. custo do provedor + margem.

Recomendação inicial:

**custo do provedor + 30% de gestão**, ou franquia compatível com a margem do pacote.

---

# 6. Comparativo dos três serviços

| Recurso | Atendimento | Comercial | Sales AI |
|---|---:|---:|---:|
| Central de atendimento | ✓ | ✓ | ✓ |
| WhatsApp compartilhado | ✓ | ✓ | ✓ |
| Usuários e departamentos | ✓ | ✓ | ✓ |
| Histórico | ✓ | ✓ | ✓ |
| CRM | — | ✓ | ✓ |
| Pipeline | — | ✓ | ✓ |
| Oportunidades | — | ✓ | ✓ |
| Automações padrão | — | até 3 | até 5 |
| Base de conhecimento | — | — | ✓ |
| Agente de IA | — | — | ✓ |
| Resumo automático | — | opcional | ✓ |
| Qualificação por IA | — | — | ✓ |
| Handoff humano | — | — | ✓ |
| Reunião mensal | — | ✓ | ✓ |
| QA de IA | — | — | ✓ |

---

# 7. Preços da Fase 1

## Preço de lista recomendado

| Serviço | Setup | MRR |
|---|---:|---:|
| Zapbox Atendimento | R$1.990 | R$997 |
| Zapbox Comercial | R$4.990 | R$1.997 |
| Zapbox Sales AI | R$8.990 | R$3.997 |

## Piso para os primeiros clientes

| Serviço | MRR mínimo recomendado |
|---|---:|
| Atendimento | R$797 |
| Comercial | R$1.497 |
| Sales AI | R$2.997 |

O preço de lançamento deve ter:

- prazo;
- limite de vagas;
- contrapartida;
- autorização para case quando possível.

Não criar desconto permanente sem motivo.

---

# 8. Unit economics pro forma da Fase 1

## Premissas

Os valores abaixo são hipóteses para planejamento.

### Custo direto mensal estimado

Inclui:

- infraestrutura;
- banco;
- backup;
- monitoramento;
- suporte operacional;
- manutenção;
- consumo médio reservado;
- ferramentas diretamente relacionadas à entrega.

Não inclui:

- impostos;
- despesas administrativas;
- salários corporativos não alocados;
- marketing institucional;
- lucro.

| Serviço | MRR | Custo direto estimado | Margem bruta mensal | Margem bruta % |
|---|---:|---:|---:|---:|
| Atendimento | R$997 | R$250 | R$747 | 74,9% |
| Comercial | R$1.997 | R$550 | R$1.447 | 72,5% |
| Sales AI | R$3.997 | R$1.200 | R$2.797 | 70,0% |

### Meta

Manter margem bruta operacional recorrente próxima ou acima de **70%**.

Se a margem cair, investigar:

- suporte excessivo;
- customização não cobrada;
- consumo de IA;
- clientes fora do ICP;
- infraestrutura superdimensionada;
- automações frágeis;
- horas humanas não mensuradas.

---

# 9. CAC, Payback, LTV e Churn — cenário de planejamento

## Definições

### CAC

```text
CAC =
(marketing + mídia + vendas + comissão de aquisição)
÷
novos clientes
```

Não mascarar CAC removendo tempo do fundador ou vendedor.

---

## Payback

```text
Payback =
CAC
÷
margem bruta mensal por cliente
```

O modelo abaixo ignora a receita de setup no cálculo do payback.

Isso torna a análise mais conservadora.

---

## LTV simplificado

```text
LTV =
margem bruta mensal
÷
churn mensal
```

É uma aproximação.

Quando houver dados suficientes, usar análise por coorte.

---

## Cenário inicial conservador

| Métrica | Atendimento | Comercial | Sales AI |
|---|---:|---:|---:|
| MRR | R$997 | R$1.997 | R$3.997 |
| Margem bruta mensal | R$747 | R$1.447 | R$2.797 |
| CAC de planejamento | R$2.500 | R$6.000 | R$12.000 |
| Churn mensal planejado | 5,0% | 3,5% | 3,0% |
| Vida média aproximada | 20 meses | 28,6 meses | 33,3 meses |
| LTV de margem bruta | R$14.940 | R$41.343 | R$93.233 |
| Payback | 3,3 meses | 4,1 meses | 4,3 meses |
| LTV/CAC | 6,0x | 6,9x | 7,8x |

## Leitura

Mesmo usando churn relativamente conservador, a tese fecha bem **se os custos diretos estiverem controlados**.

O maior risco não é a VPS.

O maior risco é:

**hora humana não cobrada.**

Um cliente de R$997 que exige várias horas de suporte e customização por mês pode ser menos rentável do que um cliente de R$3.997 com processo estável.

---

# 10. Metas de unit economics

## CAC Payback

- excelente: abaixo de 3 meses;
- saudável: 3–6 meses;
- atenção: 6–9 meses;
- problemático para SMB: acima de 9 meses.

### Meta Zapbox

**< 5 meses.**

---

## LTV/CAC

- abaixo de 3x: modelo frágil;
- 3–5x: saudável;
- acima de 5x: excelente, desde que o CAC esteja contabilizado corretamente.

### Meta Zapbox

**> 4x.**

Não comemorar LTV/CAC de 15x se o CAC estiver artificialmente baixo por não contabilizar venda, fundador e comissão.

---

## Logo Churn

### Atendimento

Meta inicial:

**< 5% ao mês**

Meta de maturidade:

**< 3,5% ao mês**

### Comercial

Meta inicial:

**< 3,5%**

Meta de maturidade:

**< 2,5%**

### Sales AI

Meta inicial:

**< 3%**

Meta de maturidade:

**< 2%**

O churn deve cair conforme o Zapbox se torna mais integrado à operação.

---

# 11. Por que Comercial e Sales AI tendem a ter LTV maior

O Atendimento resolve uma dor importante, porém substituível.

Quando o Zapbox passa a concentrar:

- pipeline;
- histórico comercial;
- automações;
- follow-up;
- agenda;
- integrações;
- IA;
- processos;

a troca de fornecedor se torna mais custosa.

Isso aumenta:

- retenção;
- switching cost;
- MRR;
- expansão;
- LTV.

A estratégia deve ser:

```text
ENTRAR COM ATENDIMENTO
        ↓
GANHAR CONFIANÇA
        ↓
ORGANIZAR O COMERCIAL
        ↓
AUTOMATIZAR
        ↓
ADICIONAR IA
```

---

# 12. MRR e ARR por volume de clientes

## Mix utilizado

Hipótese:

- 45% Atendimento;
- 40% Comercial;
- 15% Sales AI.

### ARPA médio

```text
45% × R$997
+
40% × R$1.997
+
15% × R$3.997

= R$1.847 de MRR médio por cliente
```

### Custo direto médio estimado

**R$512,50 por cliente/mês**

### Margem bruta média

**R$1.334,50 por cliente/mês**

### Margem bruta blended

**72,3%**

---

## Cenários

| Clientes | MRR estimado | ARR estimado |
|---:|---:|---:|
| 25 | R$46.175 | R$554.100 |
| 50 | R$92.350 | R$1.108.200 |
| 100 | R$184.700 | R$2.216.400 |
| 250 | R$461.750 | R$5.541.000 |
| 500 | R$923.500 | R$11.082.000 |

ARR considera apenas receita recorrente:

```text
ARR = MRR × 12
```

Setup não entra em ARR.

---

# 13. Receita de implantação

Com o mesmo mix:

- 45% × R$1.990;
- 40% × R$4.990;
- 15% × R$8.990.

Setup médio aproximado:

**R$4.240 por novo cliente.**

Uma coorte de 100 clientes gera aproximadamente:

**R$424.000 em receita de implantação**, além do MRR.

Esse dinheiro deve financiar:

- onboarding;
- engenharia inicial;
- implantação;
- treinamento;
- aquisição;
- caixa.

Setup não deve servir para esconder uma mensalidade deficitária.

---

# 14. FASE 2 — Módulos de expansão

A segunda fase deve aumentar o ARPA sem obrigar todos os clientes a contratar tudo.

Os módulos devem ser vendidos por resultado.

---

# 14.1 Zapbox Automação

## Promessa

**Elimine tarefas repetitivas entre atendimento, comercial e sistemas.**

## Stack

- n8n;
- Chatwoot;
- BottleCRM;
- Evolution;
- APIs externas.

## Exemplos

- distribuição de leads;
- criação automática de lead;
- alertas;
- atualização de tags;
- tarefas;
- webhooks;
- sincronização de formulários;
- atualização de CRM;
- pesquisa de satisfação;
- avisos internos.

## Modelo operacional

Cada workflow deve possuir:

1. nome;
2. cliente;
3. responsável;
4. evento de entrada;
5. ação;
6. credenciais;
7. política de retry;
8. timeout;
9. log;
10. alerta de erro.

### Exemplo

```text
Evento:
opportunity.stage_changed

Condição:
stage = proposal

Ação:
criar tarefa de follow-up para D+2
```

## Regras técnicas

- workflows idempotentes;
- evitar criação duplicada;
- retries limitados;
- dead-letter/fila de falhas;
- alertas;
- versionamento;
- documentação.

## Credenciais

Não compartilhar credenciais entre clientes.

Ideal:

```text
Cliente A → credenciais A
Cliente B → credenciais B
```

## Modelo comercial

**Setup:** a partir de R$1.990  
**MRR:** a partir de R$790

Sugestão de escopo:

- até 3 workflows simples;
- monitoramento;
- manutenção;
- pequenas correções.

Workflow adicional complexo deve ser projeto.

## KPI

- execuções;
- falhas;
- taxa de sucesso;
- horas poupadas;
- tarefas automatizadas;
- custo por execução.

---

# 14.2 Zapbox Qualifica

## Promessa

**Colete as informações certas antes de entregar o lead à equipe.**

## Stack

- Typebot;
- n8n;
- BottleCRM;
- Chatwoot.

## Quando usar

Use Typebot quando o fluxo deve ser:

- estruturado;
- previsível;
- auditável;
- baseado em perguntas;
- com campos obrigatórios.

Não use IA para tudo.

## Exemplo

```text
Olá
 ↓
Nome
 ↓
Empresa
 ↓
Necessidade
 ↓
Faixa de investimento
 ↓
Prazo
 ↓
Cidade
 ↓
Score
 ↓
CRM
 ↓
Atendente
```

## Operação

### 1. Definir objetivo

Exemplo:

“Identificar se o lead possui perfil para reunião.”

### 2. Criar campos

- nome;
- empresa;
- cargo;
- tamanho;
- problema;
- orçamento;
- prazo.

### 3. Criar lógica

Exemplo:

```text
Budget > R$5.000
AND
prazo <= 90 dias
      ↓
lead quente
```

### 4. Persistir dados

Typebot envia ao n8n.

n8n:

- normaliza;
- valida;
- cria/atualiza CRM;
- envia contexto ao Chatwoot.

## KPIs

- taxa de início;
- taxa de conclusão;
- abandono por pergunta;
- percentual qualificado;
- qualificado → reunião;
- qualificado → venda.

## Modelo comercial

**Setup:** a partir de R$1.990  
**MRR:** a partir de R$690

---

# 14.3 Zapbox Agenda

## Promessa

**Transforme uma conversa em reunião sem troca interminável de mensagens.**

## Stack

- Cal.com;
- n8n;
- BottleCRM;
- Chatwoot;
- Evolution.

## Fluxo

```text
Lead qualificado
      ↓
Verificar agenda
      ↓
Horários disponíveis
      ↓
Agendamento
      ↓
CRM atualizado
      ↓
Confirmação
      ↓
Lembrete
```

## Eventos

### booking.created

- atualizar oportunidade;
- criar tarefa;
- avisar vendedor;
- confirmar WhatsApp.

### booking.rescheduled

- atualizar CRM;
- avisar responsável.

### booking.cancelled

- atualizar oportunidade;
- ativar fluxo de recuperação.

## Regra comercial

A assinatura/licença do sistema de agenda deve ser:

- repassada ao cliente; ou
- explicitamente incluída no pacote.

Nunca assumir custos variáveis de terceiros sem limite.

## KPIs

- agendamentos;
- taxa de show;
- no-show;
- reagendamentos;
- lead → reunião;
- reunião → venda.

## Modelo comercial

**Setup:** a partir de R$990  
**MRR Zapbox:** a partir de R$390

Licenças de terceiros podem ser cobradas separadamente.

---

# 14.4 Zapbox Follow-up

## Promessa

**Nenhuma oportunidade morre por esquecimento.**

## Stack

- BottleCRM;
- n8n;
- Chatwoot;
- Evolution.

## O CRM deve comandar a cadência

Evitar follow-up baseado somente em data da última mensagem.

Exemplo:

```text
Etapa: PROPOSTA
     ↓
48h sem atividade
     ↓
Criar tarefa
     ↓
Mensagem
     ↓
Respondeu?
 ┌───────┴───────┐
 Sim             Não
  ↓               ↓
Humano        Próxima etapa
```

## Tipos de cadência

### Proposta

D+2  
D+5  
D+10

### Lead sem resposta

D+1  
D+3  
D+7

### No-show

+30 minutos  
D+1  
D+3

### Cliente inativo

30 dias  
60 dias  
90 dias

## Regras

Parar cadência quando:

- respondeu;
- venda ganhou;
- opt-out;
- oportunidade perdida;
- vendedor pausar;
- política de canal impedir.

## KPIs

- leads recuperados;
- respostas geradas;
- reuniões recuperadas;
- receita recuperada;
- opt-out;
- bloqueios;
- conversão por cadência.

## Modelo comercial

**Setup:** a partir de R$2.490  
**MRR:** a partir de R$890

---

# 14.5 Zapbox Integra

## Promessa

**Conecte atendimento e CRM aos sistemas que a empresa já usa.**

## Exemplos

- ERP;
- CRM legado;
- e-commerce;
- formulário;
- financeiro;
- sistema próprio;
- planilha;
- BI;
- banco de dados.

## Modelo técnico

Antes de aprovar integração, responder:

1. existe API?
2. existe webhook?
3. existe documentação?
4. existe sandbox?
5. existe limite?
6. como autentica?
7. quem é fonte da verdade?
8. qual frequência de sincronização?
9. como resolver conflito?
10. como tratar indisponibilidade?

## Classificação

### Integração simples

- uma direção;
- poucos campos;
- API pronta.

### Média

- bidirecional;
- regras;
- estados;
- múltiplos objetos.

### Complexa

- legado;
- API instável;
- banco;
- alta criticidade;
- alto volume.

## Modelo comercial

### Setup/projeto

R$1.990 a R$7.500+ por integração.

### MRR de manutenção

A partir de **R$690 por integração/mês**.

O MRR cobre:

- monitoramento;
- correções;
- atualização de tokens;
- pequenas adaptações;
- observabilidade.

Mudança de regra de negócio = novo projeto.

---

# 14.6 Zapbox Enterprise

## Quando utilizar

- múltiplos números;
- múltiplas empresas;
- múltiplas unidades;
- volume elevado;
- integração crítica;
- SSO;
- ambiente dedicado;
- SLA;
- regras específicas;
- segurança especial.

## Modelo

```text
Discovery
   ↓
Arquitetura
   ↓
Projeto
   ↓
Implantação
   ↓
Operação gerenciada
```

## Preço

**Projeto:** a partir de R$15.000  
**MRR:** a partir de R$4.990

Não vender Enterprise com preço fechado sem discovery.

---

# 15. Tabela dos módulos da Fase 2

| Módulo | Setup sugerido | MRR sugerido | Pré-requisito recomendado |
|---|---:|---:|---|
| Automação | R$1.990+ | R$790+ | Atendimento/Comercial |
| Qualifica | R$1.990+ | R$690+ | Atendimento |
| Agenda | R$990+ | R$390+ | Atendimento |
| Follow-up | R$2.490+ | R$890+ | Comercial |
| Integra | R$1.990–7.500+ | R$690+/integração | Comercial |
| Enterprise | R$15.000+ | R$4.990+ | Discovery |

---

# 16. Expansion MRR

Uma das maiores oportunidades do modelo é aumentar receita dentro da base.

## Hipótese de attach rate

| Módulo | MRR médio | % da base | MRR ponderado por cliente |
|---|---:|---:|---:|
| Automação | R$790 | 25% | R$197,50 |
| Qualifica | R$690 | 15% | R$103,50 |
| Agenda | R$390 | 10% | R$39,00 |
| Follow-up | R$890 | 20% | R$178,00 |
| Integra | R$690 | 15% | R$103,50 |

Potencial médio de expansão:

**R$621,50 de MRR por cliente da base.**

ARPA base:

**R$1.847**

ARPA com expansão:

**R$2.468,50**

Aumento potencial:

**+33,6% de ARPA.**

---

# 17. Efeito da Fase 2 sobre ARR

Com 100 clientes:

## Somente pacotes principais

MRR:

**R$184.700**

ARR:

**R$2.216.400**

## Com attach rate de módulos

MRR estimado:

**R$246.850**

ARR estimado:

**R$2.962.200**

Incremento de ARR:

**R$745.800**

Sem necessariamente adquirir 1 novo logo.

---

# 18. NRR — métrica que deve entrar no painel

Além de churn, acompanhar **Net Revenue Retention**.

```text
NRR =
MRR inicial
- downgrade
- churn
+ expansão
----------------
MRR inicial
```

Exemplo:

Base inicia com:

R$100.000 MRR

Perde:

R$4.000 em churn

Perde:

R$1.000 em downgrade

Ganha:

R$12.000 em expansão

Resultado:

R$107.000

NRR:

**107%**

## Meta

Após o lançamento da Fase 2:

**NRR > 105%**

Objetivo de maturidade:

**110%+**

O Zapbox pode crescer mesmo sem novos clientes se a expansão superar churn e downgrade.

---

# 19. Métricas obrigatórias do negócio

Criar dashboard mensal com:

## Receita

- MRR;
- New MRR;
- Expansion MRR;
- Contraction MRR;
- Churned MRR;
- Net New MRR;
- ARR;
- ARPA.

## Clientes

- logos ativos;
- novos logos;
- cancelamentos;
- logo churn;
- upgrades;
- downgrades.

## Aquisição

- leads;
- MQL;
- SQL;
- demos;
- propostas;
- fechamentos;
- CAC;
- CAC por canal;
- win rate.

## Unit economics

- margem bruta;
- COGS por cliente;
- payback;
- LTV;
- LTV/CAC;
- horas de suporte por cliente.

## Operação

- tickets;
- tempo de primeira resposta;
- incidentes;
- uptime;
- falha de automação;
- custo de IA;
- consumo por tenant.

---

# 20. CAC por canal

Não trabalhar somente com CAC blended.

Separar:

## Indicação

Normalmente:

- CAC baixo;
- alta confiança;
- bom fechamento.

## Parceiros

Medir:

- comissão;
- fee;
- ativação;
- churn do canal.

## Tráfego pago

Medir:

```text
CPL
↓
custo por reunião
↓
custo por proposta
↓
CAC
```

## Outbound

Incluir:

- SDR;
- ferramenta;
- dados;
- comissão;
- gestor;
- tempo do closer.

## Founder-led sales

O tempo do fundador também possui custo.

Não considerar founder-led sales como CAC zero.

---

# 21. Churn: não medir apenas cancelamento

Separar o motivo.

## Churn de produto

- não usou;
- não viu valor;
- difícil;
- faltou função.

## Churn financeiro

- empresa cortou custo;
- fechou;
- inadimplência.

## Churn técnico

- WhatsApp;
- integração;
- instabilidade;
- erro recorrente.

## Churn comercial

- cliente errado;
- expectativa mal vendida;
- escopo fora do produto.

## Churn de atendimento

- suporte ruim;
- demora;
- onboarding fraco.

Uma boa meta de churn sem taxonomia não ensina nada.

---

# 22. Redução de churn

## Primeiros 7 dias

O cliente precisa chegar ao primeiro valor rapidamente.

Atendimento:

**primeira equipe atendendo.**

Comercial:

**primeiras oportunidades no pipeline.**

Sales AI:

**primeira conversa tratada corretamente pela IA.**

## Primeiros 30 dias

Enviar relatório de valor:

- mensagens atendidas;
- oportunidades criadas;
- tempo economizado;
- reuniões;
- automações executadas.

## QBR para contas maiores

Trimestralmente:

- resultado;
- gargalos;
- uso;
- roadmap;
- módulos adicionais.

---

# 23. Payback e setup

O setup tem três funções:

1. financiar a implantação;
2. proteger caixa;
3. filtrar clientes pouco comprometidos.

## Não usar setup para

- esconder mensalidade baixa;
- assumir customização infinita;
- prometer projeto sem escopo.

## Política sugerida

Pagamento:

- 100% antes do início para projetos menores;
- 50/50 para projetos maiores;
- MRR começa no go-live ou em data limite contratual.

---

# 24. Modelo de desconto anual

Evitar desconto agressivo.

Sugestão:

### Mensal

Preço de lista.

### Anual antecipado

Até **10% de desconto**.

Benefícios:

- caixa;
- menor churn;
- payback;
- compromisso.

Não oferecer 20–30% apenas para fechar contrato.

---

# 25. Taxa de expansão esperada

O cliente deve possuir uma jornada.

## Mês 0

Atendimento.

## Mês 2–3

CRM/Comercial.

## Mês 3–6

Automação.

## Mês 4–8

Follow-up / agenda / qualificação.

## Mês 6–12

IA e integrações.

Não fazer upsell por calendário.

Fazer upsell por sinal operacional.

---

# 26. Gatilhos de upsell

## Atendimento → Comercial

Quando:

- gestor pede pipeline;
- leads são esquecidos;
- existem propostas;
- mais de 2 vendedores;
- dificuldade de previsão.

## Comercial → Automação

Quando:

- tarefas repetidas;
- vendedor atualiza dois sistemas;
- lead demora para ser distribuído;
- alertas manuais.

## Comercial → Follow-up

Quando:

- propostas param;
- taxa de resposta cai;
- vendedores esquecem oportunidades.

## Comercial → Agenda

Quando:

- time troca várias mensagens para marcar horário;
- no-show é relevante.

## Atendimento/Comercial → Sales AI

Quando:

- volume é alto;
- perguntas se repetem;
- atendimento fora do horário importa;
- tempo de resposta prejudica conversão.

---

# 27. Regras para proteger margem

## Nunca incluir

- alteração ilimitada;
- workflow ilimitado;
- integração ilimitada;
- consumo ilimitado de IA;
- suporte 24/7 no plano padrão;
- desenvolvimento ilimitado.

## Todo pacote deve declarar

- usuários;
- números;
- workflows;
- integrações;
- SLA;
- franquias;
- suporte;
- horas incluídas;
- excedentes.

---

# 28. Arquitetura por cliente

No início, priorizar isolamento.

```text
CLIENTE
│
├── Chatwoot
├── BottleCRM
├── credenciais
├── automações
├── storage
└── backups
```

É possível consolidar componentes conforme a operação amadurecer.

Não buscar economia de infraestrutura antes de dominar:

- observabilidade;
- backup;
- restore;
- isolamento;
- upgrade;
- rollback;
- segurança.

A maior economia virá da padronização operacional, não de economizar poucos reais de VPS.

---

# 29. Runbook mínimo por cliente

Cada tenant deve possuir ficha operacional.

```text
Cliente:
Plano:
Data de entrada:
Responsável:
Domínio:
WhatsApp:
Usuários:
Chatwoot:
CRM:
Workflows:
Integrações:
Agent ID:
Base de conhecimento:
Backup:
Última restauração testada:
Versão:
SLA:
Contato técnico:
```

---

# 30. Observabilidade

Ter painel com:

- containers;
- CPU;
- memória;
- disco;
- banco;
- fila;
- webhooks;
- erros;
- execução n8n;
- latência;
- disponibilidade;
- reconexão WhatsApp;
- consumo IA.

## Alertas

Criar alertas apenas acionáveis.

Exemplos:

- instância desconectada;
- fila acumulando;
- banco indisponível;
- workflow falhando repetidamente;
- disco > 80%;
- backup não executado;
- consumo IA anormal.

---

# 31. Backup

Definir política mínima.

## Banco

- backup diário;
- retenção;
- criptografia;
- cópia fora do servidor principal.

## Teste

Backup sem teste de restauração não é estratégia de backup.

Executar restore test periodicamente.

---

# 32. Segurança

## Credenciais

- nunca no código;
- secrets;
- acesso mínimo;
- rotação;
- segregação por cliente.

## IA

- token com menor privilégio possível;
- acesso somente aos objetos necessários;
- confirmação para ações críticas;
- logs de ação.

## Usuários

- remover rapidamente usuários desligados;
- perfis;
- princípio de menor privilégio.

---

# 33. Considerações de licença e arquitetura

Revalidar antes de escalar.

## Chatwoot

A Community Edition é MIT e pode ser self-hosted.

## BottleCRM

MIT, self-hosted e multi-tenant.

Possui API REST e isolamento multi-tenant via PostgreSQL RLS.

É uma peça adequada para o CRM do Zapbox.

## n8n

A licença atual restringe determinados modelos de oferta comercial.

Não estruturar o negócio assumindo que uma única instalação Community central poderá servir comercialmente centenas de clientes sem análise de licença.

Opções:

- ambiente/licença apropriada por cliente;
- n8n comercial;
- acordo de licenciamento;
- outro componente quando necessário.

## Typebot

A licença atual permite criar bots para clientes, mas restringe comercializar acesso à instância e oferecer hospedagem Typebot como produto.

Portanto:

**vender Zapbox Qualifica, não “hospedagem de Typebot”.**

Validar o desenho de implantação.

## Cal.com

Para operação empresarial, preferir modalidade comercial apropriada.

Não basear uma oferta crítica em uma edição explicitamente recomendada apenas para uso pessoal/não produtivo.

## Evolution API

Revisar as condições atuais de licença, marca e notificação de uso.

Além disso, tratar separadamente o risco de conectividade não oficial do WhatsApp.

Para clientes de maior criticidade, oferecer opção oficial via WhatsApp Cloud API quando aplicável.

---

# 34. Roadmap comercial

## Fase 1

Vender somente:

### Zapbox Atendimento
R$997/mês

### Zapbox Comercial
R$1.997/mês

### Zapbox Sales AI
R$3.997/mês

Objetivo:

- aprender onboarding;
- medir suporte;
- validar ICP;
- coletar churn;
- medir CAC;
- criar cases.

---

## Fase 2

Ativar módulos:

- Automação;
- Qualifica;
- Agenda;
- Follow-up;
- Integra;
- Enterprise.

Objetivo:

- expansion revenue;
- NRR;
- aumento de ARPA;
- aumento de switching cost;
- maior LTV.

---

# 35. Critérios para lançar a Fase 2

Não lançar tudo ao mesmo tempo.

Lançar um módulo quando houver:

- pelo menos 5 clientes pedindo;
- fluxo repetível;
- implantação documentada;
- preço claro;
- margem conhecida;
- suporte previsível.

Se cada cliente pedir algo completamente diferente, ainda é serviço customizado da RC2, não módulo Zapbox.

---

# 36. Meta para os primeiros 100 clientes gerenciados

Com o mix de referência:

- 45 Atendimento;
- 40 Comercial;
- 15 Sales AI.

Resultado esperado:

## MRR

**R$184.700**

## ARR

**R$2.216.400**

## Receita de setup da coorte

Aproximadamente:

**R$424.000**

## Com expansão média da Fase 2

MRR potencial:

**R$246.850**

ARR potencial:

**R$2.962.200**

---

# 37. Insight principal de negócio

O objetivo não deve ser chegar a 100 clientes pagando R$149.

O objetivo é criar uma máquina em que uma empresa possa entrar com uma necessidade simples e aumentar seu valor ao longo do tempo.

```text
Software
R$149–499
     ↓
Atendimento gerenciado
R$997
     ↓
Comercial
R$1.997
     ↓
Módulos
R$2.500–3.500
     ↓
Sales AI
R$3.997+
     ↓
Enterprise
R$5.000–15.000+
```

Essa escada muda completamente a economia da base.

---

# 38. North Star do Zapbox

A North Star não deveria ser “mensagens enviadas”.

Nem “usuários cadastrados”.

Uma métrica melhor é:

**operações comerciais ativas gerando resultado através do Zapbox.**

Indicadores associados:

- leads atendidos;
- oportunidades;
- reuniões;
- follow-ups;
- conversões;
- receita influenciada.

Quanto mais perto o produto estiver da receita do cliente, maior tende a ser sua capacidade de:

- cobrar;
- reter;
- expandir.

---

# 39. Plano de instrumentação financeira

Desde o primeiro cliente, registrar por tenant:

| Campo | Exemplo |
|---|---|
| Plano | Comercial |
| MRR | R$1.997 |
| Setup | R$4.990 |
| Data de entrada | 12/08/2026 |
| CAC | R$3.800 |
| Infra mensal | R$130 |
| Suporte mensal | R$210 |
| IA | R$0 |
| Horas de suporte | 1,8 h |
| Add-ons | Follow-up |
| Expansion MRR | R$890 |
| Motivo de churn | — |

Sem isso, LTV e margem serão estimativas.

---

# 40. Fórmulas para dashboard

## MRR

```text
MRR =
soma de todas as receitas recorrentes ativas
```

## ARR

```text
ARR = MRR × 12
```

## ARPA

```text
ARPA =
MRR total
÷
clientes ativos
```

## Logo churn

```text
Logo churn =
clientes cancelados no período
÷
clientes no início do período
```

## Revenue churn

```text
Revenue churn =
MRR perdido
÷
MRR inicial
```

## Gross Margin

```text
Gross Margin =
(MRR - custos diretos)
÷
MRR
```

## CAC

```text
CAC =
gasto total em aquisição
÷
novos clientes
```

## CAC Payback

```text
CAC Payback =
CAC
÷
margem bruta mensal por cliente
```

## LTV simplificado

```text
LTV =
margem bruta mensal
÷
churn mensal
```

## LTV/CAC

```text
LTV/CAC =
LTV
÷
CAC
```

## NRR

```text
NRR =
(MRR inicial - churn - downgrade + expansão)
÷
MRR inicial
```

---

# 41. Decisões recomendadas

1. Manter o SaaS atual como entrada de baixo toque.
2. Criar três ofertas gerenciadas com preço bem acima do SaaS.
3. Colocar BottleCRM dentro do plano Comercial.
4. Tratar Chatwoot como camada de conversa e BottleCRM como camada de receita.
5. Não vender tecnologia pelo nome.
6. Cobrar setup em todos os serviços gerenciados.
7. Não oferecer IA ilimitada.
8. Não oferecer automação ilimitada.
9. Cobrar manutenção recorrente das integrações.
10. Medir horas humanas por cliente.
11. Priorizar expansão dentro da base.
12. Buscar NRR acima de 105% após o lançamento dos módulos.
13. Criar disciplina de CAC e payback desde o primeiro cliente.
14. Revisar licenças da stack antes de consolidar arquitetura multi-tenant.
15. Transformar pedidos repetidos em módulos; pedidos únicos ficam como projeto RC2.

---

# 42. Resumo executivo de preços

## Fase 1

| Oferta | Setup | MRR |
|---|---:|---:|
| Zapbox Atendimento | R$1.990 | R$997 |
| Zapbox Comercial | R$4.990 | R$1.997 |
| Zapbox Sales AI | R$8.990 | R$3.997 |

## Fase 2

| Módulo | Setup | MRR |
|---|---:|---:|
| Automação | R$1.990+ | R$790+ |
| Qualifica | R$1.990+ | R$690+ |
| Agenda | R$990+ | R$390+ |
| Follow-up | R$2.490+ | R$890+ |
| Integra | R$1.990–7.500+ | R$690+/integração |
| Enterprise | R$15.000+ | R$4.990+ |

---

# 43. Conclusão

A oportunidade do Zapbox não está em empacotar ferramentas open source.

Está em criar uma plataforma recorrente que entra pela dor mais simples — **organizar atendimento** — e avança até se tornar parte central da operação de receita do cliente.

A estratégia é:

```text
ATENDIMENTO
    ↓
CRM
    ↓
AUTOMAÇÃO
    ↓
FOLLOW-UP
    ↓
AGENDA
    ↓
IA
    ↓
INTEGRAÇÕES
```

O cliente começa comprando organização.

Depois compra produtividade.

Depois compra conversão.

Depois compra inteligência.

Esse é o caminho para aumentar:

- MRR;
- ARPA;
- ARR;
- NRR;
- LTV;
- switching cost.

Ao mesmo tempo, setup, limites de escopo, cobrança de consumo e disciplina operacional protegem a margem e o payback.

---

## Referências técnicas consultadas para esta versão

Validação realizada em 12/08/2026 com documentação pública vigente de:

- Zapbox;
- BottleCRM;
- Chatwoot;
- n8n;
- Typebot;
- Cal.com;
- Evolution API.

As licenças e políticas desses projetos podem mudar. Revalidar juridicamente e tecnicamente antes de escalar qualquer modelo de revenda, white-label, hospedagem centralizada ou multi-tenant.
