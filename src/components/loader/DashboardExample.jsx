import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import api from "../../../api/axios"
export default function test() {
  const [data, setData] = useState(null);
  const [error, setError] = useState < string | null > (null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts=async()=>{
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/products")
        setData(response.data);
      } catch {
        setError("Unable to load inventory. please try again.");
      } finally {
        setShowLoader(false);
      }
    }
    loadProducts();
  }, []);
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }
  if (showLoader) {
    return <LoadingScreen loading={isLoading} onFinished={() => setLoading(false)} />;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
