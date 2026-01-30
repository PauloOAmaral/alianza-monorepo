# Escopo funcional - Atribuição de professores a alunos

**Projeto:** CRM Alianza
**Versão:** v1.0.0
**Data:** 27 de jan. de 2026
**Responsável:** [Nome do Responsável]
**Status:** EM PROGRESSO

---

## Contexto e Propósito

O módulo de **Atribuição de Professores a Alunos** permite que a área de distribuições realize a vinculação manual de professores aos alunos que ainda não possuem um professor atribuído.

O processo de atribuição utiliza filtros flexíveis para identificar alunos elegíveis, seja pela data de matrícula ou pelo status de distribuição pendente. Após a seleção do professor pelo analista, é necessária a **aprovação do professor** para confirmar a atribuição. O professor pode aceitar a atribuição por email, ou o analista pode enviar mensagem direta no celular do aluno. Somente após a aprovação do professor o aluno é vinculado definitivamente.

O objetivo é garantir que todos os alunos novos e alunos que ficaram sem professor por algum motivo sejam devidamente alocados a um profissional capacitado, assegurando a continuidade do processo pedagógico.

---

## 1. Objetivo

Descrever o processo de atribuição de professores a alunos, incluindo critérios de filtragem por data de matrícula, cruzamento de horários disponíveis, aprovação do professor, regras de distribuição, validações e ações associadas ao processo de vinculação.

---

## 2. Pré-requisitos

Este módulo depende dos seguintes escopos e funcionalidades já implementados:

| Módulo/Funcionalidade | Descrição | Dependência |
|----------------------|-----------|-------------|
| Cadastro de Professores | Módulo de cadastro e manutenção de dados dos professores | Obrigatório - Professores devem estar cadastrados com dados completos (nome, idioma, região/fuso horário, status ativo/inativo) |
| Gestão de Agenda dos Professores | Módulo de gerenciamento de horários disponíveis dos professores | Obrigatório - Professores devem ter agenda cadastrada com horários disponíveis para cruzamento |
| Cadastro de Alunos | Módulo de cadastro e manutenção de dados dos alunos | Obrigatório - Alunos devem estar cadastrados com dados completos (nome, idade, país/fuso horário, horários disponíveis, idioma) |
| Feedback da Aula Experimental | Módulo de registro de feedback da aula experimental | Obrigatório - Feedback deve conter informações pedagógicas (nível, material recomendado, motivo do curso) |
| Sistema de Notificações | Funcionalidade de envio de emails e mensagens | Obrigatório - Para envio de solicitações de aprovação ao professor |

---

## 3. Escopo

### Inclui

- Filtragem de alunos por data de matrícula ou por status de distribuição pendente
- Identificação de alunos sem professor atribuído
- Distribuição de alunos novos a professores disponíveis
- Redistribuição de alunos que perderam o professor
- Visualização de alunos pendentes de atribuição com informações pedagógicas e de disponibilidade
- Exibição de feedback da aula experimental, nível, idade, horários e material recomendado
- Conversão automática de fuso horário (exibir horário do aluno no país dele e horário do professor na região dele)
- Cruzamento de horários disponíveis do aluno com horários disponíveis na agenda do professor
- Solicitação de aprovação do professor para a atribuição
- Aprovação ou recusa da atribuição pelo professor (via email ou outro canal)
- Envio de mensagem pelo analista ao aluno (opcional, via celular)
- Registro de histórico de atribuições e aprovações
- Notificação ao professor sobre novos alunos atribuídos
- Validação de disponibilidade na agenda do professor

### Exclui

- Atribuição automática sem validação da área de distribuições
- Remoção de professor de aluno ativo sem justificativa
- Atribuição de professores inativos ou bloqueados
- Transferência de aluno entre professores (escopo de outro módulo)
- Gestão de agenda dos professores (escopo de outro módulo)
- Bloqueio ou liberação de horários na agenda do professor

---

## 4. Atores Envolvidos

| Ator                   | Descrição                                     | Responsabilidades                                                                 |
| ---------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Área de Distribuições  | Equipe responsável pela gestão de atribuições | Realizar distribuição de alunos, validar compatibilidade de horários, enviar mensagens ao aluno |
| Professor              | Docente da escola                             | Aprovar ou recusar atribuições propostas, iniciar processo pedagógico             |
| Sistema                | Plataforma                                    | Filtrar alunos elegíveis, validar regras de negócio, registrar atribuições, enviar notificações |
| Coordenação Pedagógica | Usuário interno                               | Visualizar relatórios de distribuição e acompanhar atribuições                    |

---

## 5. Fluxos de Negócio

### FLX501 - Acesso à tela de distribuição

A área de distribuições acessa o módulo de atribuição de professores a alunos.

### FLX502 - Filtragem de alunos

A área de distribuições aplica filtros para identificar alunos elegíveis à atribuição:

- **Por data de matrícula**: Filtra alunos matriculados em uma data específica
- **Por status de distribuição pendente**: Filtra todos os alunos que estão com status "distribuição pendente", independente da data

### FLX503 - Visualização de alunos pendentes

O sistema exibe a lista de alunos que necessitam de atribuição de professor, incluindo as seguintes informações para apoiar a decisão:

**Informações do aluno:**

- Nome e identificação
- Status (novo aluno ou aluno que perdeu professor)
- Idade
- País/fuso horário
- Nível do aluno (identificado na aula experimental)
- Idioma do curso

**Informações pedagógicas:**

- Feedback da aula experimental
- Material recomendado pelo professor da aula experimental
- Motivo do curso

**Informações de horário:**

- Horários disponíveis do aluno no fuso horário do país dele (ex: 8h no Brasil)
- Período de aula pretendido (ex: 4 x 45min, 2 x 60min)
- Ao selecionar um professor, o sistema exibe claramente qual será o horário correspondente no fuso do professor (ex: se a aula é às 8h para o aluno, será às 6h ou 9h para o professor, dependendo do fuso)

### FLX504 - Seleção do professor e cruzamento de horários

A área de distribuições seleciona o professor disponível para realizar a atribuição, considerando:

- Especialidade/idioma
- Material recomendado na aula experimental
- Nível do aluno
- Compatibilidade de horários entre aluno e professor

O sistema realiza o cruzamento automático de horários:

- **Horários disponíveis do aluno** (no fuso horário do aluno)
- **Horários disponíveis na agenda do professor** (no fuso horário do professor)
- Exibe os horários compatíveis entre aluno e professor com conversão clara

Exemplo de exibição:

- "Horários compatíveis: 8h (BR) = 6h (PT) ✓"
- "Horários do aluno sem correspondência: 14h (BR) = 12h (PT) ✗ (professor indisponível)"

### FLX505 - Registro da atribuição proposta

O sistema valida as regras de negócio e registra a atribuição proposta com status "Aguardando aprovação do professor".

### FLX506 - Solicitação de aprovação ao professor

O sistema ou analista solicita aprovação do professor para a atribuição:
- **Por email**: O sistema envia email ao professor com detalhes do aluno e link para aprovar/recusar
- **Por mensagem direta**: O analista envia mensagem no celular do aluno comunicando a atribuição (método alternativo)

O professor tem **60 minutos** para responder à solicitação.

### FLX507 - Aprovação ou recusa pelo professor

O professor recebe a solicitação e tem 60 minutos para decidir:
- **Aprovar**: Aceita o novo aluno e confirma disponibilidade
- **Recusar**: Rejeita a atribuição (com motivo opcional)
- **Não responder**: Após 60 minutos, a atribuição expira automaticamente

### FLX508 - Vinculação definitiva do aluno

Após a aprovação do professor:
- O sistema altera o status da atribuição para "Aprovada"
- O aluno é vinculado definitivamente ao professor
- O sistema registra a data/hora de aprovação
- Notificações são enviadas ao analista e ao aluno

---

## 6. Regras de Negócio

| Código  | Regra                        | Condição                                                                                          | Ação Esperada                                                                   |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ATR001  | Aluno sem professor          | Aluno não possui professor ativo                                                                  | Incluir na lista de distribuição                                                |
| ATR002  | Filtro por data              | Data de matrícula corresponde à data selecionada                                                  | Exibir aluno para distribuição                                                  |
| ATR002A | Filtro por status            | Status de distribuição = "Pendente"                                                               | Exibir aluno para distribuição                                                  |
| ATR003  | Professor ativo              | Professor está inativo ou bloqueado                                                               | Impedir atribuição                                                              |
| ATR004  | Agenda do professor          | Professor não possui agenda cadastrada                                                            | Impedir atribuição                                                              |
| ATR005  | Idioma compatível            | Idioma do professor não corresponde ao idioma do aluno                                            | Não aparece na lista de professores                                             |
| ATR006  | Aluno já atribuído           | Aluno já possui professor ativo                                                                   | Impedir nova atribuição                                                         |
| ATR007  | Histórico de atribuição      | Toda atribuição realizada                                                                         | Registrar log com data, responsável e professor, no histórico do aluno          |
| ATR008  | Matrícula válida             | Matrícula do aluno está cancelada ou suspensa                                                     | Impedir atribuição e informar o motivo                                          |
| ATR009  | Cruzamento de horários       | Sistema deve cruzar horários disponíveis do aluno com horários disponíveis na agenda do professor | Exibir horários compatíveis e incompatíveis com conversão de fuso               |
| ATR010  | Conversão de fuso horário    | Sempre exibir o horário da aula no fuso do aluno E o horário correspondente no fuso do professor  | Calcular e exibir conversão automática de forma clara (ex: "8h (BR) = 6h (PT)") |
| ATR011  | Horário disponível na agenda | Horário do aluno não possui correspondência disponível na agenda do professor                     | Exibir alerta de incompatibilidade ou bloquear atribuição                       |
| ATR012  | Aprovação obrigatória        | Toda atribuição registrada                                                                         | Atribuição fica com status "Aguardando aprovação do professor"                  |
| ATR013  | Aprovação do professor       | Professor aprova a atribuição                                                                      | Vincular aluno definitivamente e alterar status para "Aprovada"                 |
| ATR014  | Recusa do professor          | Professor recusa a atribuição                                                                      | Alterar status para "Recusada" e liberar aluno para nova distribuição           |
| ATR015  | Prazo de aprovação           | Atribuição sem resposta do professor após 60 minutos                                               | Expirar automaticamente a atribuição e liberar aluno para nova distribuição     |

---

## 7. Eventos e Reações do Sistema

| Código | Evento                           | Gatilho        | Reação do Sistema                                                           |
| ------ | -------------------------------- | -------------- | --------------------------------------------------------------------------- |
| EV5001 | Acesso à distribuição            | FLX501         | Carregar tela de atribuições                                                |
| EV5002 | Filtragem aplicada               | FLX502         | Exibir alunos pendentes                                                     |
| EV5003 | Atribuição realizada             | FLX505         | Persistir dados e registrar log                                             |
| EV5004 | Professor notificado             | FLX506         | Enviar notificação manual ao professor                                      |
| EV5005 | Tentativa inválida               | ATR001-ATR015  | Exibir mensagem de erro                                                     |
| EV5006 | Cruzamento de horários executado | FLX504         | Comparar horários do aluno com agenda do professor e exibir compatibilidade |
| EV5007 | Atribuição proposta registrada   | FLX505         | Alterar status de "Pendente" para "Aguardando aprovação do professor"      |
| EV5008 | Conversão de fuso horário        | FLX503, FLX504 | Calcular e exibir horários nos fusos correspondentes                        |
| EV5009 | Solicitação enviada ao professor | FLX506         | Enviar email ou notificação ao professor para aprovação                     |
| EV5010 | Professor aprovou atribuição     | FLX507         | Vincular aluno definitivamente ao professor (FLX508)                        |
| EV5011 | Professor recusou atribuição     | FLX507         | Alterar status para "Recusada" e liberar aluno para redistribuição          |
| EV5012 | Mensagem enviada ao aluno        | FLX506         | Registrar envio de mensagem pelo analista ao celular do aluno               |

---

## 8. Campos da Atribuição

| Campo                         | Obrigatório | Observações                                                                      |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------- |
| Aluno                         | Sim         | Selecionado da lista filtrada                                                    |
| Professor                     | Sim         | Professor ativo e disponível                                                     |
| Data de atribuição proposta   | Sim         | Preenchido automaticamente (data/hora da proposta)                               |
| Data de aprovação             | Não         | Preenchido quando professor aprovar                                              |
| Responsável pela distribuição | Sim         | Usuário logado no momento da atribuição                                          |
| Idioma                        | Sim         | Herdado do cadastro do aluno                                                     |
| Motivo da atribuição          | Não         | Ex: Novo aluno, Professor anterior saiu, Remanejamento                           |
| Motivo da recusa              | Não         | Preenchido pelo professor ao recusar (opcional)                                  |
| Observações                   | Não         | Texto livre                                                                      |
| Status da atribuição          | Sim         | Aguardando aprovação, Aprovada, Recusada, Expirada                               |
| Status de distribuição        | Sim         | Pendente, Atribuído                                                              |
| Canal de aprovação            | Não         | Email, Mensagem celular (registro de como foi solicitada/aprovada a atribuição) |

## 8.1 Informações de Apoio à Decisão (Exibição)

Campos exibidos durante o processo de atribuição para apoiar a decisão:

| Campo                            | Origem                         | Observações                                                                                          |
| -------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Feedback da aula experimental    | Módulo de Feedback (vinculado) | Observações pedagógicas do professor da aula experimental                                            |
| Nível do aluno                   | Feedback da aula experimental  | Ex: Iniciante, Básico, Intermediário, Avançado                                                       |
| Idade                            | Cadastro do aluno              | Idade atual do aluno                                                                                 |
| Horários do aluno                | Cadastro do aluno              | Horários disponíveis do aluno no fuso do país dele (ex: 8h, 14h, 18h BR)                             |
| Agenda do professor              | Cadastro do professor          | Horários disponíveis na agenda do professor no fuso da região dele                                   |
| Cruzamento de horários           | Cálculo automático             | Sistema cruza os horários e exibe quais são compatíveis (ex: "8h BR = 6h PT ✓", "14h BR = 12h PT ✗") |
| Conversão de horário             | Cálculo automático             | Exibe o horário correspondente com conversão de fuso (ex: "8h BR = 6h PT")                           |
| Período de aula                  | Cadastro do aluno              | Ex: 4 x 45min, 2 x 60min, 3 x 50min                                                                  |
| Motivo do curso                  | Feedback da aula experimental  | Ex: Trabalho, viagem, estudos, interesse pessoal                                                     |
| Material recomendado             | Feedback da aula experimental  | Material sugerido pelo professor da aula experimental                                                |
| País/Fuso horário do aluno       | Cadastro do aluno              | Informação de localização para conversão de horários                                                 |
| Região/Fuso horário do professor | Cadastro do professor          | Informação de localização para conversão de horários                                                 |

---

## 9. Mensagens do Sistema

| Código | Tipo    | Mensagem                                                                                  | Exibição |
| ------ | ------- | ----------------------------------------------------------------------------------------- | -------- |
| MSG501 | Erro    | "Aluno não encontrado."                                                                   | Tela     |
| MSG502 | Erro    | "Este aluno já possui um professor atribuído."                                            | Tela     |
| MSG503 | Erro    | "O professor selecionado está inativo."                                                   | Tela     |
| MSG504 | Erro    | "O professor não possui agenda cadastrada."                                               | Tela     |
| MSG505 | Alerta  | "O idioma do professor não corresponde ao idioma do aluno."                               | Tela     |
| MSG506 | Erro    | "A matrícula do aluno está cancelada ou suspensa."                                        | Tela     |
| MSG507 | Erro    | "Selecione um professor para continuar."                                                  | Tela     |
| MSG508 | Sucesso | "Professor atribuído com sucesso!"                                                        | Tela     |
| MSG509 | Erro    | "Erro ao realizar a atribuição. Tente novamente."                                         | Tela     |
| MSG510 | Alerta  | "Nenhum aluno pendente de atribuição encontrado para o filtro selecionado."               | Tela     |
| MSG511 | Sucesso | "Notificação enviada ao professor."                                                       | Tela     |
| MSG512 | Info    | "Existem [X] alunos pendentes de atribuição."                                             | Tela     |
| MSG513 | Alerta  | "Nenhum horário compatível encontrado entre aluno e professor."                              | Tela     |
| MSG514 | Info    | "Horários compatíveis: [HH:MM] ([País do aluno]) = [HH:MM] ([País do professor])"            | Tela     |
| MSG515 | Alerta  | "Atenção: Apenas [X] de [Y] horários do aluno são compatíveis com a agenda do professor."    | Tela     |
| MSG516 | Sucesso | "Atribuição proposta registrada. Aguardando aprovação do professor."                         | Tela     |
| MSG517 | Info    | "Solicitação de aprovação enviada ao professor por email."                                   | Tela     |
| MSG518 | Sucesso | "Professor aprovou a atribuição. Aluno vinculado com sucesso!"                               | Tela     |
| MSG519 | Alerta  | "Professor recusou a atribuição. Motivo: [motivo]"                                           | Tela     |
| MSG520 | Info    | "Atribuição aguardando aprovação do professor há [X] minutos."                               | Tela     |
| MSG521 | Erro    | "Não é possível alterar uma atribuição já aprovada pelo professor."                          | Tela     |
| MSG522 | Alerta  | "A atribuição expirou por falta de resposta do professor (prazo de 60 minutos)."             | Tela     |
| MSG523 | Alerta  | "Atenção: Esta atribuição expira em [X] minutos."                                            | Tela     |

---

## 10. Considerações Adicionais

- O sistema deve manter um histórico completo de todas as atribuições realizadas, incluindo propostas, aprovações e recusas
- Relatórios de distribuição devem estar disponíveis para a coordenação pedagógica, incluindo status de aprovação
- Em caso de múltiplos alunos, o sistema deve permitir atribuição em lote (todas as atribuições ficam aguardando aprovação individual do professor)
- O sistema deve sempre exibir de forma clara a conversão de horários: qual o horário da aula para o aluno (no fuso dele) e qual será o horário correspondente para o professor (no fuso dele)
- A conversão de fuso horário deve ser automática e exibida de forma explícita para facilitar a decisão do analista (ex: "8h para o aluno = 6h para o professor")
- O cruzamento de horários deve mostrar claramente quais horários do aluno têm correspondência disponível na agenda do professor
- As informações da aula experimental (feedback, nível, material recomendado) são fundamentais para a decisão de atribuição
- A agenda do professor é a fonte de verdade para disponibilidade de horários - não há limite fixo de alunos, mas sim horários disponíveis na agenda
- A aprovação do professor é obrigatória para confirmar a vinculação do aluno - a atribuição não é efetivada até que o professor aceite
- O prazo para aprovação do professor é de **60 minutos**. Após esse período, a atribuição expira automaticamente e o aluno retorna ao status de distribuição pendente
- O professor pode recusar atribuições a qualquer momento dentro do prazo, devolvendo o aluno para o pool de distribuição pendente
