export { api } from "./client";
export type {
  DistrictDashboard,
  FacilityResponse,
  InventoryAlert,
  AlertFeed,
  AIDistrictBrief,
  PatientResponse,
  DoctorResponse,
  NurseResponse,
  MedicineResponse,
  InsightResponse,
  DiseaseSpike,
  HealthTrend,
  VillageCondition,
} from "./client";

export {
  useDistrictDashboard,
  useFacilities,
  useFacilityDetail,
  useInventoryAlerts,
  useAlertFeed,
  useAIDistrictBrief,
  usePatients,
  usePatientDetail,
  useDoctors,
  useDoctorDetail,
  useNurses,
  useNurseDetail,
  useDiseaseSpikes,
  useHealthTrends,
  useVillageConditions,
} from "./hooks";
