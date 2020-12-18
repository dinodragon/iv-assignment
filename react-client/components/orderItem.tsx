import React, { useEffect, useState } from 'react';
import { CarOutlined, CodeSandboxOutlined, CheckCircleOutlined, StopOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import http from '../http';

const CREATED = 1;
const CONFIRMED = 2;
const CANCELED = 3;
const DELIVERED = 4;

export default function OrderItem(props) {
  const [order, setOrder] = useState(props.order);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // ------------------------------------------------------------------------
  useEffect(() => {
    !order.completed && (checkStatus());
  })

  // ------------------------------------------------------------------------
  const checkStatus = async () => {
    setLoading(true);
    
    const { data } = await http.get(`orders/${order.id}/check_status`);
    setOrder(data);
    setLoading(false);
  }

  // ------------------------------------------------------------------------
  const cancel = async () => {
    // break if in progress
    if (cancelling) return;

    setCancelling(true);
    await http.put(`orders/${order.id}/cancel`);
    setCancelling(false);
  }

  // ------------------------------------------------------------------------
  return (
    <div className="bg-white shadow my-3 p-3 d-flex justify-content-between">
      <div className="d-flex align-items-center">
        {/* ICON */}
        {order.status == CREATED && (<Tooltip placement="left" title={"Order Created"}><CodeSandboxOutlined className="text-warning" style={{ fontSize: "28px" }} /></Tooltip>)}
        {order.status == CONFIRMED && (<Tooltip placement="left" title={"Order Confirmed"}><CheckCircleOutlined className="text-success" style={{ fontSize: "28px" }} /></Tooltip>)}
        {order.status == CANCELED && (<Tooltip placement="left" title={"Order Cancelled"}><StopOutlined className="text-danger" style={{ fontSize: "28px" }} /></Tooltip>)}
        {order.status == DELIVERED && (<Tooltip placement="left" title={"Order Delivered"}><CarOutlined className="text-primary" style={{ fontSize: "28px" }} /></Tooltip>)}
        
        <div className="ml-3">
          <div className="text-muted" style={{ fontSize: "12px" }}># {order.number}</div>
          <div className="text-secondary" style={{ fontSize: "18px" }}><b>RM {order.amount}</b></div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end">
        {!order.completed && (
          <div className="d-flex align-items-center">
            {loading && <Tooltip placement="left" title={"Preparing for delivery. You may cancel the order at this stage."}><SyncOutlined spin className="text-warning mr-2" /></Tooltip>}

            <Button danger onClick={cancel}>
              <div className="d-flex align-items-center">
                {cancelling && (<LoadingOutlined className="mr-2"/>)}
                <div>Cancel</div>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}