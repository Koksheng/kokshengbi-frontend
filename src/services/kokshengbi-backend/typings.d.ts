declare namespace API {
  type AdminPageUserSafetyResponse = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
    token?: string;
  };

  type AdminPageUserSafetyResponsePaginatedList = {
    items?: AdminPageUserSafetyResponse[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type AdminPageUserSafetyResponsePaginatedListBaseResponse = {
    code?: number;
    data?: AdminPageUserSafetyResponsePaginatedList;
    message?: string;
    description?: string;
  };

  type ChartSafetyResponse = {
    id?: number;
    goal?: string;
    chartData?: string;
    chartName?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartSafetyResponseBaseResponse = {
    code?: number;
    data?: ChartSafetyResponse;
    message?: string;
    description?: string;
  };

  type ChartSafetyResponsePaginatedList = {
    items?: ChartSafetyResponse[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type ChartSafetyResponsePaginatedListBaseResponse = {
    code?: number;
    data?: ChartSafetyResponsePaginatedList;
    message?: string;
    description?: string;
  };

  type CreateChartRequest = {
    chartName?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getChartGetChartByIdParams = {
    id?: number;
  };

  type getChartListChartByPageListPageParams = {
    id?: number;
    goal?: string;
    chartName?: string;
    chartType?: string;
    userId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type getUserListUserByPageListPageParams = {
    id?: number;
    userName?: string;
    userAccount?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type Int32BaseResponse = {
    code?: number;
    data?: number;
    message?: string;
    description?: string;
  };

  type UpdateChartRequest = {
    id?: number;
    goal?: string;
    chartData?: string;
    chartName?: string;
    chartType?: string;
  };

  type UpdateUserRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserSafetyResponse = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    token?: string;
  };

  type UserSafetyResponseBaseResponse = {
    code?: number;
    data?: UserSafetyResponse;
    message?: string;
    description?: string;
  };
}
