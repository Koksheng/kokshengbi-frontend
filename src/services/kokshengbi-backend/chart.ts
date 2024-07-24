// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/Chart/addChart */
export async function postChartAddChart(
  body: API.CreateChartRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/Chart/addChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Chart/deleteChart */
export async function postChartDeleteChart(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/Chart/deleteChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Chart/getChartById */
export async function getChartGetChartById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartGetChartByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ChartSafetyResponseBaseResponse>('/api/Chart/getChartById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Chart/listChartByPage/list/page */
export async function getChartListChartByPageListPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartListChartByPageListPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ChartSafetyResponsePaginatedListBaseResponse>(
    '/api/Chart/listChartByPage/list/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/Chart/updateChart */
export async function postChartUpdateChart(
  body: API.UpdateChartRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/Chart/updateChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
