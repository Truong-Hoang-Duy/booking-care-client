import { AdminHeader } from '@/components/Common';
import { Outlet } from 'react-router-dom';

export interface AdminProps {}

export function Admin(props: AdminProps) {
  return (
    <>
      <AdminHeader />
      <Outlet></Outlet>
    </>
  );
}
