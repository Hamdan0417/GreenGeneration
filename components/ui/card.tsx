import * as React from 'react';
import {cn} from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn('glass-card relative overflow-hidden p-8 shadow-soft', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export {Card};
