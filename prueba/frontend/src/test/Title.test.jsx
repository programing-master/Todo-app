import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Title from '../components/Title.jsx'; 

describe('Title Component', () => {
  it('should render the correct title in the document head', async () => {
    render(<Title title="Mi Título" />);

    await waitFor(() => {
      expect(document.title).toBe("Mi Título");
    });
  });
});
