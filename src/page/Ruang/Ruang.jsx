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
  Tag,
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
const Ruang = () => {
  const [user, setUser] = useContext(UserContext);
  const [ruang, setRuang] = useState(null);
  const [modalCon, setModalCon] = useState(null);
  const [tempData, setData] = useState(false);
  const [cekApi, setApi] = useState(false);
  const [searchText, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAct, setLoadingAct] = useState(false);
  const [modalVisible, setModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (cekApi === false) {
      console.log("ruang");
      getRuang();
    }
  });

  const getRuang = () => {
    setLoading(tableLoading);
    myAxios
      .get(`ruang`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (data !== null) {
          setData(data);
          setRuang(data);
        } else {
          setRuang(null);
        }
        setApi(true);
        setLoading(false);
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
    setLoadingAct(true);
    myAxios
      .put(`hapusRuang/${param}`, null, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        getRuang();
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
    setRuang(tempData);
    setSearch(null);
  };

  const onChangeSearch = (evt) => {
    setSearch(evt.target.value);
    if (tempData) {
      if (evt.target.value === "") {
        setRuang(tempData);
      } else {
        setRuang(
          tempData.filter((i) => {
            return (
              i.nama_ruang
                .toLowerCase()
                .includes(evt.target.value.toLowerCase()) ||
              i.status.toLowerCase().includes(evt.target.value.toLowerCase())
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
    if (modalCon.judul === "Tambah Ruang") {
      let newObj = {
        nama_ruang: values.nama_ruang,
      };

      myAxios
        .post(`ruang`, newObj, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          message.success(res.data.message);
          setLoading(false);
          setModal(false);
          form.resetFields();
          getRuang();
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
      let newObj = {
        id: modalCon.id,
        nama_ruang: values.nama_ruang,
      };

      myAxios
        .put(`editRuang`, newObj, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          message.success(res.data.message);
          setLoading(false);
          setModal(false);
          form.resetFields();
          getRuang();
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
      judul: "Tambah Ruang",
    });
  };
  const onEditModal = (param) => {
    setModal(true);
    setModalCon({
      judul: "Ubah Ruang",
      id: param,
    });
    let filter = tempData.filter((e) => {
      return e.id === param;
    });

    form.setFieldsValue({
      nama_ruang: filter[0].nama_ruang,
    });
  };

  const columns = [
    {
      title: "Nama Ruang",
      dataIndex: "nama_ruang",
      key: "nama_ruang",
      sorter: (a, b) => a.nama_ruang.length - b.nama_ruang.length,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      ellipsis: true,
      render: (text) =>
        text === "Kosong" ? (
          <Tag color="red">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        ),
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
                title="Ubah Ruang"
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
                title="Hapus Ruang"
                color="#1f1f1f"
                key="white"
              >
                <Popconfirm
                  placement="bottomRight"
                  title="Apakah yakin ingin menghapus ruang ?"
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
    <div className="container-content ruang">
      <h1 className="table-title">RUANGAN</h1>
      <div className="container-table">
        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Col md={12} sm={24}>
            <Space>
              <Button
                type="secondary"
                className="btn-hapus-filter"
                onClick={onTambahModal}
              >
                Tambah Ruang
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
              placeholder="Cari data ruang disini"
              onChange={onChangeSearch}
            />
          </Col>
        </Row>
        <Table
          loading={loading}
          loadingIndicator={antIcon}
          columns={columns}
          dataSource={ruang}
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
                label="Nama Ruang"
                name="nama_ruang"
                rules={[
                  {
                    required: true,
                    message: "Bagian ini wajib diisi",
                  },
                ]}
              >
                <Input />
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

export default Ruang;
