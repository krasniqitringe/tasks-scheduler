import {
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Popconfirm,
} from "antd";
import { TaskType } from "../Task/TaskItem";
import { useEffect } from "react";
import { UserState } from "@/context/usersContext";
import dayjs from "dayjs";

interface ModalState {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  onChangeAssignee: (id: string, values: [string]) => void;
  onSubmit: (values: TaskType) => void;
  currentTask: TaskType | null | undefined;
  users: [UserState] | undefined;
}
export default function ModalComponent({
  open,
  loading,
  handleClose,
  onChangeAssignee,
  onSubmit,
  handleDelete,
  currentTask,
  users,
}: ModalState) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentTask) {
      form.setFieldsValue({
        ...currentTask,
        startDate: dayjs(currentTask.startDate),
        dueDate: dayjs(currentTask.dueDate),
      });
    } else {
      form.resetFields();
    }
  }, [currentTask, form]);

  const handleChangeAssignTo = () => {
    if (currentTask) {
      onChangeAssignee(currentTask._id, form.getFieldValue("assignedTo"));
    }
  };

  const handleFormSubmit = async (values: TaskType) => {
    onSubmit(values);
    form.resetFields();
    handleClose();
  };

  const handleTaskDelete = async () => {
    handleDelete();
    form.resetFields();
    handleClose();
  };

  return (
    <Modal
      title="Create Task"
      open={open}
      onCancel={handleClose}
      className="modal-wrapper"
      footer={[
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={handleTaskDelete}
        >
          <Button danger>Delete</Button>
        </Popconfirm>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={() => form.submit()}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={15}>
          <Col lg={24}>
            <Form.Item name="title" label="Title">
              <Input placeholder="Please enter the title" />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Please enter the description" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="startDate" label="Start date">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="dueDate" label="Due date">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="status" label="Status">
              <Select
                placeholder="Please select the status"
                options={[
                  {
                    value: "backlog",
                    label: "Backlog ",
                  },
                  {
                    value: "to_do",
                    label: "To Do ",
                  },
                  {
                    value: "in_progress",
                    label: "In Progress ",
                  },
                  {
                    value: "in_review",
                    label: "Review ",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item name="assignedTo" label="Assigned to">
              <Select
                mode="multiple"
                placeholder="Please enter the assigned to"
                onDropdownVisibleChange={() => handleChangeAssignTo()}
                options={users?.map((item: UserState) => {
                  return {
                    value: item?._id,
                    label: item?.firstname + " " + item?.lastname,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
