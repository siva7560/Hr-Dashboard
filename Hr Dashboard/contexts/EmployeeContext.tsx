'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the Employee type
export type Department = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Finance' | 'Product' | 'Design';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  age: number;
  department: Department;
  performance: number;
  projects: Array<{
    id: number;
    name: string;
    status: 'Completed' | 'In Progress' | 'On Hold';
    contribution: number;
  }>;
  feedback: Array<{
    id: number;
    from: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}

interface EmployeeContextType {
  employees: Employee[];
  filteredEmployees: Employee[];
  bookmarkedEmployees: Employee[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedDepartments: Department[];
  selectedRatings: number[];
  searchEmployees: (term: string) => void;
  toggleDepartmentFilter: (department: Department) => void;
  toggleRatingFilter: (rating: number) => void;
  resetFilters: () => void;
  toggleBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
  promoteEmployee: (employeeId: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const departments: Department[] = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Product',
  'Design'
];

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        
        const data = await response.json();
        
        // Transform the data to add our custom fields
        const enhancedEmployees: Employee[] = data.users.map((user: any) => ({
          ...user,
          department: departments[Math.floor(Math.random() * departments.length)],
          performance: Math.floor(Math.random() * 5) + 1, // 1-5 rating
          projects: Array(Math.floor(Math.random() * 5) + 1)
            .fill(0)
            .map((_, i) => ({
              id: i + 1,
              name: `Project ${String.fromCharCode(65 + i)}`,
              status: ['Completed', 'In Progress', 'On Hold'][Math.floor(Math.random() * 3)] as 'Completed' | 'In Progress' | 'On Hold',
              contribution: Math.floor(Math.random() * 100) + 1,
            })),
          feedback: Array(Math.floor(Math.random() * 8) + 2)
            .fill(0)
            .map((_, i) => ({
              id: i + 1,
              from: `Manager ${i + 1}`,
              date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
              rating: Math.floor(Math.random() * 5) + 1,
              comment: [
                'Excellent team player',
                'Needs improvement in communication',
                'Great technical skills',
                'Exceeds expectations',
                'Meeting goals consistently',
                'Shows leadership potential',
                'Requires mentoring',
                'Innovative problem solver'
              ][Math.floor(Math.random() * 8)],
            })),
        }));
        
        setEmployees(enhancedEmployees);
        setFilteredEmployees(enhancedEmployees);
        
        // Load bookmarked employees from localStorage
        const savedBookmarks = localStorage.getItem('bookmarkedEmployees');
        if (savedBookmarks) {
          const bookmarkIds = JSON.parse(savedBookmarks) as number[];
          const bookmarkedEmps = enhancedEmployees.filter(emp => bookmarkIds.includes(emp.id));
          setBookmarkedEmployees(bookmarkedEmps);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let result = [...employees];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        emp => 
          emp.firstName.toLowerCase().includes(term) || 
          emp.lastName.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term) ||
          emp.department.toLowerCase().includes(term)
      );
    }
    
    // Apply department filters
    if (selectedDepartments.length > 0) {
      result = result.filter(emp => selectedDepartments.includes(emp.department));
    }
    
    // Apply rating filters
    if (selectedRatings.length > 0) {
      result = result.filter(emp => selectedRatings.includes(emp.performance));
    }
    
    setFilteredEmployees(result);
  }, [searchTerm, selectedDepartments, selectedRatings, employees]);

  // Handle search
  const searchEmployees = (term: string) => {
    setSearchTerm(term);
  };

  // Toggle department filter
  const toggleDepartmentFilter = (department: Department) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(dep => dep !== department)
        : [...prev, department]
    );
  };

  // Toggle rating filter
  const toggleRatingFilter = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartments([]);
    setSelectedRatings([]);
  };

  // Bookmark functionality
  const toggleBookmark = (employeeId: number) => {
    const isCurrentlyBookmarked = bookmarkedEmployees.some(emp => emp.id === employeeId);
    
    if (isCurrentlyBookmarked) {
      const newBookmarks = bookmarkedEmployees.filter(emp => emp.id !== employeeId);
      setBookmarkedEmployees(newBookmarks);
      localStorage.setItem('bookmarkedEmployees', JSON.stringify(newBookmarks.map(emp => emp.id)));
    } else {
      const employeeToBookmark = employees.find(emp => emp.id === employeeId);
      if (employeeToBookmark) {
        const newBookmarks = [...bookmarkedEmployees, employeeToBookmark];
        setBookmarkedEmployees(newBookmarks);
        localStorage.setItem('bookmarkedEmployees', JSON.stringify(newBookmarks.map(emp => emp.id)));
      }
    }
  };

  // Check if an employee is bookmarked
  const isBookmarked = (employeeId: number) => {
    return bookmarkedEmployees.some(emp => emp.id === employeeId);
  };

  // Promote employee (just a UI action for now)
  const promoteEmployee = (employeeId: number) => {
    // In a real application, this would call an API to promote the employee
    // For now, we'll just show a console log
    console.log(`Employee ${employeeId} promoted!`);
    
    // Update employee in our state to simulate promotion
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, performance: Math.min(5, emp.performance + 1) } 
          : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        filteredEmployees,
        bookmarkedEmployees,
        isLoading,
        error,
        searchTerm,
        selectedDepartments,
        selectedRatings,
        searchEmployees,
        toggleDepartmentFilter,
        toggleRatingFilter,
        resetFilters,
        toggleBookmark,
        isBookmarked,
        promoteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};