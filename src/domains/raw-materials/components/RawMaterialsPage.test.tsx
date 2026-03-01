import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RawMaterialsPage from "./RawMaterialsPage";

import * as rawMaterialsHook from "../hooks/useRawMaterials";
import * as rawMaterialsService from "../services/rawMaterials.service";

jest.mock("../hooks/useRawMaterials");
jest.mock("../services/rawMaterials.service");

describe("RawMaterialsPage", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render Raw Materials title", () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: false,
    });

    render(<RawMaterialsPage />);
    expect(screen.getByText(/Raw Materials/i)).toBeInTheDocument();
  });

  it("should display loading state", () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: true,
    });

    render(<RawMaterialsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should render a list of materials", () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [{ id: 1, name: "Material X", stock: 20 }],
      loading: false,
    });

    render(<RawMaterialsPage />);
    expect(screen.getByText("Material X")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("should call createRawMaterial when submitting form", async () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [],
      loading: false,
    });

    const createMock = jest.spyOn(rawMaterialsService, "createRawMaterial").mockResolvedValue(undefined);
    jest.spyOn(window.location, "reload").mockImplementation(() => {});

    render(<RawMaterialsPage />);

    await userEvent.type(screen.getByPlaceholderText(/Material name/i), "New Material");
    await userEvent.type(screen.getByPlaceholderText(/Stock/i), "50");
    await userEvent.click(screen.getByRole("button", { name: /Criar/i }));

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledWith({ name: "New Material", stock: 50 });
    });
  });

  it("should call deleteRawMaterial when clicking delete", async () => {
    (rawMaterialsHook.useRawMaterials as jest.Mock).mockReturnValue({
      materials: [{ id: 1, name: "Material X", stock: 20 }],
      loading: false,
    });

    const deleteMock = jest.spyOn(rawMaterialsService, "deleteRawMaterial").mockResolvedValue(undefined);
    jest.spyOn(window.location, "reload").mockImplementation(() => {});

    render(<RawMaterialsPage />);
    await userEvent.click(screen.getByRole("button", { name: /Excluir/i }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(1);
    });
  });
});
