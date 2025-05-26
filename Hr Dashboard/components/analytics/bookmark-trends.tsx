'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEmployees } from '@/contexts/EmployeeContext';

// Generate mock data for bookmark trends
const generateMockData = (bookmarkedCount: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  return months.slice(0, currentMonth + 1).map((month, index) => {
    // Generate a somewhat realistic trend leading up to the current bookmark count
    const factor = index / currentMonth;
    const targetBookmarks = bookmarkedCount;
    const randomVariation = Math.random() * 0.3 - 0.15; // -15% to +15%
    
    const bookmarks = index === currentMonth 
      ? targetBookmarks 
      : Math.max(0, Math.round(targetBookmarks * factor * (1 + randomVariation)));
    
    return {
      month,
      bookmarks,
      interactions: Math.round(bookmarks * (2 + Math.random())),
    };
  });
};

export default function BookmarkTrends() {
  const { bookmarkedEmployees } = useEmployees();
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    setData(generateMockData(bookmarkedEmployees.length));
  }, [bookmarkedEmployees.length]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-chart-2">
            Bookmarks: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-chart-1">
            Interactions: <span className="font-semibold">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
        <CardDescription>
          Employee bookmarks and interactions over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="bookmarks" 
              name="Bookmarks" 
              stroke="hsl(var(--chart-2))" 
              activeDot={{ r: 8 }}
              className="stroke-[3px]" 
            />
            <Line 
              type="monotone" 
              dataKey="interactions" 
              name="Interactions" 
              stroke="hsl(var(--chart-1))" 
              className="stroke-[3px]" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}