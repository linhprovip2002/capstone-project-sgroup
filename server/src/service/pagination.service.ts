class Pagination {
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    
    constructor(users: any[], page: number, limit: number) {
        const totalPages = Math.ceil(users.length / limit);

        if (page && limit) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            this.data = users.slice(startIndex, endIndex);
        } else {
            this.data = users;
        }

        this.pagination = {
          page: page || 1,
          limit: limit || users.length,
          total: totalPages
        };
    }

    paginationData() {
        return {
          data: this.data,
          pagination: this.pagination
        };
    }
}

export default Pagination;
