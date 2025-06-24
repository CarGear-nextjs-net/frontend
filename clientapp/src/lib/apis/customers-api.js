export const fetchUsersManager = async (params) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/UserManager/users/role`, {
        params: params,
      });
  
      return res;
    } catch (e) {
      return {
        data: [],
        totalItem: 0,
        totalPages: 0,
        page: 0,
        pageSize: PAGESIZE,
      };
    }
  };