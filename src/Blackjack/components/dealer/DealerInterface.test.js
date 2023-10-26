import React from "react";
import { render, screen } from "@testing-library/react";
import DealerInterface from "./DealerInterface";
import { RandomCardPicker } from "../../utils/RandomCardPicker";

jest.mock("../../utils/RandomCardPicker"); // Mocking the external utility

describe("DealerInterface", () => {
  // Mock functions to pass as props
  const setDealerCards = jest.fn();
  const setDeck = jest.fn();
  const setDealerTotal = jest.fn();
  const setDealerEnd = jest.fn();

  beforeAll(() => {
    // Mock the RandomCardPicker to always return a specific card
    RandomCardPicker.mockReturnValue({
      card: { suit: "diamonds", value: "8", card: "8D" },
      array: [],
    });
  });

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
        blackjack={[false]} 
      />
    );
  });

  // Test to ensure that the component renders
  test("should render the component", () => {
    const dealerInterface = screen.getByRole('region', { name: /dealer interface/i });
    expect(dealerInterface).toBeInTheDocument()
  });
});
