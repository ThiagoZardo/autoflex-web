import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RawMaterialsPage from "./RawMaterialsPage";
import * as rawMaterialsHook from "../hooks/useRawMaterials";
import * as rawMaterialsService from "../services/rawMaterials.service";

jest.mock("../hooks/useRawMaterials");
jest.mock("../services/rawMaterials.service");

describe("RawMaterialsPage", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders Raw Materials title", () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: false,
    });

    render(<RawMaterialsPage />);
    expect(screen.getByRole("heading", { name: /Raw Materials/i })).toBeInTheDocument();
  });

  it("renders loading state", () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: true,
    });

    render(<RawMaterialsPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calls createRawMaterial when submitting form", async () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: false,
    });

    const createMock = jest.spyOn(rawMaterialsService, "createRawMaterial").mockResolvedValue(undefined);

    render(<RawMaterialsPage />);
    await userEvent.type(screen.getByPlaceholderText(/Material name/i), "New Material");
    await userEvent.type(screen.getByPlaceholderText(/Stock/i), "50");
    await userEvent.click(screen.getByRole("button", { name: /Criar/i }));

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledWith({ name: "New Material", stock: 50 });
    });
  });

  it("calls deleteRawMaterial when clicking delete", async () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [{ id: 1, name: "Material X", stock: 20 }],
      loading: false,
    });

    const deleteMock = jest.spyOn(rawMaterialsService, "deleteRawMaterial").mockResolvedValue(undefined);

    render(<RawMaterialsPage />);
    await userEvent.click(screen.getByRole("button", { name: /Excluir/i }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(1);
    });
  });
});
