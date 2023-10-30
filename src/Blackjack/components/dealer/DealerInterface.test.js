import React from "react";
import { render, screen } from "@testing-library/react";
import DealerInterface from "./DealerInterface";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import { act } from "react-dom/test-utils";

jest.mock("../../utils/RandomCardPicker");
jest.useFakeTimers();

describe("DealerInterface", () => {
  // Mock functions to pass as props
  const setDealerCards = jest.fn();
  const setDeck = jest.fn();
  const setDealerTotal = jest.fn();
  const setDealerEnd = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  test("should set dealer end when the player has busted", () => {
    render(
      <DealerInterface
        dealerCards={[{ suit: "HEART", value: 2, image: "2H" }]}
        dealerHidden={[{ suit: "HEART", value: 10, image: "QC" }]}
        remainingDeck={[
          { value: 7, suit: "CLUB", image: "7C" },
          { value: 6, suit: "CLUB", image: "6C" },
        ]}
        setDealerCards={setDealerCards}
        setDeck={setDeck}
        dealerTotal={10}
        setDealerTotal={setDealerTotal}
        bet={true}
        playerEnd={true}
        dealerEnd={false}
        setDealerEnd={setDealerEnd}
        bust={[true, true, true, true]} // Player busted in all hands
        split={3}
        blackjack={[false, false, false, false]}
      />
    );

    // Assert that setDealerEnd has been called with true
    expect(setDealerEnd).toHaveBeenCalledWith(true);
  });

  test("should set dealer end when the player has blackjack in all hands and dealer does not have ACE or 10", () => {
    render(
      <DealerInterface
        dealerCards={[{ suit: "HEART", value: 9, image: "9H" }]}
        dealerHidden={[{ suit: "HEART", value: 10, image: "QC" }]}
        remainingDeck={[
          { value: 7, suit: "CLUB", image: "7C" },
          { value: 6, suit: "CLUB", image: "6C" },
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
        split={1}
        blackjack={[true, true, false, false]}
      />
    );
    expect(setDealerEnd).toHaveBeenCalledWith(true);
  });

  test("should not set dealer end when the dealer has an ACE or 10 as the visible card", () => {
    render(
      <DealerInterface
        dealerCards={[{ suit: "HEART", value: "ACE", image: "AH" }]}
        dealerHidden={[{ suit: "HEART", value: 10, image: "QC" }]}
        remainingDeck={[
          { value: 7, suit: "CLUB", image: "7C" },
          { value: 6, suit: "CLUB", image: "6C" },
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
        split={1}
        blackjack={[true, true, false, false]}
      />
    );
    expect(setDealerEnd).not.toHaveBeenCalled();
  });
  test("should show hidden card and set dealer end if player has all blackjacks", () => {
    act(() => {
      render(
        <DealerInterface
          dealerCards={[{ suit: "HEART", value: 10, image: "10H" }]}
          dealerHidden={[{ suit: "SPADES", value: 3, image: "3S" }]}
          remainingDeck={[
            { value: 7, suit: "CLUB", image: "7C" },
            { value: 6, suit: "CLUB", image: "6C" },
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
          split={1}
          blackjack={[true, true, false, false]}
        />
      );
    });

    expect(setDealerEnd).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(setDealerCards).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(setDealerEnd).toHaveBeenCalledWith(true);
  });
});

// Clean up and restore timers after the tests
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});
