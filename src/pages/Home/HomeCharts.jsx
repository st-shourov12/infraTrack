import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Heading from '../../components/Shared/Heading';

const HomeCharts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allIssues = [] } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues`);
      return res.data;
    },
  });

  const pendingIssue = allIssues.filter(p => p.status === 'pending');
  const resolvedIssue = allIssues.filter(p => p.status === 'resolved');
  const closedIssue = allIssues.filter(p => p.status === 'closed');
  const inProgressIssue = allIssues.filter(p => p.status === 'in-progress');
  const rejectedIssue = allIssues.filter(p => p.status === 'rejected');

  // Prepare data for bar chart
  const issueStatusData = [
    { name: 'Pending', value: pendingIssue.length, fill: '#f59e0b' },
    { name: 'In Progress', value: inProgressIssue.length, fill: '#f97316' },
    { name: 'Resolved', value: resolvedIssue.length, fill: '#22c55e' },
    { name: 'Closed', value: closedIssue.length, fill: '#10b981' },
    { name: 'Rejected', value: rejectedIssue.length, fill: '#ef4444' },
  ].filter(item => item.value > 0); // Only show statuses with issues

  const hasData = issueStatusData.length > 0;

  return (
    <div>
      <div className=" rounded-lg shadow py-5">
        <Heading center={true} title="Issue Statistics" subtitle="Explore issue status, know the activity of our community " ></Heading>

        {hasData ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={issueStatusData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="value"
                name="Number of Issues"
                radius={[8, 8, 0, 0]}
              >
                {issueStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No issue data available
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeCharts;