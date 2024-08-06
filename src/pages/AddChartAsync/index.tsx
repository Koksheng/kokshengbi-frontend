import { postChartGenChartByAiGenChartByAiAsync } from '@/services/kokshengbi-backend/chart';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, message, Select, Space, Upload} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

/**
 * 添加图表(异步)页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
    const [form] = useForm();
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
      const res = await postChartGenChartByAiGenChartByAiAsync(params, fileObj);
      console.log(res);
      if(!res.data){
        message.error("Analysation Failed.");
      }else{
        message.success("The analysis task was submitted successfully. Please check it on MyChart page later.");
        form.resetFields();

      }
    } catch (e: any){
      console.log("e.message: " + e.message);
      message.error("Analysation Failed. " + e.message);
    }
    setSubmitting(false);
    
  };

  return (
    <div className="add-chart-async">
    <Card title="Intelligent Analysis">
        <Form
            form={form}
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
                { value: 'Radar Chart', label: 'Radar Chart' },
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
      
      
    </div>
  );
};

export default AddChartAsync;
