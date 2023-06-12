import React from "react";
import { Modal, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

function AddMemberModal({ open, closeModal, houseId }) {
    const [email, setEmail] = React.useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [modalText, setModalText] = React.useState("Content of the modal");

    const handleOk = async () => {
        if (!email) {
            messageApi.error("Please enter an email.");
            return;
        }
        await fetch("http://localhost:8000/invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, houseId }),
        }).then((res) => {
            messageApi.success("Invite sent!");
            closeModal();
        });
    };
    const handleCancel = () => {
        closeModal();
    };
    return (
        <>
            {contextHolder}
            <Modal
                title="Invite Member"
                okText="Invite"
                centered={true}
                destroyOnClose={true}
                closable={false}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form onFinish={handleOk}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email.",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            prefix={
                                <MailOutlined className="site-form-item-icon" />
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddMemberModal;
