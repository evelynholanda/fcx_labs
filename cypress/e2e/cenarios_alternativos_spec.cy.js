/// <reference types="cypress" />

import './commands'

describe('Transferência bancária', () => {
    it('Deve permitir transferência exatamente no limite para destinatário não cadastrado', () => {
      cy.clock(new Date(2023, 5, 1, 14, 0, 0).getTime()) // Esse clock defini o horário para 14:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('2000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  

  
    it('Deve permitir transferência exatamente no limite para destinatário cadastrado', () => {
      cy.clock(new Date(2023, 5, 1, 16, 0, 0).getTime()) // Esse clock defini o horário para 16:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('5000')
      cy.get('#destinatario').type('destinatarioCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  

  
    it('Deve permitir transferência imediatamente após o início do horário permitido', () => {
      cy.clock(new Date(2023, 5, 1, 8, 0, 0).getTime()) // Esse clock defini o horário para 08:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('1000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  


    it('Deve permitir transferência imediatamente antes do fim do horário permitido', () => {
      cy.clock(new Date(2023, 5, 1, 19, 59, 0).getTime()) // Esse clock defini o horário para 19:59
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('1000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-sucesso').should('contain', 'Transferência realizada com sucesso')
    })
  

 
    it('Deve recusar transferência com valor negativo', () => {
      cy.clock(new Date(2023, 5, 1, 10, 0, 0).getTime()) // Esse clock defini o horário para 10:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('-1000')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-erro').should('contain', 'Valor de transferência inválido')
    })
  

    it('Deve recusar transferência com valor zero', () => {
      cy.clock(new Date(2023, 5, 1, 10, 0, 0).getTime()) // Esse clock defini o horário para 10:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('0')
      cy.get('#destinatario').type('destinatarioNaoCadastrado')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-erro').should('contain', 'Valor de transferência inválido')
    })
  

    it('Deve recusar transferência sem informar o destinatário', () => {
      cy.clock(new Date(2023, 5, 1, 10, 0, 0).getTime()) // Esse clock defini o horário para 10:00
      cy.visit('/transferencia')
  
      cy.get('#valorTransferencia').type('1000')
      cy.get('#botaoTransferir').click()
  
      cy.get('.mensagem-erro').should('contain', 'Destinatário não informado')
    })
  


  })