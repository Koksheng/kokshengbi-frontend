import { postChartGenChartByAiGenChartByAi } from '@/services/kokshengbi-backend/chart';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, message, Row, Select, Space, Spin, Upload} from 'antd';
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
    setChart(undefined);
    setOption(undefined);

    const { file, ...params } = values;
    // Get the file object if it exists
    const fileObj = file && file.fileList && file.fileList[0] ? file.fileList[0].originFileObj : undefined;


    try{
      const res = await postChartGenChartByAiGenChartByAi(params, fileObj);
      console.log(res);
      if(!res.data){
        message.error("Analysation Failed.");
      }else{
        message.success("Analysation Successfully");


        // const chartOption = JSON.parse(res.data.genChart ?? '');
        // const chartOption = res.data.genChart;
        // // Unescape and parse the genChart data
        const unescapedGenChart = res?.data?.genChart?.replace(';', '') ?? '';
        const chartOption = JSON.parse(unescapedGenChart);
        // console.log('chartOption: ', chartOption);

        // let chartOption;
        // const genChart = res.data.genChart; // This is the string

        // // Check if genChart is a string, then parse it
        // if (typeof genChart === 'string') {
        //     try {
        //         // Trim the string before parsing
        //         chartOption = JSON.parse('['+genChart.trim()+']');
        //     } catch (error) {
        //         console.error('Error parsing genChart:', error);
        //         throw new Error("Echarts parsing error: ");
        //     }
        // } else {
        //     chartOption = genChart; // Assume it's already an object
        // }

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
      console.log("e.message: " + e.message);
      message.error("Analysation Failed. " + e.message);
    }
    setSubmitting(false);
    
  };

  return (
    <div className="add-chart">
    <Row gutter={24}>
      <Col span={12}>
      <Card title="Intelligent Analysis">
        <Form
            name="addChart"
            labelAlign="left" labelCol={{span:4}} wrapperCol={{span:16}}
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
                // { value: 'Stacked Chart', label: 'Stacked Chart' },
                { value: 'Pie Chart', label: 'Pie Chart' },
                // { value: 'Radar Chart', label: 'Radar Chart' },
              ]}
            >
            </Select>
          </Form.Item>


          <Form.Item
            name="file"
            label="Origianl Data"
          >
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload CSV file</Button>
            </Upload>
          </Form.Item>
          

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
        
      </Col>
      <Col span={12}>
        
        <Card title="Conclusion">
          {chart?.genResult ?? <div>Please submit on the left first</div>}
          <Spin spinning={submitting}/>
        </Card>
        <Divider />
        <Card title="Visualization Chart">
          {
            option ? <ReactECharts option={option} /> : <div>Please submit on the left first</div>
          }
          <Spin spinning={submitting}/>
        </Card>
      </Col>
    </Row>
      
      
    </div>
  );
};

export default AddChart;
