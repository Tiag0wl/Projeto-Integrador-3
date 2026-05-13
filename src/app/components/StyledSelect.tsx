
interface StyledSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function StyledSelect({ value, onChange, options, placeholder, className = '' }: StyledSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer appearance-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              margin: '0.25rem',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
