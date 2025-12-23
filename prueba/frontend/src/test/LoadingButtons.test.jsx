import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoadingButtons from '../components/LoadingButtons';

describe('LoadingButtons Component', () => {
  it('should render button with correct icon and alt text', () => {
    const props = { icon: 'loading', alt: 'Loading' };
    const taskValue = 'Some task';
    const onClickAction = vi.fn();

    render(<LoadingButtons props={props} taskValue={taskValue} onClickAction={onClickAction} type="button" />);

    expect(screen.getByRole('button')).toBeInTheDocument();

    const img = screen.getByAltText(props.alt);
    expect(img).toHaveAttribute('src', '/assets/icons/loading.svg');
  });

  it('should call onClickAction when button is clicked', () => {
    const props = { icon: 'loading', alt: 'Loading' };
    const taskValue = 'Some task';
    const onClickAction = vi.fn();

    render(<LoadingButtons props={props} taskValue={taskValue} onClickAction={onClickAction} type="button" />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickAction).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when taskValue is empty', () => {
    const props = { icon: 'loading', alt: 'Loading' };
    const taskValue = ''; 
    const onClickAction = vi.fn();

    render(<LoadingButtons props={props} taskValue={taskValue} onClickAction={onClickAction} type="button" />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be enabled when taskValue is provided', () => {
    const props = { icon: 'loading', alt: 'Loading' };
    const taskValue = 'Some task'; 
    const onClickAction = vi.fn();

    render(<LoadingButtons props={props} taskValue={taskValue} onClickAction={onClickAction} type="button" />);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
