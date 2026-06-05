import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '@/api/api';
import {
  createService,
  deleteService,
  fetchServices,
  updateService,
} from '@/services/service-service';

vi.mock('@/api/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockService = {
  id: '1',
  name: 'Corte',
  description: 'Corte clássico',
  price: 25,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('service-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('busca a lista de serviços', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        success: true,
        limit: 10,
        offset: 0,
        total: 1,
        rows: [mockService],
      },
    });

    const services = await fetchServices();

    expect(api.get).toHaveBeenCalledWith('/api/v2/services');
    expect(services).toEqual([mockService]);
  });

  it('cria um serviço', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { success: true, data: mockService },
    });

    const payload = {
      name: 'Corte',
      description: 'Corte clássico',
      price: 25,
    };

    const service = await createService(payload);

    expect(api.post).toHaveBeenCalledWith('/api/v2/services', payload);
    expect(service).toEqual(mockService);
  });

  it('atualiza um serviço', async () => {
    vi.mocked(api.put).mockResolvedValue({
      data: { success: true, data: mockService },
    });

    const payload = {
      name: 'Corte',
      price: 30,
    };

    const service = await updateService('1', payload);

    expect(api.put).toHaveBeenCalledWith('/api/v2/services/1', payload);
    expect(service).toEqual(mockService);
  });

  it('exclui um serviço', async () => {
    vi.mocked(api.delete).mockResolvedValue({});

    await deleteService('1');

    expect(api.delete).toHaveBeenCalledWith('/api/v2/services/1');
  });
});
