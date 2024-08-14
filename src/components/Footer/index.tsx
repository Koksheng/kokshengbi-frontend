import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Smart BI Analytics',
          title: 'Smart BI Analytics',
          href: 'https://github.com/Koksheng/kokshengbi-backend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Koksheng/kokshengbi-backend',
          blankTarget: true,
        },
        {
          key: 'Koksheng BI',
          title: 'Koksheng BI',
          href: 'https://github.com/Koksheng/kokshengbi-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
