'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { useEmployees, Employee } from '@/contexts/EmployeeContext';
import { 
  Bookmark, 
  BookmarkCheck, 
  TrendingUp,
  ArrowLeft,
  Mail,
  Phone 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface EmployeeHeaderProps {
  employee: Employee;
}

export default function EmployeeHeader({ employee }: EmployeeHeaderProps) {
  const router = useRouter();
  const { toggleBookmark, isBookmarked, promoteEmployee } = useEmployees();
  const { toast } = useToast();
  const [isPromoting, setIsPromoting] = useState(false);

  const getPerformanceLabel = (performance: number) => {
    if (performance >= 5) return 'Outstanding';
    if (performance >= 4) return 'Excellent';
    if (performance >= 3) return 'Good';
    if (performance >= 2) return 'Fair';
    return 'Needs Improvement';
  };

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
    <div className="relative">
      {/* Background banner */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg" />
      
      <div className="px-8 pb-6 relative">
        {/* Profile image */}
        <div className="absolute -top-16 left-8 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden h-32 w-32 bg-white shadow-md">
          <Image
            src={employee.image}
            alt={`${employee.firstName} ${employee.lastName}`}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        {/* Back button */}
        <div className="absolute top-[-3rem] left-2">
          <Button 
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        
        {/* Actions */}
        <div className="absolute top-[-3rem] right-2 space-x-2">
          <Button 
            variant="ghost"
            size="sm"
            className={cn(
              "bg-white/20 hover:bg-white/30 text-white",
              isBookmarked(employee.id) && "text-amber-300"
            )}
            onClick={handleBookmark}
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
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={handlePromote}
            disabled={isPromoting || employee.performance >= 5}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Promote
          </Button>
        </div>
      
        <div className="mt-16 md:flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {employee.firstName} {employee.lastName}
            </h1>
            
            <p className="text-muted-foreground mb-2">
              {employee.department}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                <a 
                  href={`mailto:${employee.email}`} 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {employee.email}
                </a>
              </div>
              
              <span className="hidden sm:inline text-muted-foreground">•</span>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                <a 
                  href={`tel:${employee.phone}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {employee.phone}
                </a>
              </div>
            </div>
            
            <div className="mb-1">
              <span className="text-sm text-muted-foreground">Address: </span>
              <span className="text-sm">
                {employee.address.address}, {employee.address.city}, {employee.address.state}
              </span>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Age: </span>
              <span className="text-sm">{employee.age}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:text-right">
            <div className="flex md:justify-end items-center mb-2">
              <span className="text-sm font-medium mr-2">Performance Rating:</span>
              <Rating value={employee.performance} size="md" />
            </div>
            
            <Badge className={cn("text-sm", getPerformanceColor(employee.performance))}>
              {getPerformanceLabel(employee.performance)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}