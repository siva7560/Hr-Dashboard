import DepartmentChart from '@/components/analytics/department-chart';
import BookmarkTrends from '@/components/analytics/bookmark-trends';
import TopPerformersChart from '@/components/analytics/top-performers-chart';

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Review team performance metrics and trends
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DepartmentChart />
        <BookmarkTrends />
      </div>
      
      <div className="mb-6">
        <TopPerformersChart />
      </div>
    </div>
  );
}