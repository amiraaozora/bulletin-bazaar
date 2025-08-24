import { PostCategory } from '@/types';
import { Button } from './ui/button';

interface CategoryTabsProps {
  selectedCategory: PostCategory;
  onCategoryChange: (category: PostCategory) => void;
}

const categories: PostCategory[] = [
  "All",
  "AR", 
  "SMG", 
  "Shotgun", 
  "LMG", 
  "Sniper Rifle", 
  "Marksman Rifle", 
  "Hand Gun"
];

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted/50 rounded-xl border border-border">
      {categories.map((category) => (
        <Button
          key={category}
          variant="tab"
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 rounded-lg transition-all duration-200
            ${selectedCategory === category 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'hover:bg-accent hover:text-accent-foreground'
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};