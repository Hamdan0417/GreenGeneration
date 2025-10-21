import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Timeline} from '@/components/sections/timeline';

describe('Timeline', () => {
  it('renders steps and responds to keyboard navigation', () => {
    render(
      <Timeline
        heading="Milestones"
        steps={[
          {idx: '1', date: 'Jan', title: 'Start', text: 'Company founded'},
          {idx: '2', date: 'Mar', title: 'Launch', text: 'Store launched'}
        ]}
      />
    );
    const startTab = screen.getByRole('tab', {name: /Start/});
    expect(startTab).toBeInTheDocument();
    fireEvent.keyDown(startTab, {key: 'ArrowRight'});
    const panel = screen.getByRole('tabpanel', {hidden: false});
    expect(panel).toHaveTextContent('Store launched');
  });
});
