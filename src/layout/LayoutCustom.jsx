import React, { useState, useContext, useEffect } from "react";
import myAxios from "../myAxios";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Dropdown,
  message,
  Row,
  Col,
} from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  PersonFill,
  PersonPlusFill,
  PeopleFill,
  InfoLg,
  JournalPlus,
  FileBarGraphFill,
  ClipboardCheck,
  CheckSquare,
  Journals,
  ClipboardData,
  JournalRichtext,
  Pencil,
} from "react-bootstrap-icons";

import { UserContext } from "../context/UserContext";
import MenuCustom from "./MenuCustom.jsx";
import ContentCustom from "./ContentCustom.jsx";
import FooterCustom from "./FooterCustom.jsx";
import Sitempat from "../assets/logo/siTemPat.png";
import User from "../assets/img/user.png";

import "./Layout.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutCustom = () => {
  const [user, setUser] = useContext(UserContext);
  const [role, setRole] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = (clp) => {
    setCollapsed(clp);
  };

  useEffect(() => {
    if (user !== null) {
      setRole(user.role);
    }
  });

  const Logout = () => {
    myAxios
      .post(`logout/${user.id}`, null, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        message.success("Berhasil keluar!");
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => {
        // setLoading(false);
        message.error(JSON.stringify(err.response.data));
      });
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const menu = (
    <Menu style={{ fontFamily: "poppins" }}>
      <Menu.Item icon={<PoweroffOutlined />}>
        <a target="_blank" rel="noopener noreferrer" onClick={Logout}>
          Keluar
        </a>
      </Menu.Item>
    </Menu>
  );

  // const menuDrawer = (
  //   <div>
  //     {role !== 'Dosen' && (
  //       <Menu theme='light' mode='inline' defaultSelectedKeys={['1']}>
  //         {role === 'Super Admin' && (
  //           <SubMenu
  //             key='sub1'
  //             icon={<PersonFill color='#123160' />}
  //             title='Profil Admin'>
  //             <Menu.Item key='1' style={{ margin: '0' }}>
  //               <Link className='link' to='/profil'>
  //                 Profil
  //               </Link>
  //             </Menu.Item>
  //             <Menu.Item key='2' style={{ margin: '0' }}>
  //               <Link className='link' to='/tambahAdmin'>
  //                 Tambah Admin
  //               </Link>
  //             </Menu.Item>
  //             <Menu.Item key='3' style={{ margin: '0' }}>
  //               <Link className='link' to='/lihatAdmin'>
  //                 Lihat Admin
  //               </Link>
  //             </Menu.Item>
  //           </SubMenu>
  //         )}

  //         {role === 'Admin' && (
  //           <Menu.Item
  //             key='1'
  //             style={{ margin: '0' }}
  //             icon={<PersonFill color='#123160' />}>
  //             <Link className='link' to='/profil'>
  //               Profil
  //             </Link>
  //           </Menu.Item>
  //         )}

  //         <Menu.Item
  //           key='4'
  //           icon={<PersonPlusFill color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/'>
  //             Calon Anggota
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='5'
  //           icon={<PeopleFill color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/anggotaIKDKI'>
  //             Anggota IKDKI
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='6'
  //           icon={<JournalPlus color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/reporting'>
  //             Reporting
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='7'
  //           icon={<CheckSquare color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/konfirmasiEdit'>
  //             Konfirmasi Edit User
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='8'
  //           icon={<FileBarGraphFill color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/tabelPengabdian'>
  //             Tabel Pengabdian
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='9'
  //           icon={<Journals color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/tabelPenelitian'>
  //             Tabel Penelitian
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='19'
  //           icon={<JournalRichtext color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/tabelJurnal'>
  //             Tabel Jurnal
  //           </Link>
  //         </Menu.Item>

  //         <Menu.Item
  //           key='10'
  //           icon={<ClipboardCheck color='#123160' />}
  //           style={{ margin: '0' }}>
  //           <Link className='link' to='/logUser'>
  //             Log User
  //           </Link>
  //         </Menu.Item>

  //         {/* <Menu.Item
  //             key="11"
  //             icon={<InfoLg color="#123160" />}
  //             style={{ margin: "0" }}
  //           >
  //             <Link className="link" to="/info">
  //               Info
  //             </Link>
  //           </Menu.Item> */}
  //       </Menu>
  //     )}
  //     {role === 'Dosen' && (
  //       <Menu theme='light' mode='inline' defaultSelectedKeys={['1']}>
  //         <SubMenu
  //           key='sub2'
  //           icon={<PersonFill color='#123160' />}
  //           title='Profil Saya'>
  //           <Menu.Item key='12' style={{ margin: '0' }}>
  //             <Link className='link' to='/kartuID'>
  //               Kartu ID
  //             </Link>
  //           </Menu.Item>

  //           <Menu.Item key='13' style={{ margin: '0' }}>
  //             <Link className='link' to='/editDosen'>
  //               Detail Data
  //             </Link>
  //           </Menu.Item>
  //           <Menu.Item key='18' style={{ margin: '0' }}>
  //             <Link className='link' to='/ubahKataSandi'>
  //               Ubah Kata Sandi
  //             </Link>
  //           </Menu.Item>
  //         </SubMenu>
  //         <SubMenu
  //           key='sub3'
  //           icon={<ClipboardData color='#123160' />}
  //           title='Penelitian'>
  //           <Menu.Item key='14' style={{ margin: '0' }}>
  //             <Link className='link' to='/publicPenelitian'>
  //               Public
  //             </Link>
  //           </Menu.Item>

  //           <Menu.Item key='15' style={{ margin: '0' }}>
  //             <Link className='link' to='/penelitianIndividu'>
  //               Individu
  //             </Link>
  //           </Menu.Item>
  //         </SubMenu>
  //         <SubMenu
  //           key='sub4'
  //           icon={<PeopleFill color='#123160' />}
  //           title='Abmas'>
  //           <Menu.Item key='16' style={{ margin: '0' }}>
  //             <Link className='link' to='/publicPengabdian'>
  //               Public
  //             </Link>
  //           </Menu.Item>

  //           <Menu.Item key='17' style={{ margin: '0' }}>
  //             <Link className='link' to='/pengabdianIndividu'>
  //               Individu
  //             </Link>
  //           </Menu.Item>
  //         </SubMenu>

  //         <SubMenu
  //           key='sub5'
  //           icon={<JournalRichtext color='#123160' />}
  //           title='Jurnal'>
  //           <Menu.Item key='20' style={{ margin: '0' }}>
  //             <Link className='link' to='/publicJurnal'>
  //               Public
  //             </Link>
  //           </Menu.Item>

  //           <Menu.Item key='21' style={{ margin: '0' }}>
  //             <Link className='link' to='/jurnalIndividu'>
  //               Individu
  //             </Link>
  //           </Menu.Item>
  //         </SubMenu>
  //       </Menu>
  //     )}
  //   </div>
  // );

  return (
    <Router>
      <Layout>
        {/* {user && (
          <Header theme="light" className="site-layout-background">
            <div className="hamburger-menu">
              <Button
                className="menuOutline"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  borderColor: "transparent",
                }}
                icon={<MenuOutlined style={{ color: "white" }} />}
                onClick={() => setVisible(true)}
              ></Button>
            </div>

            <div>
              <Row justify="end" style={{ marginTop: "-64px" }}>
                <Col>
                  <img
                    style={{ width: "45px", paddingRight: "10px" }}
                    src={Sitempat}
                  />
                </Col>
                <Col style={{ marginTop: "0" }}>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomCenter"
                  >
                    <a
                      style={{ paddingRight: "30px", color: "white" }}
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      NAMA ORANG <DownOutlined />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <div className="logo">
              <Link to="/">
                <p>(+62) 856 4526 78945</p>
              </Link>
            </div>
          </Header>
        )} */}
        <Layout className="site-layout">
          {user && (
            <Sider
              collapsible
              onCollapse={onCollapse}
              theme="dark"
              className="sider-menu"
              collapsed={collapsed}
              width="230px"
            >
              <div className="userId">
                <div className="imgProfil">
                  <img src={User} />
                </div>
                <div>
                  <p
                    style={{
                      lineHeight: collapsed ? "16px" : "0px",
                      fontSize: collapsed ? "12px" : "15px",
                    }}
                  >
                    {user.nama}
                  </p>
                  <div>
                    <p
                      style={{
                        lineHeight: collapsed ? "16px" : "4px",
                        fontSize: collapsed ? "10px" : "12px",
                      }}
                      className="subTitle"
                    >
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
              <MenuCustom />
            </Sider>
          )}

          {/* {user && (
            <Drawer
              closable={false}
              title={'IKDKI'}
              placement='left'
              style={{ padding: 0 }}
              onClose={() => setVisible(false)}
              // onClick={() => setVisible(false)}
              backgroundColor='#fff'
              visible={visible}>
              {menuDrawer}
            </Drawer>
          )} */}
          <Content className="backGround" style={{ minHeight: "87vh" }}>
            <ContentCustom />
          </Content>
        </Layout>
        <FooterCustom />
      </Layout>
    </Router>
  );
};

export default LayoutCustom;
