'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({className, ...props}: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item className={cn('border-b border-ink/10 py-2 dark:border-mist/10', className)} {...props} />
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = ({className, children, ...props}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Trigger
    className={cn(
      'flex w-full items-center justify-between gap-4 py-3 text-start text-base font-medium text-ink transition hover:text-teal focus-visible:ring-2 focus-visible:ring-teal dark:text-mist',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" aria-hidden="true" />
  </AccordionPrimitive.Trigger>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({className, ...props}: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      'pb-4 text-sm text-ink/80 data-[state=open]:animate-in data-[state=open]:fade-in dark:text-mist/80',
      className
    )}
    {...props}
  />
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent};
