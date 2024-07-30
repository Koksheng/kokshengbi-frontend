import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getChartListChartByPageListPage } from '@/services/kokshengbi-backend/chart';
import { Avatar, List, message } from 'antd';
import { getInitialState } from '@/app';
import { useModel } from '@umijs/max';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    pageSize: 12,
  }

  const [searchParams, setSearchParams] = useState<API.getChartListChartByPageListPageParams>({...initSearchParams});
  const { initialState, setInitialState } = useModel('@@initialState');
  const {loginUser} = initialState ?? {};
  const [chartList, setChartList] = useState<API.ChartSafetyResponse[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getChartListChartByPageListPage(searchParams);
      if(res.data){
        setChartList(res.data.items ?? []);
        setTotal(res.data.totalCount ?? 0);
      }else{
        message.error('Get My Chart Failed.');
      }
    } catch (e: any){
      message.error('Get My Chart Failed. ' + e.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart=page">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: searchParams.pageSize,
        }}
        loading={loading}
        dataSource={chartList}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <List.Item.Meta
              avatar={<Avatar src={loginUser?.userAvatar} />}
              title={item.chartName}
              description={item.chartType ? ('Chart Type: ' + item.chartType) : undefined}
            />
            {'Analysis Goal: ' + item.goal}
            <ReactECharts option={JSON.parse(item.genChart?.replace(';', '') ?? '{}')} />
          </List.Item>
        )}
      />
      Total: {total}

    </div>
  );
};

export default MyChartPage;
