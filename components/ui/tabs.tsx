'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import {cn} from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = ({className, ...props}: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink/5 p-2 dark:bg-mist/10',
      className
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({className, ...props}: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'flex-1 rounded-full px-5 py-2 text-sm font-medium text-ink transition focus-visible:ring-0 data-[state=active]:bg-mist data-[state=active]:text-forest data-[state=active]:shadow-glow dark:text-mist dark:data-[state=active]:bg-ink/80',
      className
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({className, ...props}: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content
    className={cn('mt-6 rounded-3xl border border-ink/10 p-6 dark:border-mist/10', className)}
    {...props}
  />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};
