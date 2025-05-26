'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { useEmployees, Employee } from '@/contexts/EmployeeContext';
import { 
  Eye, 
  Bookmark,
  BookmarkCheck,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface EmployeeCardProps {
  employee: Employee;
  className?: string;
}

export default function EmployeeCard({ employee, className }: EmployeeCardProps) {
  const { toggleBookmark, isBookmarked, promoteEmployee } = useEmployees();
  const { toast } = useToast();
  const [isPromoting, setIsPromoting] = useState(false);
  
  const getPerformanceColor = (performance: number) => {
    if (performance >= 4) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (performance >= 3) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (performance >= 2) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const handleBookmark = () => {
    toggleBookmark(employee.id);
    toast({
      title: isBookmarked(employee.id) 
        ? 'Employee removed from bookmarks' 
        : 'Employee added to bookmarks',
      description: `${employee.firstName} ${employee.lastName} has been ${isBookmarked(employee.id) ? 'removed from' : 'added to'} your bookmarks.`,
    });
  };

  const handlePromote = () => {
    setIsPromoting(true);
    
    // Simulate API call
    setTimeout(() => {
      promoteEmployee(employee.id);
      setIsPromoting(false);
      toast({
        title: 'Employee promoted!',
        description: `${employee.firstName} ${employee.lastName} has been promoted.`,
      });
    }, 800);
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardContent className="p-0">
        <div className="relative h-24 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="absolute -bottom-12 left-4">
            <div className="rounded-full border-4 border-white dark:border-gray-800 overflow-hidden h-24 w-24 bg-white">
              <Image
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-14 px-4 pb-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-lg truncate">
                {employee.firstName} {employee.lastName}
              </h3>
              <Badge className={cn("ml-2", getPerformanceColor(employee.performance))}>
                {employee.performance}/5
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-2">
              {employee.email}
            </p>
            
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">
                {employee.department}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Age: {employee.age}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Performance:</span>
                <Rating value={employee.performance} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800 border-t p-3 grid grid-cols-3 gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/employee/${employee.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBookmark}
          className={cn(
            isBookmarked(employee.id) && "text-amber-500 dark:text-amber-400"
          )}
        >
          {isBookmarked(employee.id) ? (
            <BookmarkCheck className="h-4 w-4 mr-1" />
          ) : (
            <Bookmark className="h-4 w-4 mr-1" />
          )}
          {isBookmarked(employee.id) ? 'Saved' : 'Save'}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handlePromote}
          disabled={isPromoting}
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
}