import Home from './components/Home'
import Login from './components/Login'

import Admin from './components/Admin/Admin'
import Factory from './components/Factory/Factory'
import SingleFactory from './components/Factory/SingleFactory/SingleFactory'
import Client from './components/Factory/SingleFactory/Client'
import Commodity from './components/Factory/SingleFactory/Commodity/Commodity'
import Finance from './components/Factory/SingleFactory/Finance/Finance'
import Order from './components/Factory/SingleFactory/Order/Order'

import OrderForm from './components/Factory/SingleFactory/Order/OrderForm'
import CommodityForm from './components/Factory/SingleFactory/Commodity/CommodityForm'
import Month from './components/Factory/SingleFactory/Finance/Month'
import Year from './components/Factory/SingleFactory/Finance/Year'

import Manager from './components/Manager/Manager'


export const routes = [
  { path: '/', name: 'loginLink', component: Login },
  {
    path: '/home', name: 'homeLink', component: Home, redirect: '/home/admin', children: [
      {
        path: '/home/admin', name: 'adminLink', component: Admin
      },
      {
        path: '/home/factory', name: 'factoryLink', component: Factory
      },
      {
        path: '/home/manager', name: 'managerLink', component: Manager
      },
      {
        path: '/home/singleFactory', name: 'singleFactoryLink', component: SingleFactory, redirect: '/home/singleFactory/client', children: [
          {
            path: '/home/singleFactory/client', name: 'clientLink', component: Client
          },
          {
            path: '/home/singleFactory/commodity', name: 'commodityLink', component: Commodity, children: [
              {
                path: '/home/singleFactory/commodity/commodityForm/:commodity_id', name: 'commodityFormLink', component: CommodityForm
              }
            ]
          },
          {
            path: '/home/singleFactory/finance', name: 'financeLink', component: Finance, children: [
              {
                path: '/home/singleFactory/finance/year:year_id', name: 'yearLink', component: Year
              }, 
              {
                path: '/home/singleFactory/finance/year:year_id/month:month_id', name: 'monthLink', component: Month
              }
            ]
          },
          {
            path: '/home/singleFactory/order', name: 'orderLink', component: Order, children: [
              {
                path: '/home/singleFactory/order/orderForm/:trade_id', name: 'orderFormLink', component: OrderForm
              }
            ]
          },
        ]
      },
    ]
  },
]



