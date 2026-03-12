import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateRequired,
  validateZipCode,
  validatePhone,
  validateNewsletterForm,
  validateContactForm,
} from '@/lib/validation';

describe('validateEmail', () => {
  it('returns error for empty email', () => {
    expect(validateEmail('')).toEqual({
      isValid: false,
      error: 'Email is required',
    });
  });

  it('returns error for whitespace-only email', () => {
    expect(validateEmail('   ')).toEqual({
      isValid: false,
      error: 'Email is required',
    });
  });

  it('returns error for invalid email format', () => {
    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@at.com',
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toEqual({
        isValid: false,
        error: 'Please enter a valid email',
      });
    });
  });

  it('validates correct email formats', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@gmail.com',
      'test123@subdomain.domain.co.uk',
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toEqual({ isValid: true });
    });
  });
});

describe('validateRequired', () => {
  it('returns error for empty string', () => {
    expect(validateRequired('', 'First name')).toEqual({
      isValid: false,
      error: 'First name is required',
    });
  });

  it('returns error for whitespace-only string', () => {
    expect(validateRequired('   ', 'Last name')).toEqual({
      isValid: false,
      error: 'Last name is required',
    });
  });

  it('validates non-empty strings', () => {
    expect(validateRequired('John', 'First name')).toEqual({ isValid: true });
    expect(validateRequired('  Jane  ', 'First name')).toEqual({ isValid: true });
  });
});

describe('validateZipCode', () => {
  it('returns error for empty zip', () => {
    expect(validateZipCode('')).toEqual({
      isValid: false,
      error: 'Zip code is required',
    });
  });

  it('validates 5-digit zip codes', () => {
    expect(validateZipCode('12345')).toEqual({ isValid: true });
    expect(validateZipCode('00000')).toEqual({ isValid: true });
    expect(validateZipCode('99999')).toEqual({ isValid: true });
  });

  it('validates 5+4 format zip codes', () => {
    expect(validateZipCode('12345-6789')).toEqual({ isValid: true });
  });

  it('rejects invalid zip codes', () => {
    const invalidZips = ['1234', '123456', 'abcde', '12345-', '12345-678'];

    invalidZips.forEach((zip) => {
      expect(validateZipCode(zip)).toEqual({
        isValid: false,
        error: 'Please enter a valid zip code',
      });
    });
  });
});

describe('validatePhone', () => {
  it('allows empty phone (optional field)', () => {
    expect(validatePhone('')).toEqual({ isValid: true });
    expect(validatePhone('   ')).toEqual({ isValid: true });
  });

  it('validates 10-digit phone numbers', () => {
    expect(validatePhone('1234567890')).toEqual({ isValid: true });
    expect(validatePhone('(123) 456-7890')).toEqual({ isValid: true });
    expect(validatePhone('123-456-7890')).toEqual({ isValid: true });
    expect(validatePhone('123.456.7890')).toEqual({ isValid: true });
  });

  it('validates 11-digit phone numbers (with country code)', () => {
    expect(validatePhone('11234567890')).toEqual({ isValid: true });
    expect(validatePhone('+1 (123) 456-7890')).toEqual({ isValid: true });
  });

  it('rejects invalid phone numbers', () => {
    expect(validatePhone('123')).toEqual({
      isValid: false,
      error: 'Please enter a valid phone number',
    });
    expect(validatePhone('123456789012')).toEqual({
      isValid: false,
      error: 'Please enter a valid phone number',
    });
  });
});

describe('validateNewsletterForm', () => {
  it('returns all errors for empty form', () => {
    const result = validateNewsletterForm({
      firstName: '',
      lastName: '',
      email: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.firstName).toBe('First name is required');
    expect(result.errors.lastName).toBe('Last name is required');
    expect(result.errors.email).toBe('Email is required');
  });

  it('validates a complete valid form', () => {
    const result = validateNewsletterForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('catches invalid email in otherwise valid form', () => {
    const result = validateNewsletterForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.firstName).toBeUndefined();
    expect(result.errors.lastName).toBeUndefined();
    expect(result.errors.email).toBe('Please enter a valid email');
  });
});

describe('validateContactForm', () => {
  it('returns error for missing email', () => {
    const result = validateContactForm({ email: '' });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Email is required');
  });

  it('returns error for invalid email', () => {
    const result = validateContactForm({ email: 'notvalid' });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Please enter a valid email');
  });

  it('validates form with only email required', () => {
    const result = validateContactForm({
      email: 'test@example.com',
      // firstName, lastName, topic, message all optional
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
