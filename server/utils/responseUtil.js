export const errorResponse = (message) => ({
  status: 0,
  message,
  data: null,
  pagination: null,
});


export const successResponse = (message, data = [], paginate = null) => {
  const response = {
    status: 1,
    message,
    data,
  };

  if (paginate) {
    response.pagination = {
        current_page: paginate.currentPage || paginate.page || 1,
        per_page: paginate.perPage || paginate.limit || 15,
        total: paginate.total || 0,
        last_page: paginate.lastPage || Math.ceil((paginate.total || 0) / (paginate.perPage || 15)) || 1,
        has_more_pages: (paginate.hasMorePages || (paginate.page < Math.ceil((paginate.total || 0) / (paginate.perPage || 15)))) ? 1 : 0
    };
  }

  return response;
};