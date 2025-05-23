import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Departments | AI Sales Assistant',
  description: 'Management',
  icons: {
    icon: '/icons/favicon.ico',
  },
};

const ManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ManagementLayout;
