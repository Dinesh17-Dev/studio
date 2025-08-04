import type { Campaign } from "@/components/dashboard/data-table/columns";

// --- DATA TYPES ---
interface Metric {
  value: number;
  trend: number;
}

interface RevenueDataPoint {
  month: string;
  revenue: number;
}

interface ConversionsDataPoint {
  campaign: string;
  conversions: number;
}

interface TrafficDataPoint {
  source: string;
  visitors: number;
  fill: string;
}

export interface InitialData {
  metrics: {
    revenue: Metric;
    users: Metric;
    conversions: Metric;
    growth: { value: number };
  };
  revenueData: RevenueDataPoint[];
  conversionsData: ConversionsDataPoint[];
  trafficData: TrafficDataPoint[];
  campaignsData: Campaign[];
}

// --- MOCK DATA GENERATION ---

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const initialCampaigns: Campaign[] = [
  { id: "CAM-001", campaignName: "Summer Sale 2024", status: "active", startDate: "2024-06-01", endDate: "2024-08-31", budget: 50000, revenue: 75000 },
  { id: "CAM-002", campaignName: "Q2 Social Push", status: "completed", startDate: "2024-04-01", endDate: "2024-06-30", budget: 25000, revenue: 45000 },
  { id: "CAM-003", campaignName: "Holiday Giveaway", status: "paused", startDate: "2024-11-01", endDate: "2024-12-25", budget: 100000, revenue: 15000 },
  { id: "CAM-004", campaignName: "New Product Launch", status: "active", startDate: "2024-07-15", endDate: "2024-09-15", budget: 75000, revenue: 20000 },
  { id: "CAM-005", campaignName: "Influencer Collab", status: "completed", startDate: "2024-05-10", endDate: "2024-06-10", budget: 30000, revenue: 60000 },
  { id: "CAM-006", campaignName: "Email Nurture Flow", status: "active", startDate: "2024-01-01", endDate: "2024-12-31", budget: 15000, revenue: 35000 },
  { id: "CAM-007", campaignName: "SEO Overhaul", status: "completed", startDate: "2024-02-01", endDate: "2024-05-01", budget: 20000, revenue: 20000 },
  { id: "CAM-008", campaignName: "Back to School", status: "planning", startDate: "2024-08-01", endDate: "2024-09-30", budget: 40000, revenue: 0 },
];

export function generateInitialData(): InitialData {
  return {
    metrics: {
      revenue: { value: 45231.89, trend: 20.1 },
      users: { value: 2350, trend: 12.5 },
      conversions: { value: 1205, trend: 15.2 },
      growth: { value: 32.5 },
    },
    revenueData: [
      { month: "Jan", revenue: random(2000, 4000) },
      { month: "Feb", revenue: random(2500, 4500) },
      { month: "Mar", revenue: random(3000, 5000) },
      { month: "Apr", revenue: random(2800, 5200) },
      { month: "May", revenue: random(3500, 6000) },
      { month: "Jun", revenue: random(4000, 6500) },
      { month: "Jul", revenue: random(4200, 7000) },
      { month: "Aug", revenue: random(4500, 7500) },
      { month: "Sep", revenue: random(4800, 8000) },
      { month: "Oct", revenue: random(5000, 8500) },
      { month: "Nov", revenue: random(5500, 9000) },
      { month: "Dec", revenue: random(6000, 10000) },
    ],
    conversionsData: [
      { campaign: "Summer Sale", conversions: random(200, 500) },
      { campaign: "Social Push", conversions: random(300, 600) },
      { campaign: "Giveaway", conversions: random(100, 300) },
      { campaign: "New Product", conversions: random(400, 800) },
      { campaign: "Influencer", conversions: random(150, 400) },
    ],
    trafficData: [
      { source: "Organic", visitors: random(2000, 3000), fill: "hsl(var(--chart-1))" },
      { source: "Social", visitors: random(1500, 2500), fill: "hsl(var(--chart-2))" },
      { source: "Paid", visitors: random(1000, 2000), fill: "hsl(var(--chart-3))" },
      { source: "Direct", visitors: random(800, 1500), fill: "hsl(var(--chart-4))" },
      { source: "Referral", visitors: random(300, 800), fill: "hsl(var(--chart-5))" },
    ],
    campaignsData: initialCampaigns,
  };
}

// --- REAL-TIME DATA SIMULATION ---

export function updateData(prevData: InitialData): InitialData {
  const newRevenue = prevData.metrics.revenue.value + random(100, 500);
  const newUsers = prevData.metrics.users.value + random(5, 20);
  const newConversions = prevData.metrics.conversions.value + random(1, 10);

  const updatedRevenueData = [...prevData.revenueData];
  const currentMonthIndex = new Date().getMonth();
  updatedRevenueData[currentMonthIndex].revenue += random(100, 500);

  const updatedCampaigns = prevData.campaignsData.map(c => {
    if (c.status === 'active') {
      return { ...c, revenue: c.revenue + random(50, 250) };
    }
    return c;
  });

  return {
    ...prevData,
    metrics: {
      ...prevData.metrics,
      revenue: { ...prevData.metrics.revenue, value: newRevenue },
      users: { ...prevData.metrics.users, value: newUsers },
      conversions: { ...prevData.metrics.conversions, value: newConversions },
    },
    revenueData: updatedRevenueData,
    campaignsData: updatedCampaigns,
  };
}
