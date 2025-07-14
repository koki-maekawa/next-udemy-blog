import PrivateHeader from "@/components/layouts/PrivateHader";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
return (
    <>
        <PrivateHeader />
        {children}
    </>
  )
}
