'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import EmployeeHeader from '@/components/employee/employee-header';
import EmployeeTabs from '@/components/employee/employee-tabs';
import { useEmployees, Employee } from '@/contexts/EmployeeContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeePageContent({ employeeId }: { employeeId: string }) {
  const { employees, isLoading } = useEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  
  useEffect(() => {
    if (isLoading) return;
    
    const id = Number(employeeId);
    if (isNaN(id)) return;
    
    const foundEmployee = employees.find(emp => emp.id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
    setIsLoadingEmployee(false);
  }, [employeeId, employees, isLoading]);

  if (isLoading || isLoadingEmployee) {
    return (
      <div className="space-y-4">
        <Card>
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg" />
          <div className="p-8 pt-16 relative">
            <div className="absolute -top-16 left-8 rounded-full border-4 border-white overflow-hidden h-32 w-32 bg-gray-200" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Card>
        
        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-6" />
          <Card>
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
          Employee Not Found
        </h2>
        <p className="text-red-600 dark:text-red-300">
          The employee you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <EmployeeHeader employee={employee} />
      </Card>
      
      <EmployeeTabs employee={employee} />
    </div>
  );
}