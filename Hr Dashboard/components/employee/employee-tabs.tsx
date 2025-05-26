'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Employee } from '@/contexts/EmployeeContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EmployeeTabsProps {
  employee: Employee;
}

export default function EmployeeTabs({ employee }: EmployeeTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Generate a random bio
  const bio = `${employee.firstName} ${employee.lastName} is a dedicated professional in the ${employee.department} department with ${Math.floor(Math.random() * 10) + 1} years of experience. They are known for their ${['excellent communication', 'problem-solving abilities', 'leadership skills', 'technical expertise', 'team collaboration'][Math.floor(Math.random() * 5)]}.`;

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'On Hold':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default:
        return '';
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bio</h2>
          <p className="text-muted-foreground mb-6">{bio}</p>
          
          <h3 className="text-lg font-medium mb-3">Performance History</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Communication</span>
                <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
              <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Technical Skills</span>
                <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
              <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Teamwork</span>
                <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
              <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Leadership</span>
                <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
              <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Key Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Completed {Math.floor(Math.random() * 5) + 1} major projects ahead of schedule</li>
            <li>Received {Math.floor(Math.random() * 3) + 1} employee recognition awards</li>
            <li>Improved team productivity by {Math.floor(Math.random() * 30) + 10}%</li>
            <li>Mentored {Math.floor(Math.random() * 5) + 1} junior team members</li>
          </ul>
        </Card>
      </TabsContent>
      
      {/* Projects Tab */}
      <TabsContent value="projects" className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
          
          {employee.projects.length === 0 ? (
            <p className="text-muted-foreground">No projects assigned.</p>
          ) : (
            <div className="space-y-4">
              {employee.projects.map((project) => (
                <div 
                  key={project.id}
                  className="border rounded-lg p-4 transition-all hover:shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge className={cn(getProjectStatusColor(project.status))}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Contribution</span>
                      <span className="text-sm font-medium">{project.contribution}%</span>
                    </div>
                    <Progress value={project.contribution} className="h-2" />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Start Date: {format(new Date(Date.now() - Math.random() * 10000000000), 'PP')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Assign to New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
              >
                <h3 className="font-medium mb-1">Project {String.fromCharCode(90 - index)}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {[
                    'Customer portal redesign',
                    'Automation system integration',
                    'Performance optimization',
                    'Security audit implementation'
                  ][index]}
                </p>
                <Badge variant="outline">
                  {['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]} Priority
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
      
      {/* Feedback Tab */}
      <TabsContent value="feedback" className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Performance Feedback</h2>
            <Badge variant="outline">
              {employee.feedback.length} Reviews
            </Badge>
          </div>
          
          <div className="space-y-4">
            {employee.feedback.map((feedback) => (
              <div 
                key={feedback.id} 
                className="border rounded-lg p-4 transition-all hover:shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{feedback.from}</h3>
                  <Rating value={feedback.rating} size="sm" />
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {feedback.comment}
                </p>
                
                <div className="text-xs text-muted-foreground">
                  Reviewed on {feedback.date}
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Feedback</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rating</label>
              <Rating value={0} readOnly={false} className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Feedback</label>
              <textarea 
                className="w-full mt-1 p-2 border rounded-md h-20 text-sm"
                placeholder="Enter your feedback here..."
              />
            </div>
            
            <Button>Submit Feedback</Button>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}