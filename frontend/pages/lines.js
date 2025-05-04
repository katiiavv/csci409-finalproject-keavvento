import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Lines() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/lines/', {
      auth: {
        username: 'admin',
        password: 'admin123'
      }
    })
    .then(res => setLines(res.data.Lines))
    .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h2>Metro Lines</h2>
      <ul>
        {lines.map(line => (
          <li key={line.LineCode}>
            <Link href={`/stations/${line.LineCode}`}>{line.DisplayName}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
