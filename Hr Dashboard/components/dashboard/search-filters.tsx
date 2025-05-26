'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useEmployees, Department } from '@/contexts/EmployeeContext';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Rating } from '@/components/ui/rating';

export default function SearchFilters() {
  const { 
    searchTerm, 
    searchEmployees, 
    selectedDepartments,
    selectedRatings,
    toggleDepartmentFilter,
    toggleRatingFilter,
    resetFilters,
    employees 
  } = useEmployees();

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Extract unique departments from employees
  useEffect(() => {
    const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];
    setDepartments(uniqueDepartments as Department[]);
  }, [employees]);
  
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(localSearchTerm);
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm]);
  
  // Apply debounced search term
  useEffect(() => {
    searchEmployees(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchEmployees]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocalSearchTerm('');
  };

  const hasActiveFilters = selectedDepartments.length > 0 || selectedRatings.length > 0 || localSearchTerm;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search by name, email, or department..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {localSearchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "gap-1",
                  (selectedDepartments.length > 0 || selectedRatings.length > 0) && "border-primary text-primary"
                )}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filters
                {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {selectedDepartments.length + selectedRatings.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Departments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`department-${department}`}
                        checked={selectedDepartments.includes(department)}
                        onCheckedChange={() => toggleDepartmentFilter(department)}
                      />
                      <label 
                        htmlFor={`department-${department}`}
                        className="text-sm cursor-pointer"
                      >
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-medium">Performance Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => toggleRatingFilter(rating)}
                      />
                      <label 
                        htmlFor={`rating-${rating}`}
                        className="flex items-center cursor-pointer"
                      >
                        <Rating value={rating} size="sm" />
                      </label>
                    </div>
                  ))}
                </div>
                
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={handleResetFilters}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedDepartments.map(dept => (
            <Badge 
              key={dept} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {dept}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => toggleDepartmentFilter(dept)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {selectedRatings.map(rating => (
            <Badge 
              key={rating} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {rating} Stars
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => toggleRatingFilter(rating)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={handleResetFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}