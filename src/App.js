import React, { useState } from "react";
import './App.css';
import ScrollTable from './components/ScrollTable';
import RebblyTable,{ StatusPill, PreviewNavigation } from './components/RebblyTable';

const getData = () => [
  { campaigns: "Cookie permissions for network", status: 'ACTIVE', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "Website redesign feedback", status: 'DRAFT', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "Spin the wheel campaigns", status: 'ERROR', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "Email collecton for new user", status: 'ACTIVE', views: "18,599", clicks: '6025', conversions: '738', ppreview: '' },
        { campaigns: "Discount code for first order", status: 'INACTIVE', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "New users for first order", status: 'PAUSED', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "1", status: 'ACTIVE', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "2", status: 'INACTIVE', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "3", status: 'PAUSED', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "4", status: 'DRAFT', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
        { campaigns: "5", status: 'ERROR', views: "18,599", clicks: '6025', conversions: '738', preview: '' },
];

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Campaigns",
        accessor: "campaigns",
        Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
      },
      {
        Header: "Views",
        accessor: "views"
      },
      {
        Header: "Clicks",
        accessor: "clicks"
      },
      {
        Header: "Conversions",
        accessor: "conversions"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill
      },
      {
        Header: "Preview",
        accessor: "preview",
        Cell: PreviewNavigation
      }
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <>
      <div className="App" style={{ height: "100%" }}>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
            <div className="ml-48 flex space-x-4">
            <button className="bg-transparent hover:bg-green-900 text-green-900 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded space-x-24">Delete</button>
            <button className="bg-transparent hover:bg-green-900 text-green-900 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded space-x-24">Update status</button>
          </div>
            </div>
            <div className="mt-4">
              {data.length>10 ? <ScrollTable columns={columns} data={data} /> : <RebblyTable columns={columns} data={data} />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}


export default App;
