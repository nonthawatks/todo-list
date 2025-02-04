import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Playground from "../../../src/components/playground/playground";
import { getUsers } from "@/apiServices";
import { UsersSearchDTO } from "@/apiServices/apiController/users/dto/users.dto";

const USER_DATA = {
  users: [
    {
      id: 1,
      firstName: "Emily",
      lastName: "Johnson",
      maidenName: "Smith",
      age: 28,
      gender: "female",
      email: "emily.johnson@x.dummyjson.com",
      phone: "+81 965-431-3024",
      username: "emilys",
      password: "emilyspass",
      birthDate: "1996-5-30",
      image: "https://dummyjson.com/icon/emilys/128",
      bloodGroup: "O-",
      height: 193.24,
      weight: 63.16,
      eyeColor: "Green",
      hair: {
        color: "Brown",
        type: "Curly",
      },
      ip: "42.48.100.32",
      address: {
        address: "626 Main Street",
        city: "Phoenix",
        state: "Mississippi",
        stateCode: "MS",
        postalCode: "29112",
        coordinates: {
          lat: -77.16213,
          lng: -92.084824,
        },
        country: "United States",
      },
      macAddress: "47:fa:41:18:ec:eb",
      university: "University of Wisconsin--Madison",
      bank: {
        cardExpire: "03/26",
        cardNumber: "9289760655481815",
        cardType: "Elo",
        currency: "CNY",
        iban: "YPUXISOBI7TTHPK2BR3HAIXL",
      },
      company: {
        department: "Engineering",
        name: "Dooley, Kozey and Cronin",
        title: "Sales Manager",
        address: {
          address: "263 Tenth Street",
          city: "San Francisco",
          state: "Wisconsin",
          stateCode: "WI",
          postalCode: "37657",
          coordinates: {
            lat: 71.814525,
            lng: -161.150263,
          },
          country: "United States",
        },
      },
      ein: "977-175",
      ssn: "900-590-289",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      crypto: {
        coin: "Bitcoin",
        wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        network: "Ethereum (ERC20)",
      },
      role: "admin",
    },
  ],
  limit: 100,
  skip: 0,
  total: 100,
};

jest.mock("@/apiServices", () => ({
  getUsers: jest.fn()
}));

describe("Playground", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly and call getUsers", () => {
    const { container } = render(<Playground />);
    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(container).toBeInTheDocument();
  });

  it("should group data correctly", async () => {
    const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>; // Type assertion

    mockGetUsers.mockImplementationOnce(
      (request: UsersSearchDTO) => Promise.resolve(USER_DATA) as Promise<ModelUsersResponse>
    );

    const { container } = render(<Playground />);

    await waitFor(() => {
      let loading = [];
      try {
        loading = screen.getAllByTestId("loading-users-data");
      } catch (error) {}
      expect(loading.length).toBe(0);
    });
    const resultData = {
      Engineering: {
        male: 0,
        female: 1,
        ageRange: "28-28",
        hair: {
          Brown: 1,
        },
        addressUser: {
          EmilyJohnson: "29112",
        },
      },
    };
    const groupedData = screen.getAllByTestId("json-users-data");
    expect(JSON.parse(groupedData[0].textContent || "{}")).toEqual(resultData);
    expect(container).toBeInTheDocument();
  });

  it("should group data correctly when users is empty", async () => {
    const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>; // Type assertion

    mockGetUsers.mockImplementationOnce(
      (request: UsersSearchDTO) => Promise.resolve({ users: [], limit: 10, skip: 0, total: 0 }) as Promise<ModelUsersResponse>
    );


    const { container } = render(<Playground />);

    await waitFor(() => {
      let loading = [];
      try {
        loading = screen.getAllByTestId("loading-users-data");
      } catch (error) {}
      expect(loading.length).toBe(0);
    });
    const resultData = {};
    const groupedData = screen.getAllByTestId("json-users-data");
    expect(JSON.parse(groupedData[0].textContent || "{}")).toEqual(resultData);
    expect(container).toBeInTheDocument();
  });
});
