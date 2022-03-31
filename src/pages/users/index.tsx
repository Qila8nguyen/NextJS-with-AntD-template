import { Card, Table } from 'antd'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Page404 from '../../components/Page/404'
import { ROUTE } from '../../configs/constant'
import { wrapper } from '../../redux/store'
import { getPreProcessProps } from '../../utils'

const Users = (props) => {
  const { isAllowed } = props
  if (!isAllowed) return <Page404/>

  const users = [
    {
      domain: 'khapk',
      email: 'khapham.7165@gmail.com'
    },
    {
      domain: 'khapham',
      email: 'khapham050499@gmail.com'
    }
  ]

  const userColumns = [
    {
      title: 'Username',
      dataIndex: 'domain',
      render: (text, record) => <Link href={`${ROUTE.USER.URL}/${text}`}>{text}</Link>
    },
    {
      title: 'Email',
      dataIndex: 'email'
    }
  ]

  return (
    <div>
      <Card title='Users (100)'>
        <Table dataSource={users} columns={userColumns}/>
      </Card>
    </div>
  )
}

export default Users

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  const preProcessProps = await getPreProcessProps(context, store)

  return {
    props: {
      ...preProcessProps
    }
  }
})