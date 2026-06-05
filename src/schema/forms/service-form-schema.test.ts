import { describe, expect, it } from 'vitest';

import { serviceFormSchema } from '@/schema/forms/service-form-schema';

describe('serviceFormSchema', () => {
  it('aceita dados de serviço válidos', () => {
    const result = serviceFormSchema.safeParse({
      name: 'Corte',
      description: 'Corte clássico',
      price: 25,
    });

    expect(result.success).toBe(true);
  });

  it('rejeita nomes curtos', () => {
    const result = serviceFormSchema.safeParse({
      name: 'A',
      price: 10,
    });

    expect(result.success).toBe(false);
  });

  it('rejeita nomes com mais de 100 caracteres', () => {
    const result = serviceFormSchema.safeParse({
      name: 'a'.repeat(101),
      price: 10,
    });

    expect(result.success).toBe(false);
  });

  it('rejeita preços ausentes, zero ou negativos', () => {
    const missingResult = serviceFormSchema.safeParse({
      name: 'Corte',
    });
    const zeroResult = serviceFormSchema.safeParse({
      name: 'Corte',
      price: 0,
    });
    const negativeResult = serviceFormSchema.safeParse({
      name: 'Corte',
      price: -5,
    });

    expect(missingResult.success).toBe(false);
    expect(zeroResult.success).toBe(false);
    expect(negativeResult.success).toBe(false);
  });

  it('rejeita descrições com mais de 200 caracteres', () => {
    const result = serviceFormSchema.safeParse({
      name: 'Corte',
      description: 'a'.repeat(201),
      price: 10,
    });

    expect(result.success).toBe(false);
  });

  it('rejeita descrições ausentes ou vazias', () => {
    const missingResult = serviceFormSchema.safeParse({
      name: 'Corte',
      price: 10,
    });
    const emptyResult = serviceFormSchema.safeParse({
      name: 'Corte',
      description: '   ',
      price: 10,
    });

    expect(missingResult.success).toBe(false);
    expect(emptyResult.success).toBe(false);
  });
});
