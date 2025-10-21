'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import {X} from 'lucide-react';
import type {HTMLAttributes} from 'react';
import {cn} from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({className, ...props}: DialogPrimitive.DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = ({className, children, ...props}: DialogPrimitive.DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'glass-card fixed inset-[5%] z-50 mx-auto flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-3xl p-8 shadow-glow focus:outline-none',
        className
      )}
      {...props}
    >
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full border border-ink/10 p-1 text-ink transition hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-teal dark:text-mist dark:hover:bg-mist/10">
        <X className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = ({className, ...props}: DialogPrimitive.DialogTitleProps) => (
  <DialogPrimitive.Title className={cn('text-lg font-semibold leading-none', className)} {...props} />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({className, ...props}: DialogPrimitive.DialogDescriptionProps) => (
  <DialogPrimitive.Description className={cn('text-sm text-ink/70 dark:text-mist/70', className)} {...props} />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
};
