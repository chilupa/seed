import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../hooks/useAppBootstrap', () => ({
  useAppBootstrap: () => ({ ready: true }),
}));

describe('App', () => {
  it('renders without crashing', async () => {
    const { default: App } = await import('./App');
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
