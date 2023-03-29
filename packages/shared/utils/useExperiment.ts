import { useState, useEffect } from 'react';
import { ABTest } from '@sentry-static/shared/utils/ab-testing';
function useExperiment(experiment: ABTest) {
  const [experimentValue, setExperimentValue] = useState(experiment.default);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const variant = await experiment.getVariant();
      await experiment.logExposure(variant);
      setExperimentValue(variant);
      setLoading(false);
    }
    load();
  }, []);

  return [experimentValue, loading];
}

export default useExperiment;
