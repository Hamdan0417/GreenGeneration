import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {KPICards} from '@/components/sections/kpi-cards';

declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
  }
}

class MockIntersectionObserver {
  constructor(public callback: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

describe('KPICards', () => {
  beforeAll(() => {
    // @ts-expect-error assigning mock
    global.IntersectionObserver = MockIntersectionObserver;
  });

  it('renders KPI labels and values', () => {
    render(
      <KPICards
        items={[
          {value: '46%', label: 'Gross profit margin'},
          {value: '36+', label: 'Cities reached'}
        ]}
        title="Momentum"
        subtitle="Latest performance"
      />
    );
    expect(screen.getByText('Momentum')).toBeInTheDocument();
    expect(screen.getByText('Gross profit margin')).toBeInTheDocument();
    expect(screen.getByText('Cities reached')).toBeInTheDocument();
  });
});
