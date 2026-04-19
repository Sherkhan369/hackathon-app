import { {{ModelName}} } from '../models/{{resourceName}}.model';
import { Create{{ResourceName}}Input, Update{{ResourceName}}Input } from '../validators/{{resourceName}}.validator';
import { NotFoundError, ConflictError } from '../utils/errors';

export const {{serviceName}} = {
  async list(options: {
    page: number;
    limit: number;
    sort?: string;
    filter?: any;
  }) {
    const { page, limit, sort, filter } = options;
    const skip = (page - 1) * limit;

    // Build query
    const query = filter ? { ...filter } : {};

    // Execute query
    const [items, total] = await Promise.all([
      {{ModelName}}.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort || '-createdAt')
        .lean(),
      {{ModelName}}.countDocuments(query)
    ]);

    return {
      items,
      page,
      limit,
      total
    };
  },

  async getById(id: string) {
    const {{resourceName}} = await {{ModelName}}.findById(id);

    if (!{{resourceName}}) {
      throw new NotFoundError('{{ResourceName}}');
    }

    return {{resourceName}};
  },

  async create(data: Create{{ResourceName}}Input) {
    // Check for duplicates if needed
    // const existing = await {{ModelName}}.findOne({ field: data.field });
    // if (existing) {
    //   throw new ConflictError('{{ResourceName}} already exists');
    // }

    const {{resourceName}} = await {{ModelName}}.create(data);
    return {{resourceName}};
  },

  async update(id: string, data: Update{{ResourceName}}Input) {
    const {{resourceName}} = await {{ModelName}}.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!{{resourceName}}) {
      throw new NotFoundError('{{ResourceName}}');
    }

    return {{resourceName}};
  },

  async delete(id: string) {
    const {{resourceName}} = await {{ModelName}}.findByIdAndDelete(id);

    if (!{{resourceName}}) {
      throw new NotFoundError('{{ResourceName}}');
    }

    return {{resourceName}};
  }
};
