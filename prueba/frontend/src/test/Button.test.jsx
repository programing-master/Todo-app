// src/components/Button.test.jsx
import { render, screen } from "@testing-library/react";
import Button from "../components/Button"; 

describe("Button Component", () => {
  const props = {
    icon: "example-icon",
    title: "Click Me",
    alt: "Example Icon",
  };

  it("renders correctly with props", () => {
    render(<Button props={props} taskValue="some value" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument(); 
    expect(button).toHaveTextContent("Click Me"); 
    expect(button).not.toBeDisabled(); 
  });

  it("is disabled when taskValue is empty", () => {
    render(<Button props={props} taskValue="" />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled(); 
  });

  it("renders the correct icon", () => {
    render(<Button props={props} taskValue="some value" />);

    const img = screen.getByAltText("Example Icon");
    expect(img).toHaveAttribute("src", "/assets/icons/example-icon.svg");
  });
});
