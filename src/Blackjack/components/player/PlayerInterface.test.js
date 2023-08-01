import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerInterface from './PlayerInterface';


// PlayerInterface component test
describe('PlayerInterface Component', () => {
  test('renders PlayerInterface component', () => {
    const playerInterfaceProps = {
      playerCards: [],
      remainingDeck: [],
      setPlayerCards: jest.fn(),
      setDeck: jest.fn(),
      split: 0,
      setSplit: jest.fn(),
      chips: 100,
      setChips: jest.fn(),
      stake: [0, 0, 0, 0],
      setStake: jest.fn(),
      total: [0, 0, 0, 0],
      setTotal: jest.fn(),
      blackjack: [false, false, false, false],
      setBlackjack: jest.fn(),
      bust: [false, false, false, false],
      setBust: jest.fn(),
      bet: false,
      setBet: jest.fn(),
      playerEnd: false,
      setPlayerEnd: jest.fn(),
      stand: [false, false, false, false],
      setStand: jest.fn(),
      double: [false, false, false, false],
      setDouble: jest.fn(),
    };
  
    render(<PlayerInterface {...playerInterfaceProps} />);
    
    expect(screen.getByText("Chips: 100")).toBeInTheDocument();
  });
});
