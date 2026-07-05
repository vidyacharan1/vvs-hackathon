"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "./client";
import type {
  DistrictDashboard,
  FacilityResponse,
  InventoryAlert,
  AlertFeed,
  AIDistrictBrief,
  PatientResponse,
  DoctorResponse,
  NurseResponse,
  DiseaseSpike,
  HealthTrend,
  VillageCondition,
} from "./client";

function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const hasLoaded = useRef(false);

  const doFetch = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetcherRef.current();
      setData(result);
      setError(null);
      hasLoaded.current = true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hasLoaded.current = false;
    doFetch();
  }, [doFetch]);

  return { data, loading: loading && !hasLoaded.current, error, refetch: doFetch };
}

export function useDistrictDashboard() {
  return useFetch(() => api.dashboard.getEnriched());
}

export function useFacilities() {
  return useFetch(async () => {
    const result = await api.facilities.list();
    return Array.isArray(result) ? result : [];
  });
}

export function useFacilityDetail(id: string | undefined) {
  return useFetch(async () => {
    if (!id) return null;
    return api.facilities.detail(id);
  });
}

export function useInventoryAlerts() {
  return useFetch(async () => {
    const result = await api.inventory.alerts();
    return Array.isArray(result) ? result : [];
  });
}

export function useInventoryStock() {
  return useFetch(async () => {
    const result = await api.inventory.stock();
    return Array.isArray(result) ? result : [];
  });
}

export function useAlertFeed() {
  return useFetch(async () => {
    const result = await api.alerts.feed();
    return Array.isArray(result) ? result : [];
  });
}

export function useAIDistrictBrief() {
  const [data, setData] = useState<AIDistrictBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api.ai.districtBrief();
      setData(result);
      setError(null);
      return result;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate brief");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, generate };
}

export function usePatients() {
  return useFetch(async () => {
    const result = await api.patients.list();
    return Array.isArray(result) ? result : [];
  });
}

export function usePatientDetail(id: string | undefined) {
  return useFetch(async () => {
    if (!id) return null;
    return api.patients.detail(id);
  });
}

export function useDoctors() {
  return useFetch(async () => {
    const result = await api.doctors.list();
    return Array.isArray(result) ? result : [];
  });
}

export function useDoctorDetail(id: string | undefined) {
  return useFetch(async () => {
    if (!id) return null;
    return api.doctors.detail(id);
  });
}

export function useNurses() {
  return useFetch(async () => {
    const result = await api.nurses.list();
    return Array.isArray(result) ? result : [];
  });
}

export function useNurseDetail(id: string | undefined) {
  return useFetch(async () => {
    if (!id) return null;
    return api.nurses.detail(id);
  });
}

export function useDiseaseSpikes() {
  return useFetch(async () => {
    const result = await api.diseaseTrends.spikes();
    return Array.isArray(result) ? result : [];
  });
}

export function useHealthTrends() {
  return useFetch(async () => {
    const result = await api.diseaseTrends.healthTrends();
    return Array.isArray(result) ? result : [];
  });
}

export function useVillageConditions() {
  return useFetch(async () => {
    const result = await api.diseaseTrends.villages();
    return Array.isArray(result) ? result : [];
  });
}
