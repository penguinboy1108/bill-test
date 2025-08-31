import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "../../store/modules/billStore";

const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
    useEffect(() => {
    dispatch(getBillList());   // 👈 必须调用
  }, [dispatch]);

  const switchRoute = (path) => {
    navigate(path);
  };
  return (
    <div className="kaLayout">
      <div className="page">
        {/* 二级路由出口 */}
        <Outlet />
      </div>

      <TabBar
        className="tabbar"
        activeKey={location.pathname}
        onChange={switchRoute}
      >
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
