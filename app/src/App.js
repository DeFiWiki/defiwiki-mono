import React, { useState } from "react";
import Ceramic from "@ceramicnetwork/http-client";

import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { getProvider } from "./wallet";

import logo from './logo.svg';
import './App.css';

import { Button } from "antd";
import ProtocolCard from './views/ProtocolCard';
import { IDX } from "@ceramicstudio/idx";
  

// TODO: refactor out web3 stuff
const INFURA_KEY = "6136ff8f36ce4d83a44157cc7b2e46e2";

function App() {

  /* --------------------------
   *   Ceramic Initialization
   * --------------------------
   */

  // TODO: add configuration for local vs remote
  const API_URL = "https://localhost:7007";
  // const API_URL = "https://ceramic-clay.3boxlabs.com";
  const ceramic = new Ceramic(API_URL); 
  // const ceramic = new CeramicClient(API_URL); 

  const createIdx = (ceramic) => {
    const idx = new IDX({ ceramic });
    window.idx = idx;
    return idx;
  }

  const authenticate = async () => {
    const provider = await getProvider();
    const resolver = { 
                        ...KeyDidResolver.getResolver(), 
                        ...ThreeIdResolver.getResolver(ceramic)
                     };
    const did = new DID({ provider, resolver });
    console.log(did);
    await did.authenticate();
    console.log(did);
    await ceramic.setDID(did);
    console.log(did);
    const idx = createIdx(ceramic);
    // window.did = did;
    return idx.id;
  }


  // TODO: Fetch the list of protocols from ceramic
  const [protocols, setProtocols] = useState([ "hi", "bye" ]);

  const addProtocol = () => {
    const name = Math.random();
    console.log(`Name: ${name}`);

    const newProtocols = protocols.concat([name]);
    setProtocols(newProtocols)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Protocols</h1>
        <Button onClick={addProtocol}> Add Protocol </Button>
      
        <div className="container--grid">
          {
            protocols.map(function(protocol, i) {
              return <ProtocolCard name={protocol} />
            })
          }
        </div>
        <Button onClick={authenticate}>Connect Wallet</Button>
      </header>
    </div>
  );
}

export default App;
