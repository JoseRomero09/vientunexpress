import type { JobErrorKey } from '@/types';

export const SV_PHONE = /^[267]\d{3}-?\d{4}$/;

export const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export const CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];
export const CV_MAX_BYTES = 5 * 1024 * 1024;

export interface JobApplicationValues {
  fullName: string;
  phone1: string;
  phone2: string;
  position: string;
  zone: string;
  cv: File | null;
}

export type JobField = keyof JobApplicationValues;
export type JobErrors = Partial<Record<JobField, JobErrorKey>>;

// Orden en que aparecen los campos: el primero con error recibe el foco.
export const JOB_FIELDS: JobField[] = ['fullName', 'phone1', 'phone2', 'position', 'zone', 'cv'];

const isValidCvType = (file: File) => {
  const name = file.name.toLowerCase();
  // Algunos navegadores entregan type="" para .doc: también se acepta por extensión.
  return CV_TYPES.includes(file.type) || CV_EXTENSIONS.some((ext) => name.endsWith(ext));
};

export function validateJobApplication(values: JobApplicationValues): JobErrors {
  const errors: JobErrors = {};
  const fullName = values.fullName.trim();
  const phone1 = values.phone1.trim();
  const phone2 = values.phone2.trim();

  if (!fullName) errors.fullName = 'required';
  else if (fullName.split(/\s+/).length < 2) errors.fullName = 'fullName';

  if (!phone1) errors.phone1 = 'required';
  else if (!SV_PHONE.test(phone1)) errors.phone1 = 'phone';

  if (phone2 && !SV_PHONE.test(phone2)) errors.phone2 = 'phone';

  if (!values.position) errors.position = 'required';
  if (!values.zone) errors.zone = 'required';

  if (!values.cv) errors.cv = 'required';
  else if (!isValidCvType(values.cv)) errors.cv = 'cvType';
  else if (values.cv.size > CV_MAX_BYTES) errors.cv = 'cvSize';

  return errors;
}
