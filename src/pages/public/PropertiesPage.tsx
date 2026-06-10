import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { usePropertyStore } from '../../stores/propertyStore';
import PropertyCard from '../../components/property/PropertyCard';
import type { PropertyType, PropertyStatus } from '../../data/mockData';

const propertyTypes: PropertyType[] = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Row House', 'Penthouse'];
const statusOptions: PropertyStatus[] = ['Available', 'Under Offer', 'Sold'];
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under ₹50 Lakhs', min: 0, max: 5000000 },
  { label: '₹50L - ₹1 Crore', min: 5000000, max: 10000000 },
  { label: '₹1Cr - ₹2 Crore', min: 10000000, max: 20000000 },
  { label: '₹2Cr - ₹5 Crore', min: 20000000, max: 50000000 },
  { label: 'Above ₹5 Crore', min: 50000000, max: Infinity },
];
const bedroomOptions = [0, 1, 2, 3, 4, 5];
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Most Saved', value: 'saves' },
];

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties } = usePropertyStore();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>(
    searchParams.get('type') ? [searchParams.get('type') as PropertyType] : []
  );
  const [selectedStatus, setSelectedStatus] = useState<PropertyStatus[]>([]);
  const [priceRange, setPriceRange] = useState(0);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }

    if (selectedStatus.length > 0) {
      result = result.filter(p => selectedStatus.includes(p.status));
    }

    const { min, max } = priceRanges[priceRange];
    result = result.filter(p => p.price >= min && p.price <= max);

    if (bedrooms !== null) {
      result = result.filter(p => p.bedrooms === bedrooms);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'views': result.sort((a, b) => b.views - a.views); break;
      case 'saves': result.sort((a, b) => b.saves - a.saves); break;
      default: result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return result;
  }, [properties, searchQuery, selectedTypes, selectedStatus, priceRange, bedrooms, sortBy]);

  const toggleType = (type: PropertyType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedStatus([]);
    setPriceRange(0);
    setBedrooms(null);
    setSortBy('newest');
  };

  const hasFilters = searchQuery || selectedTypes.length > 0 || selectedStatus.length > 0 || priceRange > 0 || bedrooms !== null;

  return (
    <div className="pt-24 pb-20 bg-surface-50 min-h-screen">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-surface-900 mb-2">Property Listings</h1>
          <p className="text-surface-500">Discover {properties.length} verified properties across Hyderabad</p>
        </div>

        {/* Search + Filters Bar */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card-base p-4 mb-8 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search location, property name..."
              className="input pl-10"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`btn-secondary gap-2 ${filtersOpen ? 'bg-navy-50 border-navy-300 text-navy-700' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-navy-700 text-white text-[10px] flex items-center justify-center font-bold">
                {[searchQuery, ...selectedTypes, ...selectedStatus, priceRange > 0 ? 1 : 0, bedrooms !== null ? 1 : 0].filter(Boolean).length}
              </span>
            )}
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input pr-8 appearance-none cursor-pointer bg-surface-50 min-w-[180px]"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
          </div>
        </div>

        {/* Expanded Filters */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-card-base p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Property Type */}
              <div>
                <p className="label mb-3">Property Type</p>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'bg-surface-50 text-surface-600 border-surface-200 hover:border-navy-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="label mb-3">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStatus(prev =>
                        prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
                      )}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedStatus.includes(s)
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'bg-surface-50 text-surface-600 border-surface-200 hover:border-navy-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="label mb-3">Price Range</p>
                <select
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="input text-sm"
                >
                  {priceRanges.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <p className="label mb-3">Bedrooms</p>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map(n => (
                    <button
                      key={n}
                      onClick={() => setBedrooms(bedrooms === n ? null : n)}
                      className={`w-9 h-9 rounded-lg text-xs font-medium border transition-all ${
                        bedrooms === n
                          ? 'bg-navy-800 text-white border-navy-800'
                          : 'bg-surface-50 text-surface-600 border-surface-200 hover:border-navy-300'
                      }`}
                    >
                      {n === 0 ? 'Any' : n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 pt-4 border-t border-surface-100 flex items-center justify-between">
                <p className="text-sm text-surface-500">
                  {filtered.length} properties found
                </p>
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium">
                  <X className="w-3.5 h-3.5" />
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-surface-500">
            <span className="font-semibold text-surface-900">{filtered.length}</span> properties found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="font-display text-xl font-semibold text-surface-700 mb-2">No properties found</h3>
            <p className="text-surface-500 text-sm mb-6">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map(property => (
              <motion.div
                key={property.id}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
