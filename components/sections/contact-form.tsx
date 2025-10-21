'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import type {ReactNode} from 'react';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/toast';
import {sendContactEmail} from '@/lib/email';

const schema = z.object({
  name: z.string().min(2, 'name'),
  company: z.string().min(2, 'company'),
  email: z.string().email('email'),
  phone: z
    .string()
    .regex(/^[0-9+\-\s]{6,}$/u, 'phone'),
  message: z.string().min(10, 'message')
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations('form');
  const {notify} = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<FormValues>({
    resolver: zodResolver(schema.refine((values) => values)),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await sendContactEmail(data);
      notify({title: t('success'), variant: 'success'});
      reset();
    } catch (error) {
      console.error(error);
      notify({title: t('error'), variant: 'error'});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 p-8" aria-label={t('submit')}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} error={errors.name?.message && t(`validation.${errors.name.message}`)}>
          <input
            id="name"
            {...register('name')}
            placeholder={t('name')}
            className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus-visible:ring-2 focus-visible:ring-teal dark:border-mist/10 dark:bg-ink/60 dark:text-mist"
            required
          />
        </Field>
        <Field label={t('company')} error={errors.company?.message && t(`validation.${errors.company.message}`)}>
          <input
            id="company"
            {...register('company')}
            placeholder={t('company')}
            className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus-visible:ring-2 focus-visible:ring-teal dark:border-mist/10 dark:bg-ink/60 dark:text-mist"
            required
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('email')} error={errors.email?.message && t(`validation.${errors.email.message}`)}>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus-visible:ring-2 focus-visible:ring-teal dark:border-mist/10 dark:bg-ink/60 dark:text-mist"
            required
          />
        </Field>
        <Field label={t('phone')} error={errors.phone?.message && t(`validation.${errors.phone.message}`)}>
          <input
            id="phone"
            {...register('phone')}
            placeholder="+966 5X XXX XXXX"
            className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus-visible:ring-2 focus-visible:ring-teal dark:border-mist/10 dark:bg-ink/60 dark:text-mist"
            required
          />
        </Field>
      </div>
      <Field label={t('message')} error={errors.message?.message && t(`validation.${errors.message.message}`)}>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          placeholder={t('message')}
          className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus-visible:ring-2 focus-visible:ring-teal dark:border-mist/10 dark:bg-ink/60 dark:text-mist"
          required
        />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? '...' : t('submit')}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink dark:text-mist">
      <span className="font-medium">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
