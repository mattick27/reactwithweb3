import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
//api key M4DZ9R465CNF2YUEHIKVMAHI6VYI2W3YUT

function App() {
  const [ethEn,setETHEn]  = useState(null)
  const [metamask , setMetamask] = useState(null)
  useEffect(()=>{
    const eth = window.ethereum 
    console.log(Object.keys(eth))
    console.log(Object.keys(eth['request']))
    console.log(eth['selectedAddress'])
    setMetamask(eth['selectedAddress'])
    setETHEn(eth)
    fetch('https://api.bscscan.com/api?module=account&action=txlist&address=0xa2F28A71cca242aBe55AEC0Ff046c1C8dCdE5eDD&startblock=7200000&endblock=99999999&sort=asc&apikey=M4DZ9R465CNF2YUEHIKVMAHI6VYI2W3YUT')
    .then((res)=>{
      return res.json()
    }).then((data)=>{
      console.log(data)
    })
  },[])
  const handleConnectMetamask = (eth)=>{
    if(eth){
      eth.request({ method: 'eth_requestAccounts' }).then((res)=>{
        console.log(res)
      })
      // console.log(res)
    }
  }
  const handleSendETH = (eth)=>{
    const destination = '0x'
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x12A05F200', // customizable by user during MetaMask confirmation. price
      gas: '0x33450', // customizable by user during MetaMask confirmation. limit
      to: destination, // Required except during contract publications.
      from: eth.selectedAddress, // must match user's active address.
      value: '0x2386F26FC10000', // Only required to send ether to the recipient from the initiating external account.
      data: '0x00', // Optional, but used for defining smart contract creation and interaction.
      chainId: eth.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    }
    eth.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    }).then((tx)=>{
      console.log(tx)
    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p
        onClick={()=>{handleConnectMetamask(ethEn)}}
        >
          connect metamask
        </p>
        <a
        onClick={()=>{handleSendETH(ethEn)}}
        > send ETH </a>
        <p>{metamask}</p>
      </header>
    </div>
  );
}

export default App;
