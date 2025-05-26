'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEmployees } from '@/contexts/EmployeeContext';
import { 
  Eye,
  Trash2,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

export default function BookmarkList() {
  const { bookmarkedEmployees, toggleBookmark, promoteEmployee } = useEmployees();
  const { toast } = useToast();
  const [removingEmployee, setRemovingEmployee] = useState<number | null>(null);
  const [assigningEmployee, setAssigningEmployee] = useState<number | null>(null);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 4) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (performance >= 3) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (performance >= 2) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const handleRemoveBookmark = (employeeId: number) => {
    toggleBookmark(employeeId);
    setRemovingEmployee(null);
    toast({
      title: "Employee removed",
      description: "Employee has been removed from bookmarks.",
    });
  };

  const handleAssignProject = (employeeId: number) => {
    // In a real application, this would call an API
    setAssigningEmployee(null);
    toast({
      title: "Project assigned",
      description: "Project has been assigned to the employee.",
    });
  };

  const handlePromote = (employeeId: number) => {
    promoteEmployee(employeeId);
    toast({
      title: "Employee promoted",
      description: "Employee has been promoted successfully.",
    });
  };

  if (bookmarkedEmployees.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
        <h3 className="text-xl font-medium mb-2">No Bookmarked Employees</h3>
        <p className="text-muted-foreground mb-4">
          You haven't bookmarked any employees yet. Start bookmarking to keep track of top performers.
        </p>
        <Button asChild>
          <Link href="/">
            Browse Employees
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarkedEmployees.map((employee) => (
        <div
          key={employee.id}
          className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
        >
          <div className="md:w-1/5 bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-center items-center">
            <div className="rounded-full border-2 border-white overflow-hidden h-20 w-20 bg-white">
              <Image
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="p-4 md:w-3/5 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-semibold">
                {employee.firstName} {employee.lastName}
              </h3>
              
              <div className="flex items-center mt-1 md:mt-0">
                <Badge className={cn(getPerformanceColor(employee.performance), "mr-2")}>
                  {employee.performance}/5
                </Badge>
                <Rating value={employee.performance} size="sm" />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {employee.email}
            </p>
            
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {employee.department}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {employee.projects.length} Projects
              </span>
            </div>
          </div>
          
          <div className="p-4 md:w-1/5 flex md:flex-col gap-2 bg-muted/20">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/employee/${employee.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => setAssigningEmployee(employee.id)}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Assign
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handlePromote(employee.id)}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Promote
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-destructive border-destructive hover:bg-destructive/10" 
              onClick={() => setRemovingEmployee(employee.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ))}
      
      {/* Confirmation dialog for removing bookmark */}
      <AlertDialog open={removingEmployee !== null} onOpenChange={() => setRemovingEmployee(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from bookmarks</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this employee from your bookmarks? 
              This action can be undone later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removingEmployee !== null && handleRemoveBookmark(removingEmployee)}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Confirmation dialog for assigning project */}
      <AlertDialog open={assigningEmployee !== null} onOpenChange={() => setAssigningEmployee(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Assign to Project</AlertDialogTitle>
            <AlertDialogDescription>
              Select a project to assign to this employee:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {['New Product Launch', 'Customer Portal Revamp', 'Efficiency Initiative', 'Compliance Update'].map((project, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className="justify-start h-auto py-3 px-4"
                onClick={() => assigningEmployee !== null && handleAssignProject(assigningEmployee)}
              >
                <div className="text-left">
                  <div className="font-medium">{project}</div>
                  <div className="text-xs text-muted-foreground mt-1">Priority: {['High', 'Medium', 'Low'][idx % 3]}</div>
                </div>
              </Button>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}