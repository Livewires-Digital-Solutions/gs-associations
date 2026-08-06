'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  name: string;
  flag: string;
  dialCode: string;
  digits: number;
  placeholder: string;
}

export const COUNTRIES: Country[] = [
  { name: 'India',        flag: '🇮🇳', dialCode: '+91',  digits: 10, placeholder: '99001 12345' },
  { name: 'UAE',          flag: '🇦🇪', dialCode: '+971', digits: 9,  placeholder: '50 123 4567' },
  { name: 'USA',          flag: '🇺🇸', dialCode: '+1',   digits: 10, placeholder: '212 555 0100' },
  { name: 'UK',           flag: '🇬🇧', dialCode: '+44',  digits: 10, placeholder: '7911 123456' },
  { name: 'Singapore',    flag: '🇸🇬', dialCode: '+65',  digits: 8,  placeholder: '9123 4567' },
  { name: 'Australia',    flag: '🇦🇺', dialCode: '+61',  digits: 9,  placeholder: '412 345 678' },
  { name: 'Canada',       flag: '🇨🇦', dialCode: '+1',   digits: 10, placeholder: '416 555 0100' },
  { name: 'Germany',      flag: '🇩🇪', dialCode: '+49',  digits: 10, placeholder: '1512 3456789' },
  { name: 'France',       flag: '🇫🇷', dialCode: '+33',  digits: 9,  placeholder: '6 12 34 56 78' },
  { name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', digits: 9,  placeholder: '51 234 5678' },
];

interface PhoneInputProps {
  value: string;
  onChange: (fullValue: string, isValid: boolean) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
}

export default function PhoneInput({
  value,
  onChange,
  className = '',
  required,
  disabled,
  wrapperClassName = '',
}: PhoneInputProps) {
  const detectCountry = (val: string): Country => {
    if (!val) return COUNTRIES[0];
    for (const c of COUNTRIES) {
      if (val.startsWith(c.dialCode + ' ') || val === c.dialCode) return c;
    }
    return COUNTRIES[0];
  };

  const [country, setCountry] = useState<Country>(() => detectCountry(value));
  const [localNumber, setLocalNumber] = useState<string>(() => {
    const prefix = detectCountry(value).dialCode + ' ';
    return value.startsWith(prefix) ? value.slice(prefix.length) : '';
  });
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const digitCount = localNumber.replace(/\D/g, '').length;
  const isValid = digitCount === country.digits;
  const showError = touched && localNumber.length > 0 && !isValid;

  const handleCountrySelect = (c: Country) => {
    setCountry(c);
    setOpen(false);
    const full = localNumber ? `${c.dialCode} ${localNumber}` : c.dialCode;
    const valid = localNumber.replace(/\D/g, '').length === c.digits;
    onChange(full, valid);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9\s]/g, '');
    setLocalNumber(raw);
    const full = raw ? `${country.dialCode} ${raw}` : country.dialCode;
    const valid = raw.replace(/\D/g, '').length === country.digits;
    onChange(full, valid);
  };

  return (
    <div className={`relative ${wrapperClassName}`} ref={dropdownRef}>
      <div
        className={[
          'flex items-stretch border rounded-xl overflow-hidden transition-all bg-white',
          showError
            ? 'border-red-400 ring-2 ring-red-400/20'
            : 'border-surface-200 focus-within:border-navy-400 focus-within:ring-2 focus-within:ring-navy-400/20',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
          className,
        ].join(' ')}
      >
        {/* Country picker button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen(o => !o)}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-surface-50 border-r border-surface-200 hover:bg-surface-100 transition-colors flex-shrink-0 select-none"
          aria-label="Select country code"
        >
          <span className="text-lg leading-none">{country.flag}</span>
          <span className="text-xs font-semibold text-surface-600 tabular-nums">{country.dialCode}</span>
          <ChevronDown className={`w-3 h-3 text-surface-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Number input — digits and spaces only */}
        <input
          type="tel"
          inputMode="numeric"
          value={localNumber}
          onChange={handleNumberChange}
          onBlur={() => setTouched(true)}
          placeholder={country.placeholder}
          required={required}
          disabled={disabled}
          className="flex-1 px-3 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 outline-none bg-transparent min-w-0"
          aria-label="Phone number"
        />

        {/* Live digit counter */}
        {touched && localNumber.length > 0 && (
          <span className={`flex items-center pr-3 text-xs font-medium tabular-nums flex-shrink-0 ${
            isValid ? 'text-emerald-500' : 'text-red-400'
          }`}>
            {digitCount}/{country.digits}
          </span>
        )}
      </div>

      {/* Inline error hint */}
      {showError && (
        <p className="mt-1 text-xs text-red-500">
          {country.name} numbers need exactly {country.digits} digits ({country.dialCode})
        </p>
      )}

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-64 bg-white border border-surface-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="max-h-56 overflow-y-auto">
            {COUNTRIES.map(c => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleCountrySelect(c)}
                className={[
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                  c.name === country.name
                    ? 'bg-navy-50 text-navy-700 font-semibold'
                    : 'text-surface-700 hover:bg-surface-50',
                ].join(' ')}
              >
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-surface-400 tabular-nums">{c.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
