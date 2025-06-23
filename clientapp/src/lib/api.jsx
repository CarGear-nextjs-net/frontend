import axios from "axios";
import API_BASE_URL from "@/utils/config";
import qs from "qs";
import { PAGESIZE } from "@/utils/constants";
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/categories`);
    return response.data;
  } catch (e) {
    return [];
  }
};
export const fetchFooterData = () => {};
export const fetchHomeData = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/api/home", {
      params: {
        topSale: 6,
      },
    });
    return {
      topSaleProducts: response.data.topSaleProducts || [],
      blogs: response.data.blogs || [],
      categoryWithProducts: response.data.categoryWithProducts || [],
      blogInBanner: response.data.banner || [],
    };
  } catch (e) {
    return {
      topSaleProducts: [],
      blogs: [],
      categoryWithProducts: [],
      blogInBanner: [],
    };
  }
};
export const fetchProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
    return {
      product: response.data.product,
      productRelates: response.data.productRelates,
      recommendedProducts: response.data.recommendedProducts,
    };
  } catch (error) {
    return {
      product: null,
      productRelates: [],
      recommendedProducts: [],
    };
  }
};
export const fetchFilterProduct = async ({
  page,
  pageSize,
  categories,
  brands,
  minPrice,
  maxPrice,
  sortOrder,
}) => {
  const params = {
    page,
    pageSize,
    categories: categories,
    brands: brands,
    minPrice,
    maxPrice,
    sortOrder: sortOrder,
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/ProductListPage/filter`,
      {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      }
    );
    return {
      products: response.data.products,
      totalPages: response.data.totalPages,
    };
  } catch (e) {
    console.error(e);
  }
};

export const fetchDataForFilter = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/ProductListPage/get-data-for-filter`,
      {}
    );
    return {
      groups: response.data.groups,
      brands: response.data.brands,
      sortOrder: response.data.sortOrder,
    };
  } catch (e) {}
};
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs`);
    return response.data;
  } catch (e) {
    return [];
  }
};
export const fetchBlogCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/categories`);
    return response.data;
  } catch (e) {
    return [];
  }
};
export const checkLogin = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
      method: "GET", // hoặc 'POST' nếu cần
      credentials: "include", // gửi cookie
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchProductManager = async (
  page = 1,
  pageSize = 10,
  category = 0
) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/productmanager/products`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        category: category.toString(),
      },
    });
    return {
      products: res.data.products,
      totalItem: res.data.totalItem,
      totalPages: res.data.totalPages,
      page: res.data.page,
      pageSize: res.data.pageSize,
    };
  } catch (e) {
    return {
      products: [],
      totalItem: 0,
      totalPages: 0,
      page: 0,
      pageSize: pageSize,
    };
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/productmanager/create-product`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      return {
        status: 200,
        message: "Product Created Successfully",
        product: response.data.product,
      };
    }
  } catch (e) {
    return {
      status: 401,
      message: e.message,
      error: e,
    };
  }
};
export const apiDetailProductById = async (id) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/productmanager/products/${id}`
    );
    return {
      product: res.data.product,
    };
  } catch (ex) {
    return {
      product: null,
    };
  }
};
export const fetchDemoData = async (name = "") => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/productmanager/demodata`, {
      params: {
        name: name,
      },
    });
    return {
      sku: res.data.sku,
      slug: res.data.slug,
    };
  } catch (error) {
    return {
      sku: "",
      slug: "",
    };
  }
};
export const updateInformationProduct = async (data) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/ProductManager/update-information`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      return {
        status: 200,
        message: "Update information successfully",
        product: res.data.product,
      };
    } else if (res.status === 400) {
      return {
        status: 400,
        message: "Update information failed",
        errors: res.data.errors,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: e.status,
      message: "Update information failed",
      errors: e.response.data.errors,
    };
  }
};
export const updateProductImage = async (data) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/productmanager/update-image`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 200) {
      return {
        status: true,
        message: "Update image successfully",
      };
    }
  } catch (ex) {
    return {
      status: false,
      message: "Update image failed",
      errors: ex.errors,
    };
  }
};
export const saveProductImage = async (data) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/productmanager/create-image`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 200) {
      return {
        status: true,
        message: "Add image successfully",
      };
    }
  } catch (ex) {
    return {
      status: false,
      message: "Add image failed",
      errors: ex.errors,
    };
  }
};
export const deleteProductImage = async (id) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/productmanager/delete-image/${id}`
    );
    if (res.status === 200) {
      return {
        status: true,
        message: "Delete image successfully",
      };
    }
  } catch (ex) {
    return {
      status: ex.status,
      message: "Delete image failed",
      errors: ex.errors,
    };
  }
};

export const fetchContentsManager = async (params) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/ArticleManager/articles`, {
      params: params,
    });

    return {
      data: res.data.articles,
      totalItem: res.data.totalItem,
      totalPages: res.data.totalPages,
      page: res.data.page,
      pageSize: res.data.pageSize,
    };
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
