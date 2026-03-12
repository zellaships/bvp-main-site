/**
 * Form Validation Utilities
 *
 * Reusable validation functions for forms across the site.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email' };
  }

  return { isValid: true };
}

/**
 * Validates a required text field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
}

/**
 * Validates a US zip code (5 digits or 5+4 format)
 */
export function validateZipCode(zip: string): ValidationResult {
  if (!zip.trim()) {
    return { isValid: false, error: 'Zip code is required' };
  }

  const zipRegex = /^\d{5}(-\d{4})?$/;
  if (!zipRegex.test(zip)) {
    return { isValid: false, error: 'Please enter a valid zip code' };
  }

  return { isValid: true };
}

/**
 * Validates a phone number (flexible US format)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone.trim()) {
    return { isValid: true }; // Phone is optional
  }

  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  if (digits.length < 10 || digits.length > 11) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
}

/**
 * Newsletter form validation
 */
export interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode?: string;
}

export interface NewsletterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export function validateNewsletterForm(data: NewsletterFormData): {
  isValid: boolean;
  errors: NewsletterFormErrors;
} {
  const errors: NewsletterFormErrors = {};

  const firstNameResult = validateRequired(data.firstName, 'First name');
  if (!firstNameResult.isValid) {
    errors.firstName = firstNameResult.error;
  }

  const lastNameResult = validateRequired(data.lastName, 'Last name');
  if (!lastNameResult.isValid) {
    errors.lastName = lastNameResult.error;
  }

  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Contact form validation
 */
export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  topic?: string;
  message?: string;
}

export interface ContactFormErrors {
  email?: string;
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};

  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
