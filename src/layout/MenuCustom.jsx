import React, { Component, useState, useContext } from "react";
import "./MenuCustom.css";
import { Menu, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import myAxios from "../myAxios";

import {
  PersonFill,
  PeopleFill,
  Diagram3Fill,
  ClipboardMinus,
  BoxArrowLeft,
} from "react-bootstrap-icons";

const { SubMenu } = Menu;

const MenuCustom = () => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const Logout = () => {
    console.log(user);
    myAxios
      .post(`logout/${user.id}`, null, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        message.success("Berhasil keluar!");
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((err) => {
        // setLoading(false);
        message.error(JSON.stringify(err.response.data));
      });
  };

  return (
    <div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <SubMenu key="sub1" icon={<PersonFill />} title="Profil User">
          <Menu.Item key="1" style={{ margin: 0 }}>
            <Link className="link" to="/profil">
              Profil
            </Link>
          </Menu.Item>
          <Menu.Item key="2" style={{ margin: 0 }}>
            <Link className="link" to="/tambahAdmin">
              Ubah Kata Sandi
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="4" icon={<PeopleFill />}>
          <Link className="link" to="/karyawan">
            Karyawan
          </Link>
        </Menu.Item>

        <Menu.Item key="5" icon={<ClipboardMinus />}>
          <Link className="link" to="/tim">
            Tim
          </Link>
        </Menu.Item>

        <Menu.Item key="6" icon={<Diagram3Fill />}>
          <Link className="link" to="/ruangan">
            Ruang
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm
            placement="bottomRight"
            title="Apakah yakin ingin keluar ?"
            onConfirm={Logout}
            okText="Keluar"
            cancelText="Batal"
          >
            <Menu.Item key="3" icon={<BoxArrowLeft />} style={{ margin: 0 }}>
              Keluar
            </Menu.Item>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuCustom;
