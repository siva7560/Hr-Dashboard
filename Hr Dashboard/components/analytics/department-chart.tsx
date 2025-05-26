'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployees, Department } from '@/contexts/EmployeeContext';
import { cn } from '@/lib/utils';

interface DepartmentData {
  name: string;
  avgRating: number;
  count: number;
}

export default function DepartmentChart() {
  const { employees } = useEmployees();
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  
  // Calculate department-wise average ratings
  useEffect(() => {
    if (employees.length === 0) return;

    const deptMap = new Map<Department, { totalRating: number; count: number }>();
    
    // Calculate totals and counts
    for (const employee of employees) {
      const current = deptMap.get(employee.department) || { totalRating: 0, count: 0 };
      deptMap.set(employee.department, {
        totalRating: current.totalRating + employee.performance,
        count: current.count + 1
      });
    }
    
    // Convert to array for the chart
    const data: DepartmentData[] = [];
    deptMap.forEach((value, department) => {
      data.push({
        name: department,
        avgRating: parseFloat((value.totalRating / value.count).toFixed(1)),
        count: value.count
      });
    });
    
    // Sort by average rating
    data.sort((a, b) => b.avgRating - a.avgRating);
    
    setDepartmentData(data);
  }, [employees]);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm">
            Average Rating: <span className="font-semibold">{payload[0].payload.avgRating}</span>
          </p>
          <p className="text-sm">
            Employees: <span className="font-semibold">{payload[0].payload.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  const getBarColor = (rating: number) => {
    if (rating >= 4) return 'fill-chart-1';
    if (rating >= 3) return 'fill-chart-2';
    if (rating >= 2) return 'fill-chart-3';
    return 'fill-chart-4';
  };

  if (departmentData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>
            Loading department data...
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Loading chart data...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>
          Average performance rating by department
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              className="text-xs font-medium"
            />
            <YAxis 
              domain={[0, 5]} 
              ticks={[0, 1, 2, 3, 4, 5]}
              className="text-xs"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="avgRating" 
              name="Average Rating" 
              radius={[4, 4, 0, 0]}
              onMouseEnter={(data) => setHoveredBar(data.name)}
              onMouseLeave={() => setHoveredBar(null)}
              className={({ name, avgRating }: any) => cn(
                getBarColor(avgRating),
                hoveredBar === name && "opacity-80"
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}