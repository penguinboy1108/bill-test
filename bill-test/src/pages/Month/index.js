import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DailyBill'

const Month = () => {
  //setDateVisible
  const billList = useSelector(state => state.bill.billList);
  const billGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'));
  }, [billList]);
  const [currentMonthList, setMonthList] = useState([]);
  const [dateVisible, setDateVisible] = useState(false);
  const monthResult = useMemo(() => {
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((total, item) => total + item.money, 0);
    const income = currentMonthList.filter(item => item.type === 'income').reduce((total, item) => total + item.money, 0);
    return { pay, income, total: income + pay };
  }, [currentMonthList]);

  // set currentDate
  useEffect(() => {
    const nowDate = dayjs(new Date()).format('YYYY-MM');
    if (billGroup[nowDate]) {
      setMonthList(billGroup[nowDate]);
    }
  }, [billGroup]);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM');
  });

    const DailyGroup = useMemo(() => {
      const groupData = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'));
      const keys = Object.keys(groupData);
      return { keys, groupData };
  }, [currentMonthList]);
  
  const onConfirm = (date) => {
    
    setCurrentDate(dayjs(date).format('YYYY-MM'));

    setMonthList(billGroup[dayjs(date).format('YYYY-MM')] || []);
    console.log(billGroup, monthResult);

    setDateVisible(false);
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate + ''}
            </span>
            <span className={classNames('arrow', { expand: dateVisible })}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={onConfirm}
          />
        </div>
        <DailyBill />
        {DailyGroup.keys.map(key => ( 
          <DailyBill key={key} date={key} list={DailyGroup.groupData[key]} />
        ))}
      </div>
    </div >
  )
}

export default Month