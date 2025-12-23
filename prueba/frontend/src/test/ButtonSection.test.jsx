// src/components/ButtonSection.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest"; 
import ButtonSection from "../components/ButtonSection";
import { useFeatures } from "../hooks/useFeatures";

// Mock del hook useFeatures
vi.mock("../hooks/useFeatures", () => ({
  useFeatures: vi.fn(),
}));

describe("ButtonSection Component", () => {
  const setOpenMock = vi.fn();

  beforeEach(() => {
    useFeatures.mockReturnValue({ setOpen: setOpenMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Cancel button when args.id is not present", () => {
    render(<ButtonSection args={{}} taskValue="" />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument(); 

    fireEvent.click(cancelButton);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it("does not render the Cancel button when args.id is present", () => {
    render(<ButtonSection args={{ id: "123" }} taskValue="" />);

    const cancelButton = screen.queryByRole("button", { name: /cancel/i });
    expect(cancelButton).not.toBeInTheDocument(); 
  });

  it("renders 'Ok' when taskValue is empty and args.id is not present", () => {
    render(<ButtonSection args={{}} taskValue="" />);

    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeInTheDocument(); 
  });

  it("renders 'Add' when taskValue is not empty and args.id is not present", () => {
    render(<ButtonSection args={{}} taskValue="some value" />);

    const submitButton = screen.getByRole("button", { name: /add/i });
    expect(submitButton).toBeInTheDocument(); 
  });

  it("renders 'x' when taskValue is not empty and args.id is present", () => {
    render(<ButtonSection args={{ id: "123" }} taskValue="some value" />);

    const submitButton = screen.getByText("x");
    expect(submitButton).toBeInTheDocument(); 
  });
});
