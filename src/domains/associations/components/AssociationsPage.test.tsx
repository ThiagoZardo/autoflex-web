import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AssociationsPage from "./AssociationsPage";

import * as associationsHook from "../hooks/useAssociations";
import * as associationsService from "../services/associations.service";

jest.mock("../hooks/useAssociations");
jest.mock("../services/associations.service");

describe("AssociationsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Associations title", () => {
    (associationsHook.useAssociations as jest.Mock).mockReturnValue({
      associations: [],
      loading: false,
      remove: jest.fn(),
    });

    render(<AssociationsPage />);
    expect(screen.getByText(/Associations/i)).toBeInTheDocument();
  });

  it("should display loading state", () => {
    (associationsHook.useAssociations as jest.Mock).mockReturnValue({
      associations: [],
      loading: true,
      remove: jest.fn(),
    });

    render(<AssociationsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should show empty state message", () => {
    (associationsHook.useAssociations as jest.Mock).mockReturnValue({
      associations: [],
      loading: false,
      remove: jest.fn(),
    });

    render(<AssociationsPage />);
    expect(screen.getByText(/No associations found/i)).toBeInTheDocument();
  });

  it("should render associations list", () => {
    (associationsHook.useAssociations as jest.Mock).mockReturnValue({
      associations: [
        {
          id: 1,
          productName: "Product A",
          rawMaterialName: "Steel",
          quantity: 10,
        },
      ],
      loading: false,
      remove: jest.fn(),
    });

    render(<AssociationsPage />);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Steel")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should call deleteAssociation when clicking delete", async () => {
    (associationsHook.useAssociations as jest.Mock).mockReturnValue({
      associations: [
        {
          id: 1,
          productName: "Product A",
          rawMaterialName: "Steel",
          quantity: 10,
        },
      ],
      loading: false,
      remove: jest.fn(),
    });

    const deleteMock = jest.spyOn(associationsService, "deleteAssociation").mockResolvedValue(undefined);

    render(<AssociationsPage />);

    fireEvent.click(screen.getByText(/Excluir/i));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(1);
    });
  });
});
