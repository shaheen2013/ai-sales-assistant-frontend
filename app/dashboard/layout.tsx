export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dev">
      {/* content */}
      <div>{children}</div>

      {/* common header */}
    </div>
  );
}
