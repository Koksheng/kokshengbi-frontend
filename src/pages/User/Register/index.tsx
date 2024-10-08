import { Footer } from '@/components';
import { postUserUserRegister } from '@/services/kokshengbi-backend/user';
// import { register } from '@/services/ant-design-pro/api';
import { ArrowLeftOutlined, LockOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link, useIntl } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
// const ActionIcons = () => {
//   const { styles } = useStyles();
//   return (
//     <>
//       <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
//       <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
//       <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
//     </>
//   );
// };
// const Lang = () => {
//   const { styles } = useStyles();
//   return;
// };
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const intl = useIntl();

  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    // 校验 verify
    if (userPassword !== checkPassword) {
      message.error('Password and Confirm Password do not match');
      return;
    }
    try {
      // 注册
      const res = await postUserUserRegister(values);
      if (res.code===0) {
      // if (id) {
        const defaultLoginSuccessMessage = 'Registration Successfully';
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        // if(!history) return;
        // const {query} = history.location;
        // history.push({
        //   pathname: '/user/login',
        //   query,
        // });
        return;
      } 
      // else {
      //   // throw new Error(res.description);
      //   throw new Error("resiter error id");
      // }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Registration failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'Register'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{
            searchConfig: {
              submitText: 'Register',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Smart BI Analytics"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          // actions={['其他注册方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'User Registration',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter your account'}
                rules={[
                  {
                    required: true,
                    message: 'Account is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter your password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'The length cannot be less than 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter confirm password'}
                rules={[
                  {
                    required: true,
                    message: 'Confirm password is required',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'The length cannot be less than 8',
                  },
                ]}
              />
              {/* <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              /> */}
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to='/user/login'><ArrowLeftOutlined />  Back to Login</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
