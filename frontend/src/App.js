import React, { useState, useEffect, PureComponent } from "react";
import { PieChart, Pie, Sector,Tooltip, Cell, ResponsiveContainer } from 'recharts';

import './App.css';
const constants = require('./constants');
// Initialize Zilliqa
const { BN, Long, bytes, units } = require("@zilliqa-js/util");
const { toBech32Address } = require("@zilliqa-js/crypto");
const { Zilliqa } = require("@zilliqa-js/zilliqa");

const GetContractInformation = async (tokenAddress) => {
  const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

  const tokenInfo = await zilliqa
    .blockchain
    .getSmartContractState(tokenAddress);

  let ownerst = tokenInfo.result["owners"];
  let nftst = tokenInfo.result["nftamounts"];
  let ownerstemp = [];
  let nfttemp = [];

  Object.keys(ownerst).map(function (keyName, keyIndex) {
    ownerstemp.push({ name: keyName, value: parseInt(ownerst[keyName]) });
  });
  Object.keys(nftst).map(function (key, keyIndex) {
    let json_push = {};
    json_push["address"] = key;
    Object.keys(nftst[key]).map(function (keyName, keyIndex){
      json_push["token_id"] = keyName;
      json_push["amount"] = nftst[key][keyName];
      nfttemp.push(json_push);
    }); 
  });

  console.log(nfttemp);

  return {
    owners: ownerstemp,
    nfts: nfttemp
  }
};



function App() {
  
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



  useEffect(async() => {
    const data = await GetContractInformation(constants.CONTRACT_ADDRESS);
    console.log("data", data);
    setOwners(data["owners"]);
    setNFTs(data["nfts"]);
  }, []);

  return (
    <div className="App">
      <h1>Decnetralised Index Fund </h1>
      <center>
        {owners.length > 0 && (
          <div style={{ width: "1000px", color: "black" }} className="App">
            <PieChart width={1000} height={400}>
              <Pie
                data={owners}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
              >
              {owners.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#` + (Math.random().toString(16) + `00000`).slice(2, 8)} />
            ))}
              



              </Pie><Tooltip />
            </PieChart>
          </div>
        )}
     
      <table>
        <tr>
          <th>Owner Address</th>
          <th>Token ID</th>
          <th>Amount</th>
        </tr>

            {nfts.length > 0 && nfts.map((entry, index) => (
        <tr>      
          <td>{entry["address"]}</td>
          <td>{entry["token_id"]}</td>
          <td>{entry["amount"]}</td>
          </tr>
            ))}


      </table> </center>
    </div>
  );
};

export default App;
