'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import {cn} from '@/lib/utils';

const Slider = ({className, ...props}: SliderPrimitive.SliderProps) => (
  <SliderPrimitive.Root
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-ink/10 dark:bg-mist/20">
      <SliderPrimitive.Range className="absolute h-full bg-teal" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-mist bg-forest shadow-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2" />
  </SliderPrimitive.Root>
);
Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};
