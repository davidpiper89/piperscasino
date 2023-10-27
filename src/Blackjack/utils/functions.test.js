import { beginGame } from "./beginGame";
import { RandomCardPicker } from "./RandomCardPicker";

describe("RandomCardPicker", () => {
  test("should pick a random card from the deck and remove it", () => {
    const mockDeck = [1, 2, 3, 4, 5];
    const result = RandomCardPicker(mockDeck);

    // Check that the card is indeed from the deck
    expect([1, 2, 3, 4, 5]).toContain(result.card);
    // Check that the deck now has one less card
    expect(result.array.length).toBe(4);
    // Check that the card picked is not in the deck anymore
    expect(result.array).not.toContain(result.card);
  });
});

describe("beginGame", () => {
  test("should begin the game with the right state", () => {
    const mockDeck = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const result = beginGame(mockDeck);

    // Check that the deck now has 4 less cards
    expect(result.currentDeck.length).toBe(6);
    // Check that the dealerCards, playerCards, and dealerHidden are all subsets of the initial deck
    expect(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]).toEqual(
      expect.arrayContaining([
        ...result.dealerCards,
        ...result.playerCards.flat(),
        ...result.dealerHidden,
      ])
    );
  });
});
