import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};


export const useUTMTracker = (): void => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const utmKeys: (keyof UTMParams)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign'
    ];

    let hasUTM = false;

    utmKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        localStorage.setItem(key, value);
        hasUTM = true;
      }
    });

    if (!hasUTM) {
      utmKeys.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }, [searchParams]);
};