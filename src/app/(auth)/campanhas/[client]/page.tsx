'use client';

import { useParams } from 'next/navigation';
import { Campaigns } from '@/features/campaigns';

const CampaignsPage = () => {
  const params = useParams();
  const client = params?.client as 'meta' | 'google';

  return <Campaigns platform={client} />;
};

export default CampaignsPage;
