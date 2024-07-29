import { postChartGenChartByAi } from '@/services/kokshengbi-backend/chart';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Select, Space, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BIResponse>();
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);

 /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if(submitting){
      return;
    }
    console.log('Received values of form: ', values);
    setSubmitting(true);

    const { file, ...params } = values;
    // Get the file object if it exists
    const fileObj = file && file.fileList && file.fileList[0] ? file.fileList[0].originFileObj : undefined;


    try{
      const res = await postChartGenChartByAi(params, fileObj);
      console.log(res);
      if(!res.data){
        message.error("Analysation Failed.");
      }else{
        message.success("Analysation Successfully");
        const chartOption = JSON.parse(res.data.genChart ?? '');
        console.log('chartOption: ', chartOption);
        if (!chartOption){
          throw new Error("Echarts parsing error." );
        }
        else{
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any){
      message.error("Analysation Failed. " + e.message);
    }
    setSubmitting(false);
    
  };

  return (
    <div className="add-chart">
      <Form
        name="addChart"
        onFinish={onFinish}
        initialValues={{ }}
      >
        
        <Form.Item name="goal" label="Analysis Goal:" rules={[{ required: true, message: 'Please enter the analysis requirement!' }]}>
          <TextArea placeholder="Please enter the analysis requirement, such as: Analyze the growth of website users." />
        </Form.Item>
        
        <Form.Item name="chartName" label="Chart Name:">
          <TextArea placeholder="Please enter the chart name." />
        </Form.Item>

        <Form.Item
          name="chartType"
          label="Chart Type"
        >
          <Select 
            options={[
              { value: 'Line Chart', label: 'Line Chart' },
              { value: 'Bar Chart', label: 'Bar Chart' },
              { value: 'Stacked Chart', label: 'Stacked Chart' },
              { value: 'Pie Chart', label: 'Pie Chart' },
              { value: 'Radar Chart', label: 'Radar Chart' },
            ]}
          >
          </Select>
        </Form.Item>


        <Form.Item
          name="file"
          label="Origianl Data"
        >
          <Upload name="file">
            <Button icon={<UploadOutlined />}>Click to upload CSV file</Button>
          </Upload>
        </Form.Item>
        

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
      <div>
        分析结论: {chart?.genResult}
      </div>
      <div>
        生成图表: 
        {
          option && <ReactECharts option={option} />
        }
      </div>
    </div>
  );
};

export default AddChart;
