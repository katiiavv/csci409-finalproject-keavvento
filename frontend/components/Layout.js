import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link href="/">Home</Link> | <Link href="/lines">Lines</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
