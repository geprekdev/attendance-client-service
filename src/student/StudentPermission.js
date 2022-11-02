import { mdiCalendar, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
// import Calendar from "react-calendar";
import { Link, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import Cookie from '../util/Cookie'
import isEmpty from '../util/EmptyObj'
import Skeleton from '../components/Skeleton'
import { useGetLeaveQuery } from '../core/API'

export default function StudentPermission() {
  const { isSuccess, data, isError, error, isLoading, refetch } = useGetLeaveQuery({
    token: Cookie.getItem('token').slice(0, -1),
  })

  const location = useLocation()

  if (location?.state?.isSuccess) {
    refetch()
  }

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem('token')
    return <Navigate to={'/auth/login'} />
  }

  // Role permission
  if (isError && error.status === 403) {
    Cookie.deleteItem('token')
    return <Navigate to={'/auth/login'} />
  }

  return (
    <Layout role='STUDENT' title='Student Permission'>
      <div className=' mx-auto mb-[56px] min-h-screen max-w-[444px] border px-5 py-3 pb-24 shadow'>
        <div className='flex items-center justify-between rounded-full bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 text-xl text-white'>
          <p>Permission</p>

          {/* <Icon path={mdiSendOutline} size="24px" /> */}
        </div>

        <div className='mt-10'>
          {isLoading && (
            <>
              <div>
                <Skeleton height='20px' />
              </div>
              <div className='my-4'>
                <Skeleton height='20px' />
              </div>
              <div>
                <Skeleton height='20px' />
              </div>
            </>
          )}

          {(() => {
            if (isSuccess && data) {
              if (isEmpty(data.history)) {
                return (
                  <div>
                    <img src='/no-permission-student.svg' width='200px' alt='Tidak Ada Riwayat' className='mx-auto' />
                    <h1 className='mt-20 text-center text-xl text-gray-400'>Tidak Ada Riwayat</h1>
                  </div>
                )
              }
              let temp = []
              let i = 100

              for (const obj in data.history) {
                i++
                temp.push(
                  <>
                    <div
                      key={i}
                      className='mb-4 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 font-semibold text-white shadow-lg'
                    >
                      {obj}
                    </div>

                    <div>
                      {data.history[obj].map((d, idx) => (
                        <div className='mb-2 rounded-xl border px-5 py-2 shadow-lg' key={idx}>
                          <div className='flex justify-between'>
                            <div>
                              <h4 className='font-semibold'>
                                {d.type} ({d.mode})
                              </h4>
                              <p className='text-gray-600'>{d.desc}</p>
                              <div className='mt-4 mb-2 flex items-center gap-2'>
                                <Icon path={mdiCalendar} size='24px' className='text-blue-500' />
                                <p className=' rounded-lg bg-gray-200 px-3 py-1 font-semibold'>{d.date}</p>
                              </div>
                              <p>{d.reason}</p>
                            </div>
                            <div
                              style={{
                                backgroundImage: `url(${process.env.REACT_APP_API}${d.img})`,
                                backgroundSize: 'cover',
                                width: '150px',
                                height: '100px',
                              }}
                            />
                          </div>
                          <button
                            className={`mt-2 ml-auto block cursor-default rounded-lg border-2 px-4 py-1 font-semibold  ${
                              d.status_code === 0
                                ? 'border-red-500 text-red-600'
                                : d.status_code === 1
                                ? 'border-green-500 text-green-600'
                                : 'border-[#fdb13e] text-[#ae6a04]'
                            }`}
                          >
                            {d.status}
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )

                temp.push()
              }
              return temp
            }
          })()}
        </div>

        {/* Add new journal */}
        <div className='sticky'>
          <div className='ml-auto mt-10 flex h-14 w-14 cursor-pointer items-center rounded-full bg-blue-500 shadow-xl hover:bg-blue-600'>
            <Link to='new' className='flex justify-center'>
              <Icon path={mdiPlus} className='text-gray-100' size='78%' />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
