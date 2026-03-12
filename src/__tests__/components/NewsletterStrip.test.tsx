import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterStrip } from '@/components/sections/NewsletterStrip';

describe('NewsletterStrip', () => {
  it('renders the newsletter form', () => {
    render(<NewsletterStrip />);

    expect(screen.getByText('Stay connected to the movement.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Zip code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    await user.click(submitButton);

    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    await user.type(screen.getByPlaceholderText('First name'), 'John');
    await user.type(screen.getByPlaceholderText('Last name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email address'), 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    await user.click(submitButton);

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    // Submit empty form to trigger errors
    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    await user.click(submitButton);

    // Verify error appears
    expect(screen.getByText('First name is required')).toBeInTheDocument();

    // Start typing to clear error
    await user.type(screen.getByPlaceholderText('First name'), 'J');

    // Error should be cleared
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    await user.type(screen.getByPlaceholderText('First name'), 'John');
    await user.type(screen.getByPlaceholderText('Last name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email address'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Zip code'), '12345');

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    await user.click(submitButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/subscribing/i);
    });

    // Should show success
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/subscribed/i);
    }, { timeout: 2000 });
  });

  it('toggles substack checkbox', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('has accessible form fields', () => {
    render(<NewsletterStrip />);

    // All inputs should be accessible
    const firstNameInput = screen.getByPlaceholderText('First name');
    const emailInput = screen.getByPlaceholderText('Email address');

    // Check ARIA attributes are set correctly initially
    expect(firstNameInput).not.toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-invalid when field has error', async () => {
    const user = userEvent.setup();
    render(<NewsletterStrip />);

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    await user.click(submitButton);

    const firstNameInput = screen.getByPlaceholderText('First name');
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
  });
});
