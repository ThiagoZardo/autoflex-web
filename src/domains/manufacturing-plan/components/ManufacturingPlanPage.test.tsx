import { render, screen } from "@testing-library/react";
import ManufacturingPlanPage from "./ManufacturingPlanPage";

import * as manufacturingHook from "../hooks/useManufacturingPlan";

jest.mock("../hooks/useManufacturingPlan");

describe("ManufacturingPlanPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Manufacturing Plan title", () => {
    (manufacturingHook.useManufacturingPlan as jest.Mock).mockReturnValue({
      suggestions: [],
      loading: false,
    });

    render(<ManufacturingPlanPage />);
    expect(screen.getByText(/Manufacturing Plan/i)).toBeInTheDocument();
  });

  it("should display loading state", () => {
    (manufacturingHook.useManufacturingPlan as jest.Mock).mockReturnValue({
      suggestions: [],
      loading: true,
    });

    render(<ManufacturingPlanPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should show empty state message", () => {
    (manufacturingHook.useManufacturingPlan as jest.Mock).mockReturnValue({
      suggestions: [],
      loading: false,
    });

    render(<ManufacturingPlanPage />);
    expect(screen.getByText(/Nothing to produce/i)).toBeInTheDocument();
  });

  it("should render suggestions list", () => {
    (manufacturingHook.useManufacturingPlan as jest.Mock).mockReturnValue({
      suggestions: [
        {
          productId: 1,
          productName: "Product A",
          quantity: 50,
        },
      ],
      loading: false,
    });

    render(<ManufacturingPlanPage />);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});
