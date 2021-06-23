import React, { useContext, useState } from 'react';
import myAxios from '../../myAxios';

import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserContext } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import './Login.css';
// import LogoNav from '../../assets/logo/logo-ikdki.png';
import LogoNav from '../../assets/logo/siTemPat.png';
import SvgLogin from '../../assets/img/login.svg';
import { At, Key } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = () => {
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    setLoading(true);
    const inputData = {
      email: values.email,
      password: values.password,
    };

    myAxios
      .post('login', inputData)
      .then((res) => {
        var data = res.data.user;

        var nama = data.name;
        var email = data.email;
        var role = data.role;
        var id = data.id;
        var token = res.data.access_token;

        var currentUser = {
          nama,
          email,
          token,
          role,
          id,
        };

        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
        setLoading(false);
        message.success('Selamat Datang, ' + nama + '!');
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className='container'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='content'>
        <Row justify='center' className='containerRow'>
          <Col md={12} className='containerCol containerSvg'>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className='imgDiv'>
              <img className='imgSvg' src={SvgLogin}></img>
            </motion.div>
          </Col>
          <Col md={12} sm={24} className='containerCol'>
            <div className='colDiv'>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <br />
                <img
                  alt='logo-sitempat.png'
                  style={{ width: '100px', marginBottom: '20px' }}
                  src={LogoNav}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}>
                <Form
                  {...layout}
                  form={form}
                  name='basic'
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                  <Form.Item
                    justify='center'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Masukan email yang valid!',
                        type: 'email',
                      },
                    ]}>
                    <Input
                      size='middle'
                      prefix={<At />}
                      placeholder='  arez@sitempat.com'
                    />
                  </Form.Item>
                  <Form.Item
                    justify='center'
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Kata sandi minimal 6 karakter!',
                        min: 6,
                      },
                    ]}>
                    <Input.Password
                      size='middle'
                      prefix={<Key />}
                      placeholder='  Kata sandi'
                    />
                  </Form.Item>

                  <Form.Item justify='center'>
                    <Button type='primary' htmlType='submit' loading={loading}>
                      Masuk
                    </Button>
                  </Form.Item>
                </Form>
              </motion.div>
            </div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Login;
