import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsPage from "./ProductsPage";

import * as productsHook from "../hooks/useProducts";
import * as productService from "../services/products.service";

jest.mock("../hooks/useProducts");
jest.mock("../services/products.service");

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Products title", () => {
    (productsHook.useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
    });

    render(<ProductsPage />);
    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
  });

  it("should display loading state when loading is true", () => {
    (productsHook.useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: true,
    });

    render(<ProductsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should render a list of products", () => {
    (productsHook.useProducts as jest.Mock).mockReturnValue({
      products: [{ id: 1, name: "Test Product", value: 100 }],
      loading: false,
    });

    render(<ProductsPage />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
  });

  it("should call createProduct when submitting the form", async () => {
    (productsHook.useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
    });

    const createMock = jest.spyOn(productService, "createProduct").mockResolvedValue(undefined);

    render(<ProductsPage />);

    await userEvent.type(screen.getByPlaceholderText(/Product name/i), "New Product");

    await userEvent.type(screen.getByPlaceholderText(/Value/i), "50");

    await userEvent.click(screen.getByRole("button", { name: /Criar/i }));

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledWith({
        name: "New Product",
        value: 50,
      });
    });
  });

  it("should call deleteProduct when clicking delete", async () => {
    (productsHook.useProducts as jest.Mock).mockReturnValue({
      products: [{ id: 1, name: "Test Product", value: 100 }],
      loading: false,
    });

    const deleteMock = jest.spyOn(productService, "deleteProduct").mockResolvedValue(undefined);

    render(<ProductsPage />);

    await userEvent.click(screen.getByRole("button", { name: /Excluir/i }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(1);
    });
  });
});
