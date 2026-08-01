'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Tag, Sparkles } from 'lucide-react';

interface Suggestion {
  label: string;
  type: 'location' | 'title' | 'propertyType' | 'nearby';
  icon: React.ReactNode;
}

export interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  variant?: 'glass' | 'solid';
  className?: string;
  properties?: Array<{ title: string; location: string; city: string; type: string }>;
  /** Extra classes applied to the inner input wrapper (solid mode) */
  inputWrapperClassName?: string;
}

// Known Chennai areas powering the "nearby" fuzzy fallback
const CHENNAI_AREAS = [
  'OMR', 'ECR', 'Adyar', 'Anna Nagar', 'Nungambakkam', 'Velachery', 'Guindy',
  'T. Nagar', 'Kodambakkam', 'Mylapore', 'Perambur', 'Sholinganallur',
  'Perungudi', 'Thoraipakkam', 'Navalur', 'Siruseri', 'Karapakkam',
  'Kilpauk', 'Aminjikarai', 'Saligramam', 'Virugambakkam', 'Vadapalani',
  'Ashok Nagar', 'KK Nagar', 'Mogappair', 'Maduravoyal', 'Porur',
  'Padi', 'Ambattur', 'Avadi', 'Thiruvottiyur', 'Tondiarpet',
  'Royapuram', 'Egmore', 'Chetpet', 'Alwarpet', 'Besant Nagar',
  'Palavakkam', 'Injambakkam', 'Akkarai', 'Kelambakkam', 'Mahabalipuram',
  'Thiruvanmiyur', 'Kottivakkam', 'Neelankarai', 'Kanathur', 'Pudupakkam',
  'Medavakkam', 'Pallavaram', 'Pammal', 'Chromepet', 'Tambaram',
  'Perungalathur', 'Vandalur', 'Urapakkam', 'GST Road', 'Maraimalai Nagar',
  'Poonamallee', 'Kundrathur', 'Thirumazhisai', 'Sriperumbudur',
  'Iyyapanthangal', 'Kolapakkam', 'Thalambur', 'Vengaivasal', 'Okkiyampet',
  'Pallikaranai', 'Nanmangalam', 'Chitlapakkam', 'Selaiyur', 'Perumbakkam',
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Penthouse'];

/** Levenshtein distance for fuzzy matching */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else dp[i][j] = 0;
    }
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

function findNearbyAreas(query: string, limit = 5): string[] {
  const q = query.toLowerCase();
  return CHENNAI_AREAS
    .map(area => ({
      area,
      score: area.toLowerCase().includes(q) ? 0 : levenshtein(q, area.toLowerCase()),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(a => a.area);
}

export default function SearchAutocomplete({
  value,
  onChange,
  onSearch,
  placeholder = 'Search location, property, or type...',
  variant = 'solid',
  className = '',
  properties = [],
  inputWrapperClassName = '',
}: SearchAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const buildSuggestions = useCallback(
    (q: string) => {
      if (!q || q.length < 1) {
        setSuggestions([]);
        return;
      }
      const lower = q.toLowerCase();
      const seen = new Set<string>();
      const results: Suggestion[] = [];

      // 1. Partial location/city matches from live property data
      const locationHits = [
        ...new Set(
          properties
            .flatMap(p => [p.location, p.city])
            .filter(loc => loc && loc.toLowerCase().includes(lower))
        ),
      ].slice(0, 4);

      locationHits.forEach(loc => {
        if (!seen.has(loc)) {
          seen.add(loc);
          results.push({ label: loc, type: 'location', icon: <MapPin className="w-4 h-4" /> });
        }
      });

      // 2. Known Chennai area partial matches
      CHENNAI_AREAS.filter(a => a.toLowerCase().includes(lower) && !seen.has(a))
        .slice(0, 4)
        .forEach(a => {
          seen.add(a);
          results.push({ label: a, type: 'location', icon: <MapPin className="w-4 h-4" /> });
        });

      // 3. Property title matches
      properties
        .filter(p => p.title.toLowerCase().includes(lower))
        .slice(0, 2)
        .forEach(p => {
          if (!seen.has(p.title)) {
            seen.add(p.title);
            results.push({ label: p.title, type: 'title', icon: <Building2 className="w-4 h-4" /> });
          }
        });

      // 4. Property type matches
      PROPERTY_TYPES.filter(t => t.toLowerCase().includes(lower))
        .slice(0, 2)
        .forEach(t => {
          if (!seen.has(t)) {
            seen.add(t);
            results.push({ label: t, type: 'propertyType', icon: <Tag className="w-4 h-4" /> });
          }
        });

      // 5. Fuzzy "nearby area" fallback when nothing matched
      if (results.length === 0) {
        findNearbyAreas(q, 5).forEach(area => {
          results.push({ label: area, type: 'nearby', icon: <Sparkles className="w-4 h-4" /> });
        });
      }

      setSuggestions(results);
      setHighlighted(-1);
    },
    [properties]
  );

  useEffect(() => {
    buildSuggestions(value);
  }, [value, buildSuggestions]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (label: string) => {
    onChange(label);
    setOpen(false);
    if (onSearch) onSearch(label);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, suggestions.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    }
    if (e.key === 'Enter' && highlighted >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlighted].label);
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  const isGlass = variant === 'glass';

  const typeLabel: Record<Suggestion['type'], string> = {
    location: 'Area',
    title: 'Property',
    propertyType: 'Type',
    nearby: 'Nearby',
  };

  const typeColorClass: Record<Suggestion['type'], string> = {
    location: 'text-blue-500',
    title: 'text-navy-600',
    propertyType: 'text-purple-500',
    nearby: 'text-amber-500',
  };

  const hasNearbyOnly = suggestions.length > 0 && suggestions.every(s => s.type === 'nearby');

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* --- Glass variant (hero bar) ---------------------------------------- */}
      {isGlass && (
        <div className="flex items-center w-full h-14 md:h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg overflow-visible pr-2 pl-6 transition-all hover:bg-white/15">
          <MapPin className="w-5 h-5 text-white/70 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => { onChange(e.target.value); setOpen(true); }}
            onFocus={() => { if (value.length >= 1) setOpen(true); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className="flex-1 h-full bg-transparent text-white placeholder:text-white/60 focus:outline-none text-base font-medium"
          />
          <button
            type="submit"
            className="h-10 md:h-12 px-6 bg-white/20 hover:bg-white/30 border border-white/20 text-white text-sm font-semibold rounded-full transition-all flex items-center gap-2 flex-shrink-0"
          >
            Search
          </button>
        </div>
      )}

      {/* --- Solid variant (listing search bar) -------------------------------- */}
      {!isGlass && (
        <div className={`flex items-center bg-transparent ${inputWrapperClassName}`}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => { onChange(e.target.value); setOpen(true); }}
            onFocus={() => { if (value.length >= 1) setOpen(true); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className="flex-1 h-12 bg-transparent text-surface-900 placeholder:text-surface-400 focus:outline-none text-base font-medium"
          />
        </div>
      )}

      {/* --- Dropdown ---------------------------------------------------------- */}
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-surface-200 overflow-hidden z-[9999]"
          >
            {hasNearbyOnly && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-amber-700">
                  No exact match — did you mean?
                </span>
              </div>
            )}
            {suggestions.map((s, i) => (
              <button
                key={`${s.label}-${i}`}
                onMouseDown={e => { e.preventDefault(); handleSelect(s.label); }}
                onMouseEnter={() => setHighlighted(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm border-b border-surface-50 last:border-0 ${
                  i === highlighted ? 'bg-navy-50' : 'hover:bg-surface-50'
                }`}
              >
                <span className={`flex-shrink-0 ${typeColorClass[s.type]}`}>{s.icon}</span>
                <span className="flex-1 font-medium text-surface-900 truncate">{s.label}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${typeColorClass[s.type]} opacity-60`}>
                  {typeLabel[s.type]}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
