import React, { useContext } from "react";
import myAxios from "../../myAxios";
import {
  Table,
  Button,
  Space,
  Spin,
  Row,
  Col,
  message,
  Input,
  Modal,
  Tooltip,
  Popconfirm,
  Form,
} from "antd";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const tableLoading = {
  indicator: <Spin indicator={antIcon} />,
};
const LihatKaryawan = () => {
  const [user, setUser] = useContext(UserContext);
  const [karyawan, setKaryawan] = useState(null);
  const [modalCon, setModalCon] = useState(null);
  const [tempData, setData] = useState(null);
  const [searchText, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAct, setLoadingAct] = useState(false);
  const [modalVisible, setModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!karyawan) {
      getKaryawan();
    }
  });

  const getKaryawan = () => {
    setLoading(tableLoading);
    myAxios
      .get(`karyawan`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setLoading(false);
        setData(data);
        setKaryawan(data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          message.error("Sesi anda telah habis!");
          localStorage.removeItem("user");
        } else {
          message.error(err.response.data.message);
        }
        setLoading(false);
      });
  };

  const onHapus = (param) => {
    console.log(param);
    console.log(user.token);
    setLoadingAct(true);
    myAxios
      .put(`hapusKaryawan/${param}`, null, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        getKaryawan();
        message.success(res.data.message);
        setLoadingAct(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          message.error("Sesi anda telah habis!");
          localStorage.removeItem("user");
          setUser(null);
        } else {
          message.error(err.response.data.message);
        }
        setLoading(false);
      });
  };

  const clearFilters = () => {
    setKaryawan(tempData);
    setSearch(null);
  };

  const onChangeSearch = (evt) => {
    setSearch(evt.target.value);
    if (tempData) {
      if (evt.target.value === "") {
        setKaryawan(tempData);
      } else {
        setKaryawan(
          tempData.filter((i) => {
            return (
              i.name.toLowerCase().includes(evt.target.value.toLowerCase()) ||
              i.email.toLowerCase().includes(evt.target.value.toLowerCase()) ||
              i.npp.toLowerCase().includes(evt.target.value.toLowerCase())
            );
          })
        );
      }
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    if (modalCon.judul === "Tambah Karyawan") {
      let newObj = {
        name: values.nama,
        email: values.email,
        password: values.password,
        npp: values.npp,
      };

      myAxios
        .post(`karyawan`, newObj, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          message.success(res.data.message);
          setLoading(false);
          setModal(false);
          form.resetFields();
          getKaryawan();
        })
        .catch((err) => {
          if (err.response.data.message === "Unauthenticated.") {
            message.error("Sesi anda telah habis!");
            localStorage.removeItem("user");
            setUser(null);
          } else {
            message.error(err.response.data.message);
          }
          setLoading(false);
        });
    } else {
      if (values.password === undefined) values.password = "undefined";
      let newObj = {
        id: modalCon.id,
        name: values.nama,
        email: values.email,
        password: values.password,
        npp: values.npp,
      };

      myAxios
        .put(`editKaryawan`, newObj, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          message.success(res.data.message);
          setLoading(false);
          setModal(false);
          form.resetFields();
          getKaryawan();
        })
        .catch((err) => {
          if (err.response.data.message === "Unauthenticated.") {
            message.error("Sesi anda telah habis!");
            localStorage.removeItem("user");
            setUser(null);
          } else {
            message.error(err.response.data.message);
          }
          setLoading(false);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const onTambahModal = () => {
    setModal(true);
    setModalCon({
      judul: "Tambah Karyawan",
      id: null,
    });
  };
  const onEditModal = (param) => {
    setModal(true);
    setModalCon({
      judul: "Ubah Karyawan",
      id: param,
    });
    let filter = tempData.filter((e) => {
      return e.id === param;
    });

    form.setFieldsValue({
      nama: filter[0].name,
      email: filter[0].email,
      npp: filter[0].npp,
    });
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ellipsis: true,
    },
    {
      title: "NPP",
      dataIndex: "npp",
      key: "npp",
      sorter: (a, b) => a.npp.length - b.npp.length,
      ellipsis: true,
    },
    {
      key: "action",
      dataIndex: "id",
      align: "center",
      render: (dataIndex) => (
        <div>
          {!loadingAct && (
            <Space size="middle">
              <Tooltip
                placement="bottom"
                title="Ubah Karyawan"
                color="#1f1f1f"
                key="white"
              >
                <Button
                  className="aksiEdit"
                  size="small"
                  onClick={() => onEditModal(dataIndex)}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Tooltip
                placement="bottom"
                title="Hapus Karyawan"
                color="#1f1f1f"
                key="white"
              >
                <Popconfirm
                  placement="bottomRight"
                  title="Apakah yakin ingin menghapus karyawan ?"
                  onConfirm={() => onHapus(dataIndex)}
                  okText="Hapus"
                  cancelText="Batal"
                >
                  <Button className="aksiHapus" size="small">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </Tooltip>
            </Space>
          )}
          {loadingAct && <Spin indicator={antIcon} />}
        </div>
      ),
    },
  ];

  return (
    <div className="container-content karyawan">
      <h1 className="table-title">KARYAWAN</h1>
      <div className="container-table">
        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Col md={12} sm={24}>
            <Space>
              <Button
                type="secondary"
                className="btn-hapus-filter"
                onClick={onTambahModal}
              >
                Tambah Karyawan
              </Button>
              <Button
                className="btn-hapus-filter"
                type="danger"
                onClick={clearFilters}
              >
                Hapus Filter
              </Button>
            </Space>
          </Col>
          <Col md={12} sm={24} style={{ width: "100%" }}>
            <Input
              value={searchText}
              style={{ width: "100%" }}
              placeholder="Cari data karyawan disini"
              onChange={onChangeSearch}
            />
          </Col>
        </Row>
        <Table
          loading={loading}
          loadingIndicator={antIcon}
          columns={columns}
          dataSource={karyawan}
          scroll={{ x: 900, y: 1500 }}
          size="middle"
        />
        {modalCon && (
          <Modal
            title={modalCon.judul}
            visible={modalVisible}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form
              layout="vertical"
              form={form}
              name="basic"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                labelAlign="left"
                label="Nama"
                name="nama"
                rules={[
                  {
                    required: true,
                    message: "Bagian ini wajib diisi",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelAlign="left"
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Masukan email yang valid",
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelAlign="left"
                label="NPP"
                name="npp"
                rules={[
                  {
                    required: true,
                    message: "NPP harus 10 digit!",
                    min: 10,
                    max: 10,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelAlign="left"
                label="Kata Sandi"
                name="password"
                rules={[
                  {
                    required: !modalCon.id ? true : false,
                    message: "Bagian ini wajib diisi!",
                    min: 6,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Row justify="end">
                  <Col md="12" style={{ marginRight: "10px" }}>
                    <Button
                      style={{ width: "100%" }}
                      danger
                      onClick={() => form.resetFields()}
                      loading={loading}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col md="12">
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LihatKaryawan;
