import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentVisitors } from '@/components/dashboard/RecentVisitors';
import { useVisitorStore } from '@/stores/visitorStore';
import { UserCheck, Users, Calendar, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/types';
import { visitorService } from '@/services/visitorService';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { visitors, fetchVisitors } = useVisitorStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitorsToday: 0,
    activeVisitors: 0,
    totalVisitorsThisMonth: 0,
    totalVisitorsThisWeek: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      await fetchVisitors();
      const statsData = await visitorService.getDashboardStats();
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  const recentVisitors = visitors
    .filter((v) => v.status === 'checked-in')
    .slice(0, 5);

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening today."
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Visitors Today"
            value={stats.totalVisitorsToday}
            icon={UserCheck}
            color="blue"
          />
          <StatsCard
            title="Active Visitors"
            value={stats.activeVisitors}
            icon={Users}
            color="green"
          />
          <StatsCard
            title="This Week"
            value={stats.totalVisitorsThisWeek}
            icon={Calendar}
            color="yellow"
          />
          <StatsCard
            title="This Month"
            value={stats.totalVisitorsThisMonth}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        {/* Recent Visitors */}
        <RecentVisitors
          visitors={recentVisitors}
          onViewAll={() => navigate('/visitors')}
        />
      </div>
    </div>
  );
};
