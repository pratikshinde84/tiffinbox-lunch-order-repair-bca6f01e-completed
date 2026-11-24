import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MenuList from '../components/MenuList.jsx';

const allDishes = [
  { id: 1, name: 'Paneer Butter Masala', price: 180, isVeg: true },
  { id: 2, name: 'Chicken Curry', price: 220, isVeg: false }
];
const vegDishes = [{ id: 1, name: 'Paneer Butter Masala', price: 180, isVeg: true }];

function mockFetch() {
  return vi.fn((url) => {
    const body = String(url).includes('veg=true') ? vegDishes : allDishes;
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(body)
    });
  });
}

describe('MenuList', () => {
  beforeEach(() => {
    global.fetch = mockFetch();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the full menu on first render', async () => {
    render(<MenuList selectedDishId={null} onSelectDish={() => {}} />);
    expect(await screen.findByText(/Chicken Curry/)).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith('/api/menu');
  });

  it('re-fetches with veg=true when the Veg only checkbox is ticked', async () => {
    render(<MenuList selectedDishId={null} onSelectDish={() => {}} />);
    await screen.findByText(/Chicken Curry/);

    const checkbox = screen.getByLabelText(/Veg only/i);
    checkbox.click();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/menu?veg=true');
    });

    await waitFor(() => {
      expect(screen.queryByText(/Chicken Curry/)).toBeNull();
    });
    expect(screen.getByText(/Paneer Butter Masala/)).toBeDefined();
  });
});
