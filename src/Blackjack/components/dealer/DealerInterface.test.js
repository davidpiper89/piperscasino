import React from 'react';
import { render, screen } from '@testing-library/react';
import DealerInterface from './DealerInterface';

describe("DealerInterface", () => {
  // Mock functions to pass as props
  const setDealerCards = jest.fn();
  const setDeck = jest.fn();
  const setDealerTotal = jest.fn();
  const setDealerEnd = jest.fn();

  beforeEach(() => {
    render(
      <DealerInterface
        dealerCards={[{ suit: "hearts", value: "K", card: "KH" }]}
        dealerHidden={[{ suit: "clubs", value: "Q", card: "QC" }]}
        remainingDeck={[
          { suit: "diamonds", value: "8", card: "8D" },
          { suit: "spades", value: "5", card: "5S" },
        ]}
        setDealerCards={setDealerCards}
        setDeck={setDeck}
        dealerTotal={10}
        setDealerTotal={setDealerTotal}
        bet={true}
        playerEnd={true}
        dealerEnd={false}
        setDealerEnd={setDealerEnd}
        bust={[false, false, false, false]}
        split={0}
      />
    );
  });

  // Test to ensure that the component renders
  it("should render the component", () => {
    expect(screen.getByTestId("dealer-interface")).toBeInTheDocument();
  });

  
});
