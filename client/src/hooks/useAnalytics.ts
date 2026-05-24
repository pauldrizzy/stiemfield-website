import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface LeadData {
  email: string;
  name?: string;
  company?: string;
  service_interest?: string;
  message?: string;
  lead_source: string;
}

export const useAnalytics = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string | null>(null);

  // Initialize session and visitor tracking
  useEffect(() => {
    const initializeSession = async () => {
      // Generate or retrieve session ID from localStorage
      let storedSessionId = localStorage.getItem('stiemfield_session_id');
      
      if (!storedSessionId) {
        storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('stiemfield_session_id', storedSessionId);
      }
      
      setSessionId(storedSessionId);

      // Get visitor info
      try {
        const userAgent = navigator.userAgent;
        const deviceType = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';
        const referrer = document.referrer || 'direct';

        // Check if visitor already exists
        const { data: existingVisitor } = await supabase
          .from('visitors')
          .select('id')
          .eq('session_id', storedSessionId)
          .single();

        if (existingVisitor) {
          setVisitorId(existingVisitor.id);
          // Update last visit
          await supabase
            .from('visitors')
            .update({
              last_visit: new Date().toISOString(),
              visit_count: (existingVisitor.visit_count || 0) + 1,
            })
            .eq('id', existingVisitor.id);
        } else {
          // Create new visitor record
          const { data: newVisitor, error } = await supabase
            .from('visitors')
            .insert({
              session_id: storedSessionId,
              user_agent: userAgent,
              device_type: deviceType,
              referrer: referrer,
              first_visit: new Date().toISOString(),
              last_visit: new Date().toISOString(),
            })
            .select('id')
            .single();

          if (newVisitor) {
            setVisitorId(newVisitor.id);
          }
        }
      } catch (error) {
        console.error('Error initializing visitor:', error);
      }
    };

    initializeSession();
  }, []);

  // Track page view
  useEffect(() => {
    if (!visitorId) return;

    const trackPageView = async () => {
      try {
        await supabase.from('page_views').insert({
          visitor_id: visitorId,
          page_path: window.location.pathname,
          page_title: document.title,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [visitorId, window.location.pathname]);

  // Track service interest
  const trackServiceInterest = useCallback(
    async (serviceName: string, actionType: string) => {
      if (!visitorId) return;

      try {
        await supabase.from('service_interests').insert({
          visitor_id: visitorId,
          service_name: serviceName,
          action_type: actionType,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error tracking service interest:', error);
      }
    },
    [visitorId]
  );

  // Track lead submission
  const trackLead = useCallback(
    async (leadData: LeadData) => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert({
            visitor_id: visitorId,
            email: leadData.email,
            name: leadData.name || null,
            company: leadData.company || null,
            service_interest: leadData.service_interest || null,
            message: leadData.message || null,
            lead_source: leadData.lead_source,
            status: 'new',
            timestamp: new Date().toISOString(),
          })
          .select('id')
          .single();

        if (error) {
          console.error('Error tracking lead:', error);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Error tracking lead:', error);
        return null;
      }
    },
    [visitorId]
  );

  // Track conversion (Fieldscan booking, call scheduled, etc.)
  const trackConversion = useCallback(
    async (conversionType: string, valueUsd?: number, details?: Record<string, any>) => {
      if (!visitorId) return;

      try {
        await supabase.from('conversions').insert({
          visitor_id: visitorId,
          conversion_type: conversionType,
          value_usd: valueUsd || null,
          details: details || null,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error tracking conversion:', error);
      }
    },
    [visitorId]
  );

  // Track premium content download
  const trackContentDownload = useCallback(
    async (contentId: string, contentTitle: string, email: string) => {
      try {
        await supabase.from('content_downloads').insert({
          visitor_id: visitorId,
          email: email,
          content_id: contentId,
          content_title: contentTitle,
          download_timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error tracking content download:', error);
      }
    },
    [visitorId]
  );

  return {
    sessionId,
    visitorId,
    trackServiceInterest,
    trackLead,
    trackConversion,
    trackContentDownload,
  };
};
