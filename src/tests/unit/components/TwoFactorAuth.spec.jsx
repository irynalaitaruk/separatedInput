import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TwoFactorAuth from '../../../components/two-factor-auth/TwoFactorAuth';

describe("TwoFactorAuth Component", () => {
  const onCompleteMock = vi.fn();
  const segments = 6;

  it("renders the correct number of input elements", () => {
    render(<TwoFactorAuth onComplete={onCompleteMock} segments={segments} />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(segments);
  });

  it("sets maxLength of each input to 1", () => {
    render(<TwoFactorAuth onComplete={onCompleteMock} segments={segments} />);

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("maxLength", "1");
    });
  });

  it("moves focus to the next input after entering a value", async () => {
    render(<TwoFactorAuth onComplete={onCompleteMock} segments={segments} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    
    await waitFor(() => {
      expect(document.activeElement).toBe(inputs[1]);
    });
  });
  
});
