import { MobileShell, UserPill } from '@/components/shell/mobile-shell';
import { OpsDashboard } from '@/components/shell/dashboard';

export default function Home() {
  return <MobileShell><div className="mb-4"><UserPill /></div><OpsDashboard /></MobileShell>;
}
