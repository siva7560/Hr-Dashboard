import SearchFilters from '@/components/dashboard/search-filters';
import EmployeeGrid from '@/components/dashboard/employee-grid';

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Track employee performance and manage team information
        </p>
      </div>
      
      <SearchFilters />
      <EmployeeGrid />
    </div>
  );
}