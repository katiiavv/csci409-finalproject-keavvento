import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StationInfo() {
  const router = useRouter();
  const { station_code } = router.query;

  const [info, setInfo] = useState(null);
  const [timings, setTimings] = useState(null);

  useEffect(() => {
    if (station_code) {
      // Fetch station info
      axios.get(`http://localhost:8000/station/${station_code}`, {
        auth: { username: 'admin', password: 'admin123' }
      })
      .then(res => setInfo(res.data))
      .catch(err => console.error('Station Info Error:', err));

      // Fetch station timings (extra credit)
      axios.get(`http://localhost:8000/station/${station_code}/timings`, {
        auth: { username: 'admin', password: 'admin123' }
      })
      .then(res => setTimings(res.data.StationTimes))
      .catch(err => console.error('Timings Error:', err));
    }
  }, [station_code]);

  return (
    <Layout>
      <h2>Station Details: {station_code}</h2>

      {info ? (
        <div>
          <p><strong>Name:</strong> {info.Name}</p>
          <p><strong>Address:</strong> {info.Address?.Street}, {info.Address?.City}, {info.Address?.State} {info.Address?.Zip}</p>
        </div>
      ) : (
        <p>Loading station info...</p>
      )}

      {timings ? (
        <>
          <h3>Station Timings</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Day</th><th>Open</th><th>Close</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(timings).map(([day, times]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{times.OpenTime}</td>
                  <td>{times.CloseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading station timings...</p>
      )}
    </Layout>
  );
}
