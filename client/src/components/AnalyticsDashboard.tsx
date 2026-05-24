import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardMetrics {
  totalVisitors: number;
  totalLeads: number;
  totalConversions: number;
  totalContentDownloads: number;
  conversionRate: number;
  serviceInterestBreakdown: Record<string, number>;
  leadStatusBreakdown: Record<string, number>;
  topReferrers: Array<{ referrer: string; count: number }>;
}

export const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalVisitors: 0,
    totalLeads: 0,
    totalConversions: 0,
    totalContentDownloads: 0,
    conversionRate: 0,
    serviceInterestBreakdown: {},
    leadStatusBreakdown: {},
    topReferrers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);

        // Fetch total visitors
        const { count: visitorsCount } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true });

        // Fetch total leads
        const { count: leadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        // Fetch total conversions
        const { count: conversionsCount } = await supabase
          .from('conversions')
          .select('*', { count: 'exact', head: true });

        // Fetch total content downloads
        const { count: downloadsCount } = await supabase
          .from('content_downloads')
          .select('*', { count: 'exact', head: true });

        // Fetch service interest breakdown
        const { data: serviceInterestData } = await supabase
          .from('service_interests')
          .select('service_name');

        const serviceBreakdown: Record<string, number> = {};
        serviceInterestData?.forEach((item) => {
          serviceBreakdown[item.service_name] = (serviceBreakdown[item.service_name] || 0) + 1;
        });

        // Fetch lead status breakdown
        const { data: leadStatusData } = await supabase
          .from('leads')
          .select('status');

        const statusBreakdown: Record<string, number> = {};
        leadStatusData?.forEach((item) => {
          statusBreakdown[item.status] = (statusBreakdown[item.status] || 0) + 1;
        });

        // Fetch top referrers
        const { data: referrerData } = await supabase
          .from('visitors')
          .select('referrer');

        const referrerCounts: Record<string, number> = {};
        referrerData?.forEach((item) => {
          if (item.referrer && item.referrer !== 'direct') {
            referrerCounts[item.referrer] = (referrerCounts[item.referrer] || 0) + 1;
          }
        });

        const topReferrers = Object.entries(referrerCounts)
          .map(([referrer, count]) => ({ referrer, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Calculate conversion rate
        const conversionRate = visitorsCount ? ((leadsCount || 0) / visitorsCount) * 100 : 0;

        setMetrics({
          totalVisitors: visitorsCount || 0,
          totalLeads: leadsCount || 0,
          totalConversions: conversionsCount || 0,
          totalContentDownloads: downloadsCount || 0,
          conversionRate: Math.round(conversionRate * 100) / 100,
          serviceInterestBreakdown: serviceBreakdown,
          leadStatusBreakdown: statusBreakdown,
          topReferrers,
        });

        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    // Refresh metrics every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalVisitors}</div>
            <p className="text-xs text-muted-foreground">All-time visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">Contact inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalConversions}</div>
            <p className="text-xs text-muted-foreground">Fieldscan bookings & calls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Visitors to leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Content Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalContentDownloads}</div>
            <p className="text-xs text-muted-foreground">Premium resources</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Interest Breakdown</CardTitle>
            <CardDescription>Interests by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(metrics.serviceInterestBreakdown).length > 0 ? (
                Object.entries(metrics.serviceInterestBreakdown).map(([service, count]) => (
                  <div key={service} className="flex justify-between items-center">
                    <span className="text-sm">{service}</span>
                    <span className="font-semibold">{count} interests</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Status Breakdown</CardTitle>
            <CardDescription>Leads by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(metrics.leadStatusBreakdown).length > 0 ? (
                Object.entries(metrics.leadStatusBreakdown).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{status}</span>
                    <span className="font-semibold">{count} leads</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Traffic Sources</CardTitle>
          <CardDescription>Where your visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.topReferrers.length > 0 ? (
              metrics.topReferrers.map(({ referrer, count }) => (
                <div key={referrer} className="flex justify-between items-center">
                  <span className="text-sm">{referrer}</span>
                  <span className="font-semibold">{count} visits</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No external referrers yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
