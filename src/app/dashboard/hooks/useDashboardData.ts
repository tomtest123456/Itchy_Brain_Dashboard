/* 
    /src/app/dashboard/hooks/useDashboardData.ts
    -------------------------------------
    Dashboard Data Hook:
    
    - Single source of truth for all dashboard data
    - Manages data fetching for all dashboard components
    - Handles loading and error states
    - Currently uses mock data, ready for API integration
*/

import { useState, useEffect } from 'react';
import { RawSummaryData, ChartData } from '../data/types';

// Mock data structure - This will be replaced with API calls in the future
const MOCK_DATA = {
    distance: {
        value: 11847,
        unit: 'km'
    },
    average_speed: {
        value: 32.1,
        unit: 'km/h'
    },
    elevation_gain: {
        value: 1500,
        unit: 'm'
    },
    moving_time: {
        value: 120,
        unit: 'min'
    },
    elapsed_time: {
        value: 135,
        unit: 'min'
    },
    max_power: {
        value: 850,
        unit: 'W'
    },
    average_heart_rate: {
        value: 145,
        unit: 'bpm'
    },
    average_cadence: {
        value: 85,
        unit: 'rpm'
    },
    intensity: {
        value: 0.85,
        unit: ''
    },
    calories: {
        value: 750,
        unit: 'kcal'
    }
};

// This will be replaced with actual API endpoint in the future
const API_ENDPOINT = 'your-api-endpoint-here';

interface DashboardData {
    summary: Record<string, RawSummaryData>;
    charts: Record<string, ChartData>;
    isLoading: boolean;
    error: Error | null;
}

export function useDashboardData(): DashboardData {
    const [data, setData] = useState<DashboardData>({
        summary: MOCK_DATA, // Initialize with mock data immediately
        charts: {},
        isLoading: false,  // Start with false since we have mock data
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching dashboard data...');
                setData(prev => ({ ...prev, isLoading: true }));
                
                // In the future, replace this with actual API call:
                // const response = await fetch(API_ENDPOINT);
                // const jsonData = await response.json();
                
                // For now, simulate API call with mock data
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const newData = {
                    summary: MOCK_DATA,
                    charts: {},
                    isLoading: false,
                    error: null
                };

                console.log('Setting dashboard data:', newData);
                setData(newData);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    error: err instanceof Error ? err : new Error('Failed to fetch data')
                }));
            }
        };

        fetchData();

        // Optional: Set up polling for real-time updates
        // const interval = setInterval(fetchData, 60000); // Fetch every minute
        // return () => clearInterval(interval);
    }, []);

    return data;
} 