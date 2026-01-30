# Escopo funcional - Cobrança de Faturas

**Projeto:** CRM Alianza
**Versão:** v1.0.0
**Data:** 28 de jan. de 2026
**Responsável:** [Nome do Responsável]
**Status:** EM PROGRESSO

---

## Contexto e Propósito

O módulo de **Cobrança de Faturas** permite o gerenciamento e controle de inadimplência dos alunos pela **área financeira**.

A área financeira é responsável por:
- Acompanhar faturas que vencerão em 3 dias e faturas vencidas até 3 dias após o vencimento
- Entrar em contato com os alunos inadimplentes (por telefone, email, WhatsApp, etc.)
- Decidir quando alterar o status dos alunos (ativo, inativo ou bloqueado)

Sempre que ocorrer uma alteração no status do aluno, **a área de distribuição é notificada automaticamente** para que tome as ações necessárias (comunicação com professores, redistribuição de alunos, etc.).

O objetivo é facilitar o controle de inadimplência, permitir que a área financeira gerencie o status dos alunos de forma manual com base na situação de pagamento, e manter a área de distribuição informada sobre mudanças que possam impactar a gestão pedagógica.

---

## 1. Objetivo

Descrever o processo de gestão de cobranças de faturas, incluindo visualização de faturas a vencer e vencidas, alteração manual de status dos alunos baseada em inadimplência, e notificação automática à área de distribuição quando houver mudança de status.

---

## 2. Pré-requisitos

Este módulo depende dos seguintes escopos e funcionalidades já implementados:

| Módulo/Funcionalidade | Descrição | Dependência |
|----------------------|-----------|-------------|
| Cadastro de Alunos | Módulo de cadastro e manutenção de dados dos alunos | Obrigatório - Alunos devem estar cadastrados com dados completos (nome, email, telefone, status) |
| Gestão de Matrículas | Módulo de gestão de planos e contratos dos alunos | Obrigatório - Matrículas devem conter informações de plano, valor, dia de vencimento |
| Sistema de Notificações | Funcionalidade de envio de notificações internas | Obrigatório - Para envio de alertas à área de distribuição |
| Gestão de Distribuições | Módulo de atribuição de professores a alunos | Obrigatório - A área de distribuição precisa ser notificada sobre mudanças de status dos alunos |
| Baixa de Pagamento | Módulo de registro de pagamentos | Obrigatório - Para atualização do status das faturas quando houver pagamento |

---

## 3. Escopo

### Inclui

- Visualização de faturas que vencerão em 3 dias
- Visualização de faturas vencidas (até 3 dias após o vencimento e faturas com mais de 3 dias de atraso)
- Visualização de faturas pendentes, pagas e vencidas
- Alteração manual de status dos alunos (ativo, inativo, bloqueado) pela área financeira
- Notificação automática à área de distribuição quando houver alteração de status de aluno
- Registro de histórico de mudanças de status
- Bloqueio de acesso do aluno ao sistema quando status for alterado para bloqueado
- Reativação de aluno quando status for alterado para ativo
- Relatórios de inadimplência e dashboards financeiros
- Acesso rápido aos dados de contato do aluno para cobrança manual
- Registro de tentativas de contato com o aluno

### Exclui

- Registro de pagamentos (escopo do módulo de Baixa de Pagamento)
- Envio automático de lembretes ou emails (área financeira faz contato manual)
- Jobs agendados ou automações de cobrança
- Integração com gateway de pagamento (não haverá cobrança automática)
- Alteração automática de status baseada em regras (decisão é manual da área financeira)
- Gestão de planos e valores de mensalidade (escopo de outro módulo)
- Emissão de notas fiscais (escopo de outro módulo)
- Negociação de dívidas e acordos de pagamento (escopo de outro módulo)
- Cancelamento de matrícula (escopo de outro módulo)

---

## 4. Atores Envolvidos

| Ator                   | Descrição                                     | Responsabilidades                                                                 |
| ---------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Sistema                | Plataforma                                    | Notificar área de distribuição sobre mudanças de status, exibir dashboards       |
| Área Financeira        | Equipe responsável pela gestão financeira     | Acompanhar faturas, entrar em contato com alunos, decidir sobre mudanças de status |
| Área de Distribuição   | Equipe responsável pela gestão de atribuições | Receber notificações de mudança de status, comunicar professores, redistribuir alunos |
| Aluno                  | Cliente da escola                             | Realizar pagamentos                                                               |

---

## 5. Fluxos de Negócio

### FLX601 - Visualização de faturas a vencer (3 dias antes do vencimento)

A área financeira acessa o módulo de cobranças:

1. Visualiza lista de faturas que vencerão em 3 dias
2. Para cada aluno, visualiza:
   - Nome e dados de contato (telefone, email, WhatsApp)
   - Valor da fatura
   - Data de vencimento
   - Status da fatura
   - Histórico de tentativas de contato
3. Entra em contato com o aluno manualmente (telefone, email, WhatsApp)
4. Registra a tentativa de contato no histórico com:
   - Data/hora do contato
   - Canal utilizado (telefone, email, WhatsApp)
   - Resultado do contato (atendeu, não atendeu, prometeu pagar, etc.)
   - Observações

### FLX602 - Visualização de faturas no dia do vencimento

A área financeira acessa o módulo de cobranças:

1. Visualiza lista de faturas que vencem hoje
2. Identifica quais alunos ainda não pagaram
3. Entra em contato com os alunos manualmente
4. Registra as tentativas de contato

### FLX603 - Visualização de faturas vencidas (1 a 3 dias após vencimento)

A área financeira acessa o módulo de cobranças:

1. Visualiza lista de faturas vencidas por período:
   - Vencidas há 1 dia
   - Vencidas há 2 dias
   - Vencidas há 3 dias
   - Vencidas há mais de 3 dias
2. Para cada aluno inadimplente, visualiza:
   - Nome e dados de contato
   - Dias de atraso
   - Valor devido (pode incluir múltiplas faturas)
   - Histórico de tentativas de contato
   - Status atual do aluno
   - Professor atribuído (se houver)
3. Entra em contato com o aluno manualmente
4. Registra a tentativa de contato
5. Decide se irá alterar o status do aluno (inativar ou bloquear)

### FLX604 - Alteração manual de status do aluno

A área financeira decide alterar o status do aluno com base na inadimplência:

1. Acessa a ficha do aluno
2. Visualiza:
   - Histórico de faturas (pagas, pendentes, vencidas)
   - Histórico de tentativas de contato
   - Dias de atraso
   - Valor total devido
   - Professor atribuído
3. Decide alterar o status para:
   - **INATIVO**: Aluno com inadimplência, mas ainda em período de tolerância
   - **BLOQUEADO**: Aluno com inadimplência grave, acesso ao sistema bloqueado
   - **ATIVO**: Reativação após regularização de pagamento (via módulo de Baixa de Pagamento)
4. Registra o motivo da mudança de status (opcional mas recomendado)
5. Confirma a alteração
6. O sistema:
   - Registra a mudança no histórico
   - **Notifica automaticamente a área de distribuição** (FLX605)
   - Se status for **BLOQUEADO**, bloqueia acesso do aluno ao sistema
   - Se status for **ATIVO**, libera acesso do aluno ao sistema

### FLX605 - Notificação automática à área de distribuição

Sempre que houver alteração de status do aluno (ativo → inativo, inativo → bloqueado, bloqueado → ativo, etc.), o sistema automaticamente:

1. Registra o histórico de mudança de status com:
   - Data/hora da mudança
   - Status anterior e novo status
   - Responsável pela mudança
   - Motivo (se informado)
2. Envia **notificação interna** à área de distribuição com:
   - Nome do aluno
   - Professor atribuído (se houver)
   - Status anterior e novo status
   - Motivo da mudança (se registrado)
   - Data/hora da mudança
   - Responsável pela mudança (usuário da área financeira)
3. A área de distribuição pode tomar ações conforme necessário:
   - Comunicar o professor sobre a situação do aluno
   - Redistribuir aluno (se necessário)
   - Entrar em contato com o aluno

---

## 6. Regras de Negócio

| Código  | Regra                        | Condição                                                                                          | Ação Esperada                                                                   |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| COB001  | Filtro de faturas a vencer | Área financeira acessa módulo de cobranças | Exibir faturas que vencerão em 3 dias |
| COB002  | Filtro de faturas no vencimento | Área financeira acessa módulo de cobranças | Exibir faturas que vencem hoje |
| COB003  | Filtro de faturas vencidas | Área financeira acessa módulo de cobranças | Exibir faturas vencidas por período (1, 2, 3 ou mais dias) |
| COB004  | Marcação automática de vencida | Fatura passou da data de vencimento sem pagamento | Sistema marca como "vencida" automaticamente |
| COB005  | Mudança de status manual | Área financeira altera status do aluno | Registrar mudança e notificar área de distribuição automaticamente |
| COB006  | Status Bloqueado | Aluno com status BLOQUEADO | Impedir login e acesso ao sistema |
| COB007  | Notificação obrigatória | Toda mudança de status do aluno | Notificar área de distribuição automaticamente com detalhes |
| COB008  | Histórico de mudanças | Toda alteração de status | Registrar log com data, responsável, status anterior/novo e motivo |
| COB009  | Múltiplas faturas vencidas | Aluno possui mais de uma fatura vencida | Exibir total devido consolidado |
| COB010  | Reativação de aluno | Área financeira altera status para ATIVO | Liberar acesso ao sistema e notificar distribuição |
| COB011  | Visualização de inadimplentes | Área financeira acessa lista de inadimplentes | Exibir alunos com faturas vencidas, dias de atraso e valor total devido |
| COB012  | Dados de contato | Visualização de aluno inadimplente | Exibir telefone, email e WhatsApp para facilitar contato manual |
| COB013  | Registro de tentativa de contato | Área financeira tenta contato com aluno | Registrar data, canal, resultado e observações |
| COB014  | Inativação manual | Área financeira inativa aluno | Manter acesso ao sistema, mas sinalizar inadimplência à distribuição |

---

## 7. Eventos e Reações do Sistema

| Código | Evento                           | Gatilho        | Reação do Sistema                                                           |
| ------ | -------------------------------- | -------------- | --------------------------------------------------------------------------- |
| EV6001 | Fatura vencida | Data passou do vencimento sem pagamento | Marcar automaticamente como "vencida" |
| EV6002 | Status alterado | Área financeira altera status do aluno (FLX604) | Registrar mudança, bloquear/liberar acesso, notificar distribuição (FLX605) |
| EV6003 | Status alterado para BLOQUEADO | Área financeira bloqueia aluno | Bloquear acesso ao sistema e notificar distribuição |
| EV6004 | Status alterado para ATIVO | Área financeira reativa aluno | Liberar acesso ao sistema e notificar distribuição |
| EV6005 | Status alterado para INATIVO | Área financeira inativa aluno | Notificar distribuição (acesso ao sistema permanece) |
| EV6006 | Tentativa de login de aluno bloqueado | Aluno bloqueado tenta acessar sistema | Exibir mensagem de bloqueio e informações de contato |
| EV6007 | Tentativa de contato registrada | Área financeira registra contato | Adicionar ao histórico de tentativas do aluno |
| EV6008 | Pagamento registrado | Módulo de Baixa de Pagamento registra pagamento | Atualizar status da fatura, permitir reativação do aluno |

---

## 8. Campos de Controle de Status do Aluno

| Campo                     | Obrigatório | Observações                                           |
| ------------------------- | ----------- | ----------------------------------------------------- |
| Status do aluno           | Sim         | Ativo, Inativo, Bloqueado                             |
| Data da mudança de status | Sim         | Preenchido a cada mudança                             |
| Motivo da mudança         | Não         | Texto livre (opcional, registrado pela área financeira) |
| Status anterior           | Sim         | Para histórico                                        |
| Notificação enviada       | Sim         | Flag indicando se área de distribuição foi notificada |
| Data da notificação       | Sim         | Quando a notificação foi enviada                      |
| Responsável pela mudança  | Sim         | Usuário da área financeira que alterou o status       |

## 8.1 Campos de Tentativa de Contato

| Campo                     | Obrigatório | Observações                                           |
| ------------------------- | ----------- | ----------------------------------------------------- |
| Data/hora do contato      | Sim         | Quando a tentativa foi realizada                      |
| Canal utilizado           | Sim         | Telefone, Email, WhatsApp, SMS, Presencial, etc.      |
| Resultado do contato      | Sim         | Atendeu, Não atendeu, Caixa postal, Prometeu pagar, Negociou prazo, etc. |
| Observações               | Não         | Texto livre para detalhes adicionais                  |
| Responsável               | Sim         | Usuário da área financeira que fez o contato          |

---

## 9. Mensagens do Sistema

| Código | Tipo    | Mensagem                                                                                  | Exibição |
| ------ | ------- | ----------------------------------------------------------------------------------------- | -------- |
| MSG601 | Sucesso | "Status do aluno alterado com sucesso de [status anterior] para [novo status]." | Tela |
| MSG602 | Sucesso | "Tentativa de contato registrada com sucesso." | Tela |
| MSG603 | Info | "[Interno] Aluno [nome] teve status alterado de [status anterior] para [novo status]. Responsável: [nome do usuário]" | Notificação interna (Área distribuição) |
| MSG604 | Alerta | "[Interno] Atenção: Aluno [nome] (Professor: [professor]) foi BLOQUEADO por inadimplência. Responsável: [nome do usuário]" | Notificação interna (Área distribuição) |
| MSG605 | Info | "[Interno] Aluno [nome] (Professor: [professor]) foi REATIVADO. Responsável: [nome do usuário]" | Notificação interna (Área distribuição) |
| MSG606 | Alerta | "[Interno] Aluno [nome] (Professor: [professor]) foi INATIVADO por inadimplência. Responsável: [nome do usuário]" | Notificação interna (Área distribuição) |
| MSG607 | Erro | "Não é possível acessar o sistema. Sua conta está bloqueada. Entre em contato: financeiro@alianza.com" | Tela de login |
| MSG608 | Alerta | "O aluno [nome] está com [X] faturas vencidas totalizando R$ [valor]." | Tela |
| MSG609 | Info | "Existem [X] faturas vencendo em 3 dias." | Dashboard |
| MSG610 | Alerta | "Existem [X] faturas vencidas." | Dashboard |
| MSG611 | Info | "Última tentativa de contato: [data] via [canal] - [resultado]" | Tela |

---

## 10. Considerações Adicionais

- O histórico completo de mudanças de status e tentativas de contato deve ser mantido para auditoria e relatórios
- A área de distribuição deve ter acesso a um painel com alunos que tiveram mudança de status recente
- O sistema deve lidar com múltiplas faturas vencidas de um mesmo aluno, exibindo o valor total devido consolidado
- A área financeira deve ter acesso aos dados de contato do aluno (telefone, email, WhatsApp) de forma fácil e rápida para facilitar a cobrança manual
- A área financeira deve ter acesso a dashboards de:
  - Faturas vencendo em 3 dias
  - Faturas vencidas por período (1, 2, 3 ou mais dias)
  - Alunos por status (ativo, inativo, bloqueado)
  - Taxa de inadimplência
  - Valor total em atraso
  - Histórico de tentativas de contato
  - Efetividade de contato por canal
- É importante manter sincronia entre o status do aluno no sistema de cobrança e no sistema de distribuição/pedagógico através das notificações automáticas
- A janela de visualização de 3 dias antes e 3 dias depois do vencimento foi definida para facilitar o acompanhamento pela área financeira
- A decisão sobre quando inativar ou bloquear um aluno é sempre **manual e da responsabilidade da área financeira**
- O sistema não deve executar nenhuma automação de cobrança ou envio de mensagens - tudo é feito manualmente pela área financeira
- Recomenda-se que a área financeira tenha critérios claros (mas flexíveis) para decidir quando inativar ou bloquear alunos
- A interface deve priorizar facilidade de uso e rapidez no acesso às informações essenciais para cobrança
- O registro de tentativas de contato é importante para rastreabilidade e análise de efetividade da cobrança
- Status INATIVO e BLOQUEADO têm diferenças importantes:
  - **INATIVO**: Aluno com inadimplência, mas ainda mantém acesso ao sistema. Área de distribuição é notificada.
  - **BLOQUEADO**: Aluno com inadimplência grave, acesso ao sistema é bloqueado. Situação mais crítica.
