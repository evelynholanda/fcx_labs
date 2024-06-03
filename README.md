Projeto criado para realização dos cenários do Teste Técnico para vaga como QA no
Fcx_Labs

Tech Lead - Roberta Andrade

Candidada - Ana Evelyn


************************************************************************************
1- Criação do projeto Inicial
2- Criação do .gitigone - Arquivos que não são necessários subir para o github
3- Criação do arquivo commands.js para não expor os dados sensíveis
4- Criação do README para explicar a estrutura e criação do projeto
6- Criação do arquivo de cenarios principais e cenários alternativos

Estrutura básica do projeto

cypress/
  ├── e2e/
  │   ├── transferencia_spec.cy.js
      ├── cenarios_alternativos.js
  ├── fixtures/
  ├── support/
  │   ├── commands.js
  │   └── e2e.js
cypress.config.js
package.json



Obs: Evidências dos Testes estão descritas abaixo com as fotos e Relatório dos Testes

Respostas das questões:
Case:


Regra de negócio: Eu sendo um banco, e permitindo que o usuário do banco realize apenas transferências das 8 às 20hs, com um valor máximo de 2mil reais para destinatários não cadastrados e de 5mil reais para destinatários cadastrados.


Atividades: Quais as abordagens e técnicas que você utilizaria para validar essa regra de negócio e, quais cenários de testes você levantaria, escreva casos de testes em Gherkin.
Automatize um dos casos de testes levantados na linguagem de programação que você mais tiver familiaridade.



Respostas:

Regra de Negócio:
Transferências permitidas apenas das 8h às 20h.
Valor máximo de R$ 2.000,00 para destinatários não cadastrados.
Valor máximo de R$ 5.000,00 para destinatários cadastrados.






Estratégia dos testes
Teste de Requisitos:
Verificar se a regra de negócio foi corretamente implementada conforme especificado e documentação
Validar todos os casos limites e exceções.
Teste de Interface do Usuário (UI):
Verificar se a UI permite realizar transferências apenas no horário permitido.
Verificar mensagens de erro e alertas quando transferências fora do horário ou acima do limite são tentadas.
Teste de API:
Verificar se as APIs de transferência respeitam as regras de negócio.
Utilizar ferramentas como Postman para simular requisições dentro e fora do horário permitido e com valores acima e abaixo do limite.
Teste de Segurança:
Assegurar que não há maneira de burlar os limites de transferência via métodos maliciosos.

Técnicas
Teste sob a abordagem da técnica Análise do Valor  Limite:
Validar as transferências exatamente no valor limite (R$ 2.000,00 e R$ 5.000,00).
Validar as transferências com valores um centavo acima e abaixo do limite, ou seja R$ 2.000,01 e R$ 1999,99
Teste sob a abordagem de Partição de Equivalência:
Dividir os valores de transferência em classes válidas e inválidas.
Válidas: R$ 2.000,00 e R$ 5.000,00
Inválidas: R$ 2.000,01 e R$ 1999,99
Teste de Cenário de Tempo:
Validar transferências realizadas exatamente às 8h e 20h.
Validar transferências tentadas antes das 8h e após as 20h.




CENÁRIOS PRINCIPAIS E ALTERNATIVOS

Cenários de Teste em Gherkin
Cenário 1: Transferência Dentro do Horário Permitido e Abaixo do Limite para Destinatário Não Cadastrado
Feature: Transferência bancária
  Cenario: Transferência dentro do horário permitido e abaixo do limite para destinatário não cadastrado
    Given que o usuário está logado no sistema
    And o horário atual é 10:00 horas
    When o usuário tentar transferir R$1.000,00 para um destinatário não cadastrado
    Then a transferência deve ser bem-sucedida


Cenário 2: Transferência Fora do Horário Permitido
Feature: Transferência bancária
  Cenario: Transferência fora do horário permitido
    Given que o usuário está logado no sistema
    And o horário atual é 21:00
    When o usuário tentar transferir qualquer valor
    Then a transferência não deve ser bem-sucedida
    And uma mensagem de erro deve ser exibida "Transferências são permitidas apenas no período das 8h às 20h"


Cenário 3: Transferência Acima do Limite para Destinatário Não Cadastrado
Feature: Transferência bancária
  Scenario: Transferência acima do limite para destinatário não cadastrado
    Given que o usuário está logado no sistema
    And o horário atual é 15:00
    When o usuário tentar transferir R$3.000,00 para um destinatário não cadastrado
    Then a transferência não deve ser bem-sucedida
    And uma mensagem de erro deve ser exibida "O valor máximo para destinatários não cadastrados é R$2.000,00"


Cenário 4: Transferência Dentro do Horário Permitido e Abaixo do Limite para Destinatário Cadastrado
Feature: Transferência bancária
  Scenario: Transferência dentro do horário permitido e abaixo do limite para destinatário cadastrado
    Given que o usuário está logado no sistema
    And o horário atual é 11:00
    And o destinatário está cadastrado
    When o usuário tentar transferir R$4.000,00 para o destinatário cadastrado
    Then a transferência deve ser bem-sucedida




Cenários Alternativos e Possíveis Problemas:

Além dos cenários principais descritos anteriormente, é importante considerar situações que podem não estar claramente especificadas na documentação, mas que podem ocorrer em um ambiente real. Aqui estão alguns cenários adicionais que devemos considerar pois geralmente são esses cenários que não foram mapeados no refinamento ou pelo desenvolvedor na hora de implementar os testes.

Cenário 5: Transferência Exatamente no Limite para Destinatário Não Cadastrado
Feature: Transferência bancária
  Scenario: Transferência exatamente no limite para destinatário não cadastrado
    Given que o usuário está logado no sistema
    And o horário atual é 14:00
    When o usuário tenta transferir R$2.000,00 para um destinatário não cadastrado
    Then a transferência deve ser bem-sucedida

Cenário 6: Transferência Exatamente no Limite para Destinatário Cadastrado
Feature: Transferência bancária
  Scenario: Transferência exatamente no limite para destinatário cadastrado
    Given que o usuário está logado no sistema
    And o horário atual é 16:00
    And o destinatário está cadastrado
    When o usuário tenta transferir R$5.000,00 para o destinatário cadastrado
    Then a transferência deve ser bem-sucedida

Cenário 7: Transferência Imediatamente Após o Início do Horário Permitido
Feature: Transferência bancária
  Scenario: Transferência imediatamente após o início do horário permitido
    Given que o usuário está logado no sistema
    And o horário atual é 08:00
    When o usuário tenta transferir R$1.000,00 para um destinatário não cadastrado
    Then a transferência deve ser bem-sucedida


Cenário 8: Transferência Imediatamente Antes do Fim do Horário Permitido
Feature: Transferência bancária
  Scenario: Transferência imediatamente antes do fim do horário permitido
    Given que o usuário está logado no sistema
    And o horário atual é 19:59
    When o usuário tenta transferir R$1.000,00 para um destinatário não cadastrado
    Then a transferência deve ser bem-sucedida


Cenário 9: Transferência com Valor Negativo
Feature: Transferência bancária
  Scenario: Transferência com valor negativo
    Given que o usuário está logado no sistema
    And o horário atual é 10:00
    When o usuário tenta transferir -R$1.000,00 para um destinatário não cadastrado
    Then a transferência deve ser recusada
    And uma mensagem de erro deve ser exibida "Valor de transferência inválido"


Cenário 10: Transferência com Valor Zero
Feature: Transferência bancária
  Scenario: Transferência com valor zero
    Given que o usuário está logado no sistema
    And o horário atual é 10:00
    When o usuário tenta transferir R$0,00 para um destinatário não cadastrado
    Then a transferência deve ser recusada
    And uma mensagem de erro deve ser exibida "Valor de transferência inválido"


Cenário 11: Transferência Sem Informar o Destinatário
Feature: Transferência bancária
  Scenario: Transferência sem informar o destinatário
    Given que o usuário está logado no sistema
    And o horário atual é 10:00
    When o usuário tenta transferir R$1.000,00 sem informar o destinatário
    Then a transferência deve ser recusada
    And uma mensagem de erro deve ser exibida "Destinatário não informado"


Esses cenários alternativos e os testes correspondentes em Cypress garantem que a aplicação lida corretamente com uma ampla gama de condições, incluindo casos extremos e potenciais erros de entrada do usuário. Isso ajuda a assegurar a robustez e a confiabilidade do sistema conforme a regra de negócio especificada.
