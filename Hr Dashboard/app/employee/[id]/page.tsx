import EmployeePageContent from '@/components/employee/employee-page-content';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default function EmployeePage({ params }: { params: { id: string } }) {
  return <EmployeePageContent employeeId={params.id} />;
}