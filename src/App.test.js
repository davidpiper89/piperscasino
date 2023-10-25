import React from "react";
import { render, act, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DEFAULT_CHIPS, DEFAULT_RESULTS } from "./config/config";
import defaultProfile from "./assets/DefaultProfile.svg";
import { ROUTE_PATHS } from "./App";
import { useNavigate } from "react-router-dom";
import App from "./App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocking the global localStorage object
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

describe("App Component Tests NOT LOGGED IN", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage = mockLocalStorage;
    mockLocalStorage.clear();

    useNavigate.mockImplementation(() => mockNavigate);
  });

  test("it renders without crashing [UNIT TEST]", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  test("the ROUTE_PATHS constants contain the correct paths [UNIT TEST]", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(ROUTE_PATHS.HOME).toBe("/");
    expect(ROUTE_PATHS.BLACKJACK).toBe("/BLACKJACK");
    expect(ROUTE_PATHS.PROFILE).toBe("/PROFILE");
    expect(ROUTE_PATHS.STORE).toBe("/STORE");
  });

  test("it initializes default values in local storage [INTEGRATION TEST]", () => {
    act(() => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    const storedUsername = JSON.parse(localStorage.getItem("username"));
    expect(storedUsername).toBe("");

    const storedChips = JSON.parse(localStorage.getItem("chips"));
    expect(storedChips).toBe(DEFAULT_CHIPS);

    const storedAvatar = JSON.parse(localStorage.getItem("avatar"));
    expect(storedAvatar).toBe(defaultProfile);

    const storedWins = JSON.parse(localStorage.getItem("wins"));
    expect(storedWins).toBe(DEFAULT_RESULTS);

    const storedLoses = JSON.parse(localStorage.getItem("loses"));
    expect(storedLoses).toBe(DEFAULT_RESULTS);

    const storedDraws = JSON.parse(localStorage.getItem("draws"));
    expect(storedDraws).toBe(DEFAULT_RESULTS);

    const storedUserAvatars = JSON.parse(localStorage.getItem("avatars"));
    expect(storedUserAvatars).toStrictEqual([]);

    const storedLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    expect(storedLoggedIn).toBe(false);
  });

  test("it loads the HomeNotLoggedInComponent [INTEGRATION TEST]", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const loginTitle = screen.getByRole("heading", { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });

  test("rendering the app component redirects to the HomeNotLoggedIn page if not logged in [INTEGRATION TEST]", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
    const loginTitle = screen.getByRole("heading", { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  }); 
});
