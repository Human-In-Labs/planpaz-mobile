export interface FilterSectionProps {
    search: string;
    onSearchChange: (text: string) => void;
    filters: string[];
    onRemoveFilter: (filter: string) => void;
    onFilterPress: () => void;
    onSuggestionPress: () => void;
}