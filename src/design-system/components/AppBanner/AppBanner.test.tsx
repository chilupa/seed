import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppBanner } from './AppBanner';

describe('AppBanner', () => {
  it('exposes status role and content', () => {
    render(<AppBanner title="Synced" message="Your data is up to date." tone="success" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Synced')).toBeInTheDocument();
    expect(screen.getByText('Your data is up to date.')).toBeInTheDocument();
  });
});
