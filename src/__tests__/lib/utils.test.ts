import { describe, it, expect } from 'vitest';
import { cn, formatDate, truncate, slugify } from '@/lib/utils';

describe('cn (className merge)', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles arrays', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
  });

  it('handles objects', () => {
    expect(cn({ 'px-4': true, 'py-2': true, 'hidden': false })).toBe('px-4 py-2');
  });

  it('handles undefined and null', () => {
    expect(cn('px-4', undefined, null, 'py-2')).toBe('px-4 py-2');
  });
});

describe('formatDate', () => {
  it('formats date string with timezone', () => {
    // Using UTC midnight to avoid timezone issues
    const result = formatDate('2026-03-11T12:00:00Z');
    expect(result).toContain('March');
    expect(result).toContain('2026');
  });

  it('formats Date object', () => {
    // Create date in a way that's timezone-safe
    const date = new Date(2026, 0, 15); // January 15, 2026 (local time)
    expect(formatDate(date)).toBe('January 15, 2026');
  });

  it('handles different date formats', () => {
    expect(formatDate('2025-12-25T12:00:00Z')).toContain('December');
    expect(formatDate('2025-12-25T12:00:00Z')).toContain('2025');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns original string if shorter than length', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('returns original string if equal to length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('handles empty strings', () => {
    expect(truncate('', 5)).toBe('');
  });

  it('handles length of 0', () => {
    expect(truncate('Hello', 0)).toBe('...');
  });
});

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with dashes', () => {
    expect(slugify('this is a test')).toBe('this-is-a-test');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('removes leading and trailing dashes', () => {
    expect(slugify('--hello--')).toBe('hello');
  });

  it('handles multiple spaces and special chars', () => {
    expect(slugify('  Black   Veterans   Project!  ')).toBe('black-veterans-project');
  });

  it('handles numbers', () => {
    expect(slugify('Post 911 Veterans')).toBe('post-911-veterans');
  });
});
