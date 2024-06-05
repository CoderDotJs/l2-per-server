type TOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  };
  
  type TOptionResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
  };
  
  const calculatePagination = (options: TOptions): TOptionResult => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * Number(limit);
  
    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';
    return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    };
  };
  
  export const paginationHelper = {
    calculatePagination,
  };