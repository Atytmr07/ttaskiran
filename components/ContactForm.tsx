'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, RotateCcw } from 'lucide-react';
import { fadeUp, VIEWPORT_ONCE } from './motion';
import { EMAIL, CATEGORY_KEYS } from '@/lib/site';
import PhoneField, { countryFor } from './PhoneField';
import MagneticButton from './MagneticButton';

type Fields = {
  name: string;
  email: string;
  country: string;
  phone: string;
  category: string;
  message: string;
};

const EMPTY: Fields = {
  name: '',
  email: '',
  country: 'TR',
  phone: '',
  category: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// No email backend is configured, so the form composes a pre-filled message
// and hands it to the visitor's mail client (honest, works immediately). A
// real transactional backend (e.g. Resend/SMTP via a server action) can be
// dropped in later without changing the markup.
export default function ContactForm() {
  const t = useTranslations('ContactPage');
  const tc = useTranslations('Categories');
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = t('errors.name');
    if (!EMAIL_RE.test(fields.email)) next.email = t('errors.email');
    if (!fields.message.trim()) next.message = t('errors.message');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const categoryLabel = fields.category
      ? tc(`${fields.category}.name`)
      : '—';
    const phoneOut = fields.phone.trim()
      ? `${countryFor(fields.country).dial} ${fields.phone.trim()}`
      : '—';
    const body = [
      `${t('fields.name')}: ${fields.name}`,
      `${t('fields.email')}: ${fields.email}`,
      `${t('fields.phone')}: ${phoneOut}`,
      `${t('fields.category')}: ${categoryLabel}`,
      '',
      fields.message,
    ].join('\n');

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      t('mailSubject'),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  const inputBase =
    'w-full bg-graphite px-4 py-3 font-body text-base text-ivory placeholder:text-muted/50 frame-outline-strong transition-colors focus:border-brass focus:outline-none';

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-5 bg-surface p-8 frame-outline"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brass text-graphite">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-display text-2xl font-bold tracking-tight text-ivory">
          {t('successTitle')}
        </h3>
        <p className="max-w-md font-body text-base leading-relaxed text-ivory/[0.87]">
          {t('successBody')}
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setSent(false);
          }}
          className="mt-2 inline-flex items-center gap-2 font-body text-sm font-semibold text-brass"
        >
          <RotateCcw className="h-4 w-4" />
          {t('successAgain')}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      noValidate
      onSubmit={onSubmit}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      className="relative bg-surface p-7 frame-outline sm:p-9"
    >
      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ivory">
        {t('formTitle')}
      </h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label={t('fields.name')} error={errors.name} htmlFor="cf-name">
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={set('name')}
            placeholder={t('fields.namePlaceholder')}
            className={inputBase}
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label={t('fields.email')} error={errors.email} htmlFor="cf-email">
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={set('email')}
            placeholder={t('fields.emailPlaceholder')}
            className={inputBase}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field
          label={`${t('fields.phone')} · ${t('fields.optional')}`}
          htmlFor="cf-phone"
        >
          <PhoneField
            id="cf-phone"
            country={fields.country}
            national={fields.phone}
            onCountry={(iso) => setFields((f) => ({ ...f, country: iso }))}
            onNational={(v) => setFields((f) => ({ ...f, phone: v }))}
            placeholder={t('fields.phonePlaceholder')}
            searchPlaceholder={t('fields.countrySearch')}
          />
        </Field>

        <Field label={t('fields.category')} htmlFor="cf-category">
          <select
            id="cf-category"
            value={fields.category}
            onChange={set('category')}
            className={inputBase}
          >
            <option value="">{t('fields.categoryPlaceholder')}</option>
            {CATEGORY_KEYS.map((key) => (
              <option key={key} value={key}>
                {tc(`${key}.name`)}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label={t('fields.message')}
            error={errors.message}
            htmlFor="cf-message"
          >
            <textarea
              id="cf-message"
              rows={5}
              value={fields.message}
              onChange={set('message')}
              placeholder={t('fields.messagePlaceholder')}
              className={`${inputBase} resize-none`}
              aria-invalid={!!errors.message}
            />
          </Field>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs font-body text-xs leading-relaxed text-muted/60">
          {t('privacy')}
        </p>
        <MagneticButton>
          <button
            type="submit"
            className="cta-sheen group flex items-center justify-center gap-2.5 bg-brass px-7 py-3.5 font-body text-sm font-semibold text-graphite transition-colors hover:bg-brass-light"
          >
            <Mail className="h-4 w-4" />
            {t('submit')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </MagneticButton>
      </div>
    </motion.form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block font-body text-[11px] font-semibold uppercase tracking-widest2 text-muted/70">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block font-body text-xs text-brass">{error}</span>
      )}
    </label>
  );
}
