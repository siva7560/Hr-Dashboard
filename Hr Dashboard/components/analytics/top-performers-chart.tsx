'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployees, Employee } from '@/contexts/EmployeeContext';
import { cn } from '@/lib/utils';

interface PerformerData {
  name: string;
  value: number;
  employee: Employee;
}

export default function TopPerformersChart() {
  const { employees } = useEmployees();
  const [data, setData] = useState<PerformerData[]>([]);
  
  // Calculate top performers
  useEffect(() => {
    if (employees.length === 0) return;

    // Get top 5 performers
    const topPerformers = [...employees]
      .sort((a, b) => b.performance - a.performance)
      .slice(0, 5);
    
    // Map to chart data
    const performerData = topPerformers.map((employee) => ({
      name: `${employee.firstName} ${employee.lastName.charAt(0)}.`,
      value: employee.performance,
      employee
    }));
    
    setData(performerData);
  }, [employees]);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const employee = data.employee;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-md shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full overflow-hidden h-8 w-8">
              <Image 
                src={employee.image} 
                alt={employee.firstName} 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
            <span className="font-medium">
              {employee.firstName} {employee.lastName}
            </span>
          </div>
          <p className="text-sm">
            Department: <span className="font-semibold">{employee.department}</span>
          </p>
          <p className="text-sm">
            Performance: <span className="font-semibold">{employee.performance}/5</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>
          Employees with highest performance ratings
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}