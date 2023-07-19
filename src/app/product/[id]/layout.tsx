export const metadata = {
    title: 'Pagina de producto',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}
