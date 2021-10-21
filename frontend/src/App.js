import React, { useState, useEffect, PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import './App.css';
const constants = require('./constants');
// Initialize Zilliqa
const { BN, Long, bytes, units } = require("@zilliqa-js/util");
const { toBech32Address } = require("@zilliqa-js/crypto");
const { Zilliqa } = require("@zilliqa-js/zilliqa");



function App() {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  const [owners, setOwners] = useState([]);
  const [nfts, setNFTs] = useState([]);

  const GetContractInformation = async (tokenAddress) => {
    const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

    const tokenInfo = await zilliqa
      .blockchain
      .getSmartContractState(tokenAddress);

    let owners = tokenInfo.result["owners"];
    let nfts = tokenInfo.result["nfts"];

    console.log(owners);
    console.log(nfts);

    return {
      owners: owners,
      nfts: nfts
    }
  };

  useEffect(() => {
    const data = GetContractInformation(constants.CONTRACT_ADDRESS);
    setOwners(data["owners"]);
    setNFTs(data["nfts"]);
  }, []);

  return (
    <div className="App">
      <h1>Decnetralised Index Fund </h1>
      <center>
        <div style={{ width: "1000px", color: "black" }} className="App">
          <PieChart width={1000} height={400}>
            <Pie
              data={owners}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={200}
              dataKey="value"
            >
              {Object.keys(owners).map(function (keyName, keyIndex) {
                return (
                  <Cell key={`cell-${keyIndex}`} fill={`#` + (Math.random().toString(16) + `00000`).slice(2, 8)} />
                )
              })}

            </Pie>
          </PieChart>
        </div></center>
      <table>
        <tr>
          <th>Owner Address</th>
          <th>Token ID</th>
        </tr>
        {Object.keys(nfts).map(function (keyName, keyIndex) {
          return (
            <tr>
              <td> {keyName}  </td>
              <td> {keyIndex} </td>
            </tr>
          )
        })}
       

      </table>
    </div>
  );
};

export default App;
