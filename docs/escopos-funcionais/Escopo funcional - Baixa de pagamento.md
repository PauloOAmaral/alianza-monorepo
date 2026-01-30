# Escopo funcional - Baixa de Pagamento

**Projeto:** CRM Alianza
**Versão:** v1.0.0
**Data:** 28 de jan. de 2026
**Responsável:** [Nome do Responsável]
**Status:** EM PROGRESSO

---

## Contexto e Propósito

O módulo de **Baixa de Pagamento** permite o registro manual de pagamentos realizados pelos alunos pela **área financeira**.

A área financeira é responsável por:
- Identificar pagamentos recebidos (transferências bancárias, PIX, boletos, dinheiro, etc.)
- Registrar o pagamento no sistema vinculando à fatura correspondente
- Confirmar o valor pago e a forma de pagamento
- Registrar pagamentos parciais quando necessário
- Manter histórico completo de todos os pagamentos

O objetivo é manter o controle financeiro atualizado, garantir a rastreabilidade de todos os pagamentos recebidos, e permitir que a área de cobrança tenha informações precisas sobre a situação financeira de cada aluno.

---

## 1. Objetivo

Descrever o processo de registro manual de pagamentos (baixa), incluindo diferentes formas de pagamento, pagamentos parciais, histórico de pagamentos e atualização automática do status das faturas.

---

## 2. Pré-requisitos

Este módulo depende dos seguintes escopos e funcionalidades já implementados:

| Módulo/Funcionalidade | Descrição | Dependência |
|----------------------|-----------|-------------|
| Cadastro de Alunos | Módulo de cadastro e manutenção de dados dos alunos | Obrigatório - Alunos devem estar cadastrados |
| Gestão de Matrículas | Módulo de gestão de planos e contratos dos alunos | Obrigatório - Matrículas devem conter informações de plano, valor, dia de vencimento |
| Cobrança de Faturas | Módulo de gestão de cobranças | Obrigatório - Para visualizar faturas pendentes e permitir reativação de alunos após pagamento |

---

## 3. Escopo

### Inclui

- Registro manual de pagamentos pela área financeira
- Suporte a diferentes formas de pagamento (Transferência bancária, PIX, Boleto, Dinheiro, Cheque, Cartão de crédito/débito)
- Registro de pagamentos parciais
- Criação de itens de fatura para desconto (valor negativo que reduz o total da fatura)
- Registro de pagamentos com desconto ou acréscimo (juros/multa)
- Atualização automática do status da fatura ao registrar pagamento
- Histórico completo de pagamentos
- Visualização de faturas pendentes de baixa
- Conciliação de pagamentos (identificar pagamento recebido e vincular à fatura)
- Observações e comprovantes anexados ao pagamento

### Exclui

- Integração automática com gateway de pagamento (não haverá cobrança automática)
- Processamento automático de pagamentos
- Envio de comprovantes de pagamento ao aluno (área financeira faz manualmente)
- Emissão de recibos ou notas fiscais (escopo de outro módulo)
- Estorno ou cancelamento de pagamentos (escopo de outro módulo)
- Gestão de planos e valores de mensalidade (escopo de outro módulo)
- Alteração de status do aluno (escopo do módulo de Cobrança de Faturas)

---

## 4. Atores Envolvidos

| Ator                   | Descrição                                     | Responsabilidades                                                                 |
| ---------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Sistema                | Plataforma                                    | Atualizar status de faturas, registrar histórico, validar dados                   |
| Área Financeira        | Equipe responsável pela gestão financeira     | Identificar pagamentos recebidos, registrar baixas, conciliar pagamentos          |
| Aluno                  | Cliente da escola                             | Realizar pagamentos                                                               |

---

## 5. Fluxos de Negócio

### FLX701 - Visualização de faturas pendentes de baixa

A área financeira acessa o módulo de baixa de pagamento:

1. Visualiza lista de faturas pendentes (não pagas)
2. Pode filtrar por:
   - Aluno
   - Data de vencimento
   - Valor
   - Status (pendente, vencida)
3. Para cada fatura, visualiza:
   - Nome do aluno
   - Valor da fatura
   - Data de vencimento
   - Dias de atraso (se vencida)
   - Status da fatura

### FLX702 - Registro de pagamento integral

A área financeira identifica um pagamento recebido e registra a baixa:

1. Acessa o módulo de baixa de pagamento
2. Busca a fatura correspondente (por aluno, valor ou data)
3. Seleciona a fatura
4. Registra o pagamento com:
   - **Data do pagamento** (data em que o pagamento foi recebido)
   - **Valor pago** (normalmente igual ao valor da fatura)
   - **Forma de pagamento** (Transferência bancária, PIX, Boleto, Dinheiro, Cheque, Cartão)
   - **Referência/Comprovante** (número do comprovante, NSU, código de transação, etc.)
   - **Observações** (opcional - informações adicionais)
5. Pode anexar comprovante de pagamento (opcional)
6. Confirma o registro
7. O sistema:
   - Marca a fatura como **Paga** (se dentro do vencimento) ou **Paga com atraso** (se após vencimento)
   - Registra o pagamento no histórico
   - Atualiza o saldo devedor do aluno
   - Exibe mensagem de confirmação

### FLX703 - Registro de pagamento parcial

Quando o aluno paga apenas parte do valor devido:

1. Área financeira acessa a fatura
2. Registra o pagamento parcial com:
   - Data do pagamento
   - **Valor pago** (menor que o valor da fatura)
   - Forma de pagamento
   - Referência/Comprovante
   - Observações
3. Confirma o registro
4. O sistema:
   - Mantém a fatura como **Parcialmente paga**
   - Atualiza o saldo restante da fatura (valor original - valor pago)
   - Registra o pagamento parcial no histórico
   - Permite que novo pagamento seja registrado para quitar o saldo restante

### FLX704 - Registro de pagamento com desconto

Quando houver desconto acordado com o aluno:

1. Área financeira acessa a fatura
2. **Cria um item de fatura de desconto** com:
   - **Descrição** (ex: "Desconto por pontualidade", "Desconto promocional", "Acordo de negociação")
   - **Valor do desconto** (valor negativo, ex: -R$ 50,00)
   - **Motivo/Tipo** (Desconto pontualidade, Desconto promocional, Acordo, etc.)
   - Data de aplicação
3. O sistema:
   - Adiciona o item de desconto à fatura
   - Recalcula o valor total da fatura (valor original + desconto)
   - Atualiza o valor líquido a pagar
4. Área financeira registra o pagamento pelo **valor líquido** com:
   - Data do pagamento
   - Valor pago (valor original - desconto)
   - Forma de pagamento
   - Referência/Comprovante
   - Observações
5. Confirma o registro
6. O sistema:
   - Marca a fatura como **Paga com desconto**
   - Registra o pagamento no histórico
   - Mantém o item de desconto visível na fatura para auditoria
   - Atualiza os relatórios financeiros

### FLX705 - Registro de pagamento com acréscimo (juros/multa)

Quando houver acréscimo por atraso:

1. Área financeira acessa a fatura vencida
2. Registra o pagamento com:
   - Data do pagamento
   - Valor pago (maior que o valor original)
   - Forma de pagamento
   - Referência/Comprovante
   - **Acréscimo aplicado** (juros, multa)
   - **Motivo do acréscimo** (atraso, taxa bancária, etc.)
   - Observações
3. Confirma o registro
4. O sistema:
   - Marca a fatura como **Paga com atraso**
   - Registra o acréscimo no histórico
   - Atualiza os relatórios financeiros

### FLX706 - Conciliação de pagamento

Quando a área financeira recebe um pagamento mas não sabe qual fatura:

1. Acessa o módulo de conciliação
2. Visualiza pagamentos recebidos (extrato bancário, PIX recebidos, etc.)
3. Busca faturas pendentes que correspondam ao valor recebido
4. Sistema sugere possíveis correspondências baseado em:
   - Valor
   - Aluno (se identificado no comprovante)
   - Data
5. Área financeira vincula o pagamento à fatura correta
6. Registra a baixa conforme FLX702

---

## 6. Regras de Negócio

| Código  | Regra                        | Condição                                                                                          | Ação Esperada                                                                   |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| BAI001  | Registro de pagamento | Área financeira registra pagamento | Atualizar status da fatura conforme valor pago e data |
| BAI002  | Pagamento integral | Valor pago = Valor da fatura | Marcar fatura como "Paga" ou "Paga com atraso" |
| BAI003  | Pagamento parcial | Valor pago < Valor líquido da fatura | Marcar fatura como "Parcialmente paga" e manter saldo restante |
| BAI004  | Criação de item de desconto | Área financeira aplica desconto | Criar item de fatura com valor negativo e recalcular valor líquido |
| BAI005  | Desconto obrigatório | Item de desconto criado | Descrição, valor (negativo), tipo e responsável são obrigatórios |
| BAI006  | Recálculo de valor líquido | Item de desconto adicionado | Recalcular: Valor líquido = Valor original + soma dos descontos |
| BAI007  | Pagamento com desconto | Fatura possui item de desconto E valor pago = valor líquido | Marcar como "Paga com desconto" |
| BAI008  | Pagamento com acréscimo | Valor pago > Valor líquido da fatura | Marcar como "Paga com atraso" e registrar acréscimo |
| BAI009  | Data obrigatória | Todo pagamento registrado | Data do pagamento é obrigatória |
| BAI010  | Forma de pagamento obrigatória | Todo pagamento registrado | Forma de pagamento é obrigatória |
| BAI011  | Histórico de pagamentos | Todo pagamento registrado | Registrar no histórico com data, valor, forma e responsável |
| BAI012  | Validação de valor | Valor pago informado | Valor deve ser maior que zero |
| BAI013  | Atualização de saldo | Pagamento parcial registrado | Atualizar saldo restante da fatura |
| BAI014  | Anexo de comprovante | Pagamento registrado | Permitir anexar arquivo de comprovante (opcional) |
| BAI015  | Referência do pagamento | Pagamento via transferência ou PIX | Recomendado informar número do comprovante/NSU |
| BAI016  | Conciliação bancária | Pagamento recebido não identificado | Permitir busca de faturas compatíveis para vincular |

---

## 7. Eventos e Reações do Sistema

| Código | Evento                           | Gatilho        | Reação do Sistema                                                           |
| ------ | -------------------------------- | -------------- | --------------------------------------------------------------------------- |
| EV7001 | Pagamento integral registrado | Área financeira registra pagamento completo (FLX702) | Marcar fatura como "Paga" ou "Paga com atraso", registrar histórico |
| EV7002 | Pagamento parcial registrado | Área financeira registra pagamento parcial (FLX703) | Marcar como "Parcialmente paga", atualizar saldo restante |
| EV7003 | Item de desconto criado | Área financeira cria item de desconto (FLX704) | Adicionar item à fatura, recalcular valor líquido |
| EV7004 | Pagamento com desconto registrado | Área financeira registra pagamento após criar desconto (FLX704) | Marcar como "Paga com desconto", registrar histórico |
| EV7005 | Pagamento com acréscimo registrado | Área financeira registra acréscimo (FLX705) | Marcar como "Paga com atraso", registrar acréscimo |
| EV7006 | Comprovante anexado | Área financeira anexa arquivo | Vincular arquivo ao pagamento |
| EV7007 | Saldo zerado | Último pagamento parcial quitou a fatura | Alterar status de "Parcialmente paga" para "Paga" |

---

## 8. Campos do Pagamento

| Campo                   | Obrigatório | Observações                                               |
| ----------------------- | ----------- | --------------------------------------------------------- |
| Fatura                  | Sim         | Fatura vinculada ao pagamento                             |
| Aluno                   | Sim         | Aluno que realizou o pagamento (herdado da fatura)        |
| Data do pagamento       | Sim         | Data em que o pagamento foi recebido                      |
| Valor pago              | Sim         | Valor efetivamente recebido (deve ser > 0)                |
| Forma de pagamento      | Sim         | Transferência bancária, PIX, Boleto, Dinheiro, Cheque, Cartão de crédito, Cartão de débito |
| Referência/Comprovante  | Não         | Número do comprovante, NSU, código de transação, etc. (recomendado) |
| Desconto aplicado       | Não         | Valor ou percentual de desconto (se houver)               |
| Motivo do desconto      | Não         | Justificativa do desconto (se houver)                     |
| Acréscimo aplicado      | Não         | Valor de juros/multa (se houver)                          |
| Motivo do acréscimo     | Não         | Justificativa do acréscimo (se houver)                    |
| Observações             | Não         | Texto livre para informações adicionais                   |
| Comprovante (arquivo)   | Não         | Anexo do comprovante de pagamento                         |
| Responsável pelo registro | Sim       | Usuário da área financeira que registrou o pagamento      |
| Data do registro        | Sim         | Data/hora em que o pagamento foi registrado no sistema    |

## 8.1 Campos da Fatura (após registro de pagamento)

| Campo                     | Observações                                           |
| ------------------------- | ----------------------------------------------------- |
| Status da fatura          | Paga, Paga com atraso, Paga com desconto, Parcialmente paga |
| Valor original            | Valor original da fatura (não muda)                   |
| Itens de desconto         | Lista de itens de desconto aplicados                  |
| Valor líquido             | Valor original + soma dos descontos (descontos são negativos) |
| Valor pago                | Soma de todos os pagamentos recebidos                 |
| Saldo restante            | Valor líquido - Valor pago (para pagamentos parciais) |
| Data do último pagamento  | Data do último pagamento recebido                     |

## 8.2 Campos do Item de Fatura de Desconto

| Campo                   | Obrigatório | Observações                                               |
| ----------------------- | ----------- | --------------------------------------------------------- |
| Fatura                  | Sim         | Fatura à qual o desconto está vinculado                   |
| Descrição               | Sim         | Descrição do desconto (ex: "Desconto por pontualidade")  |
| Valor                   | Sim         | Valor do desconto (sempre negativo, ex: -50.00)           |
| Tipo/Motivo             | Sim         | Pontualidade, Promoção, Acordo, Cortesia, etc.            |
| Data de aplicação       | Sim         | Data em que o desconto foi aplicado                       |
| Percentual              | Não         | Se o desconto foi baseado em percentual (ex: 10%)         |
| Observações             | Não         | Informações adicionais sobre o desconto                   |
| Responsável             | Sim         | Usuário que criou o item de desconto                      |

---

## 9. Mensagens do Sistema

| Código | Tipo    | Mensagem                                                                                  | Exibição |
| ------ | ------- | ----------------------------------------------------------------------------------------- | -------- |
| MSG701 | Sucesso | "Pagamento registrado com sucesso! Fatura [número] marcada como Paga." | Tela |
| MSG702 | Sucesso | "Pagamento parcial registrado. Saldo restante: R$ [valor]" | Tela |
| MSG703 | Sucesso | "Item de desconto criado com sucesso. Valor líquido da fatura: R$ [valor]" | Tela |
| MSG704 | Sucesso | "Pagamento com desconto registrado. Valor do desconto: R$ [valor]" | Tela |
| MSG705 | Erro | "O valor do desconto deve ser negativo." | Tela |
| MSG706 | Erro | "O valor pago deve ser maior que zero." | Tela |
| MSG707 | Erro | "Selecione ao menos uma fatura para registrar o pagamento." | Tela |
| MSG708 | Alerta | "Atenção: O valor pago (R$ [valor]) é diferente do valor líquido da fatura (R$ [valor]). Confirma?" | Tela |
| MSG709 | Info | "Comprovante anexado com sucesso." | Tela |
| MSG710 | Sucesso | "Fatura totalmente quitada! Status alterado de 'Parcialmente paga' para 'Paga'." | Tela |
| MSG711 | Info | "Histórico: [X] pagamentos registrados para esta fatura." | Tela |
| MSG712 | Alerta | "Esta fatura já está marcada como Paga. Deseja registrar um novo pagamento?" | Tela |

---

## 10. Considerações Adicionais

- O histórico completo de pagamentos deve ser mantido para auditoria e relatórios
- Cada pagamento registrado deve incluir o responsável (usuário que fez o registro)
- O sistema deve permitir consulta do histórico de pagamentos por:
  - Aluno
  - Período (data do pagamento)
  - Forma de pagamento
  - Responsável pelo registro
- Pagamentos parciais devem ser permitidos para facilitar acordos de parcelamento informal
- O sistema deve calcular automaticamente o saldo restante após pagamentos parciais
- **Itens de desconto**:
  - Descontos devem ser criados como itens separados na fatura, não como ajuste direto no pagamento
  - Cada item de desconto deve ter valor negativo e descrição clara
  - O valor líquido da fatura é recalculado automaticamente ao adicionar itens de desconto
  - Itens de desconto devem ser mantidos visíveis no histórico da fatura para auditoria
  - É possível adicionar múltiplos itens de desconto a uma mesma fatura (ex: desconto pontualidade + desconto promocional)
  - O sistema deve validar que valores de desconto sejam sempre negativos
- A área financeira deve ter acesso a dashboards de:
  - Pagamentos recebidos por período
  - Pagamentos por forma de pagamento
  - Descontos concedidos (total e por motivo)
  - Acréscimos cobrados (juros/multas)
  - Taxa de pagamentos no prazo vs. com atraso
  - Valor total recebido
- É importante distinguir entre:
  - **Data do pagamento**: quando o aluno pagou (data do comprovante)
  - **Data do registro**: quando foi registrado no sistema
- O anexo de comprovantes deve aceitar formatos comuns: PDF, JPG, PNG
- O sistema deve validar:
  - Valor pago deve ser maior que zero
  - Valor de desconto deve ser negativo
  - Valor pago não deve exceder significativamente o valor líquido da fatura (exceto em caso de acréscimos)
- A interface deve facilitar a conciliação bancária, permitindo busca por valor e data
- Recomenda-se sempre informar a referência/comprovante para rastreabilidade
- Ao visualizar uma fatura, deve ser possível ver claramente:
  - Valor original
  - Itens de desconto (se houver)
  - Valor líquido a pagar
  - Valor já pago
  - Saldo restante (se houver)
- O sistema não deve permitir alterar ou excluir pagamentos já registrados (apenas escopo de estorno/cancelamento futuro)
- Ao registrar pagamento, se o aluno estiver INATIVO ou BLOQUEADO, o sistema deve sugerir à área financeira que considere reativar o aluno (decisão manual via módulo de Cobrança)
- Relatórios de conciliação bancária devem ajudar a identificar pagamentos recebidos mas não baixados
