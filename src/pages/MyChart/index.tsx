import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getChartListChartByPageListPage } from '@/services/kokshengbi-backend/chart';
import { Avatar, Card, List, message, Result } from 'antd';
import { useModel } from '@umijs/max';
import Search from 'antd/es/input/Search';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
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

        if(res.data.items){
          res.data.items.forEach(data => {
            if(data.status === 'succeed'){
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          });
        }
        // console.log("res.data.items",res.data.items);
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

  // todo: 
  // 1. user can see original data
  // 2. after click can jump to edit page to edit genChart

  return (
    <div className="my-chart=page">
      <div>
        <Search placeholder="Please input chart name" loading={loading} enterButton onSearch={(value)=>{
          setSearchParams({
            ...initSearchParams,
            chartName: value,
          })
        }} />
      </div>
      <div className='margin-16' />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            })
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={loginUser?.userAvatar} />}
                title={item.chartName}
                description={item.chartType ? ('Chart Type: ' + item.chartType) : undefined}
              />
              <>
                {
                  item.status === 'wait' && <>
                    <Result
                      status="warning"
                      title="To be generated"
                      subTitle={item.execMessage ?? 'The current chart generation queue is busy, please wait patiently'}
                    />
                  </>
                }
                {
                  item.status === 'running' && <>
                    <Result
                      status="info"
                      title="Generating chart"
                      subTitle={item.execMessage}
                    />
                  </>
                }
                {
                  item.status === 'succeed' && <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'Analysis Goal：' + item.goal}</p>
                    <div style={{ marginBottom: 16 }} />
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                  </>
                }
                {
                  item.status === 'failed' && <>
                    <Result
                      status="error"
                      title="Chart generation failed"
                      subTitle={item.execMessage}
                    />
                  </>
                }
              </>

              
            </Card>
          </List.Item>
        )}
      />
      Total: {total}

    </div>
  );
};

export default MyChartPage;
