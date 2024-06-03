/// <reference types="cypress" />

import './commands'


describe('Transferência bancária', () => {
    beforeEach(() => {
      cy.login('usuario', 'senha')
    })
  
    it('Deve permitir transferência dentro do horário permitido e abaixo do limite para destinatário não cadastrado', () => {
      cy.clock(new Date(2023, 5, 1, 10, 0, 0).getTime()) // Esse clock defini o horário para 10:00
      cy.visit('/transferencia')
      
      cy.get('#valorTransferencia').type('1000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
      
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  
    it('Deve recusar transferência fora do horário permitido', () => {
      cy.clock(new Date(2023, 5, 1, 21, 0, 0).getTime()) // Esse clock defini o horário para 21:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('1000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-erro').should('contain', 'Transferências são permitidas apenas das 8h às 20h')
    })
  
    it('Deve recusar transferência acima do limite para destinatário não cadastrado', () => {
      cy.clock(new Date(2023, 5, 1, 15, 0, 0).getTime()) // Esse clock defini o horário para 15:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('3000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-erro').should('contain', 'O valor máximo para destinatários não cadastrados é R$2.000,00')
    })
  
    it('Deve permitir transferência dentro do horário permitido e abaixo do limite para destinatário cadastrado', () => {
      cy.clock(new Date(2023, 5, 1, 11, 0, 0).getTime()) // Esse clock defini o horário para 11:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('4000')
      cy.get('#destinatario').type('destinatarioCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  })