export function CustomEventWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col bg-red-500">{children}</div>;
}
