import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import Web3 from 'web3'
import pancakeABI from './abipancakerouterMainnet.json'

function App() {
  const [ethEn,setETHEn]  = useState(null)

  const handleCreateWallet = (eth)=>{
    const web3 = new Web3('https://bsc-dataseed1.binance.org:443') // BSC mainnet. You can use bscscan to check your wallet and tx 
    const account = web3.eth.accounts.create() //get private key from this param
    
  }
  const handleGetAddress = ()=>{
    const web3 = new Web3('https://bsc-dataseed1.binance.org:443') // BSC mainnet. You can use bscscan to check your wallet and tx 

    const privateKey = '0x' // input your privatekey 
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    console.log(account['address'])

  }
  const recoveryWallet = ()=>{
    const web3 = new Web3('https://bsc-dataseed1.binance.org:443') // BSC mainnet 


    const privateKey = '0x' // input your privatekey 
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.privateKeyToAccount(privateKey)


    const pancakeRouter = '0x10ed43c718714eb63d5aa57b78b54704e256024e' // you can search this address in bsc maninet.
    let contract = new web3.eth.Contract(pancakeABI,pancakeRouter) // this line is mean decompile binary smartcontract with abi.

    let contractswap = contract.methods
    .swapExactETHForTokens('0',['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c','0xe9e7cea3dedca5984780bafc599bd69add087d56'],account['address'],'16205518720000')
    // you can check input param from pancakerouter method. https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e#writeContract.

    let encodeContract = contractswap.encodeABI() // encode the contract for prepare to send into blockchain.


    let txData = {
      from : account['address'], 
      to : pancakeRouter, 
      gas : 210000,
      data : encodeContract, 
      value : web3.utils.toWei('0.001', 'Ether') 
    }

    account.signTransaction(txData).then((signedTX)=>{  // Before send the tx. You must use acc to sign the tx. 
      console.log(signedTX)
      web3.eth.sendSignedTransaction(signedTX.rawTransaction)//  After we signed the tx. We could send via web3 into blockchain.
      .on('transactionHash', function(hash){
        console.log(`this is hash ${hash}`)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(`this is hash for confirmation ${confirmationNumber}`)
        console.log(receipt)
      })
      .on('receipt', function(receipt){
        console.log(`receipt`)
        console.log(receipt)
      })
      .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.error("Error:", error, "Receipt:", receipt)
      })
      
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
        onClick={()=>{handleCreateWallet(ethEn)}}
        >
          create wallet
        </p>
        <p
        onClick={handleGetAddress}
        >

          get Address
        </p>
        <p
        onClick={recoveryWallet}
        >
          recover wallet
        </p>
      </header>
    </div>
  );
}

export default App;
