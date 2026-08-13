// ============================================
// BASE URL
// ============================================

// new url for api2
export const BASE_URL =
  "https://api2.thekapc.com";


// ============================================
// API ENDPOINTS
// ============================================

export const API = {

  LOGIN:
    `${BASE_URL}/api/auth/login`,

  CLINICS:
    `${BASE_URL}/api/clinics`,

  DOCTORS:
    `${BASE_URL}/api/doctor`,

  PATIENTS:
    `${BASE_URL}/api/clinic/patients`,

  SEARCH_PATIENT:
    `${BASE_URL}/api/clinic/patients/search`,

  PATIENT_FILE:
    `${BASE_URL}/api/clinic/patients`,

  ATTENDANCE:
    `${BASE_URL}/api/clinic/patients/attendance`,

  RECHARGE:
    `${BASE_URL}/api/clinic/patients/recharge`,

  APPOINTMENT:
    `${BASE_URL}/api/appointment/create`

};