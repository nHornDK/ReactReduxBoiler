import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import IconButton from '.';

describe('IconButton', () => {
	test('handles onClick', async () => {
		const mockOnClick = jest.fn();
		render(<IconButton onClick={mockOnClick}>Click me</IconButton>);
		fireEvent.click(screen.getByText('Click me'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
