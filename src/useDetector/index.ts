import { useState, useEffect } from 'react';
import { detector as Detector } from 'lomind';

/**
 * @zh 客户端信息探针
 * @en Client information detector
 */
const useDetector = () => {
  const [detector, setDetector] = useState(null);

  useEffect(() => {
    const det = new Detector();
    setDetector(det);
  }, []);

  return detector;
};

export default useDetector;
