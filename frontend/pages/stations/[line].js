import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Stations() {
  const router = useRouter();
  const { line } = router.query;
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (line) {
      axios.get(`http://localhost:8000/stations/${line}`, {
        auth: {
          username: 'admin',
          password: 'admin123'
        }
      })
      .then(res => setStations(res.data.Stations))
      .catch(err => console.error(err));
    }
  }, [line]);

  return (
    <Layout>
      <h2>Stations on Line {line}</h2>
      <ul>
        {stations.map(station => (
          <li key={station.Code}>
            <Link href={`/station/${station.Code}`}>{station.Name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
