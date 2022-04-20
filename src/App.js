import {useEffect, useState} from "react";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import {Helmet} from "react-helmet";

export default function Home () {
      let [search, setSearch] = useState("");
      let handleSearch = (event) => {
        setSearch(event.target.value)
        console.log(search)
      };

      const handleAddToMetamask = (chainId) => {
        console.debug(`Adding chainId "${chainId}" to Metamask`);
        let rpc = RPCS.find(rpc => rpc.chainId === chainId);
        if (!rpc) return;

        let params = {
          chainId: ('0x' + chainId.toString(16)),
          blockExplorerUrls: [`${rpc.block_explorer}`],
          chainName: rpc.name,
          nativeCurrency: {
            name: rpc.symbol,
            symbol: rpc.symbol,
            decimals: 18
          },
          rpcUrls: [`${rpc.url}`]
        };
        window.ethereum.enable().then(r => {
          window.ethereum.request({method: 'eth_requestAccounts'}).then((p) => {
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [params, p],
            })
                .then((result) => {
                  console.log(result)
                })
                .catch((error) => {
                  console.log(error)
                });
          });
        });

      };

      return (
          <>
            <Helmet>
              <title>RPC Info</title>
              <meta name="description"
                    content="Metamask Custom RPCs, and public RPC API endpoints for blockchain networks. Including Avalanche, Binance Smart Chain, Matic and more."/>

              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-203811220-1"/>
              <script>
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-203811220-1');
                `}
              </script>
            </Helmet>
            <div className={"flex-grow-1 h-100 bg-light"}>
              <header className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                  <a href="#" className="navbar-brand">RPC Info</a>
                  {NETWORKS.sort((a, b) => a.s > b.s).map((ntwk) => {
                    return <a key={ntwk.s} className="nav-link text-decoration-none text-dark"
                              href={`#${ntwk.s}-rpc`}>{ntwk.s.toUpperCase()}</a>
                  })}
                </div>
              </header>

              <div className={"container"}>
                <main className="mt-2">
                  <article className="col-lg-12">
                    <header className="flex-grow-1">
                      <div className="d-flex flew-row justify-content-between">
                        <h1 className="font-weight-bolder mb-0 display-1 fw-bolder">RPC Info</h1>
                      </div>
                      <p className="lead">Easily add <strong>custom RPCs</strong> to <a className="text-decoration-none"
                                                                                        href="//metamask.io">Metamask</a>.</p>
                      <div className="alert alert-success"><strong><a href="//twitter.com/truemiller_com">Follow me on
                        Twitter</a></strong> for exclusive, new project announcements.
                      </div>
                      <input type="text" className="form-control form-control-lg mb-3 shadow-sm border"
                             placeholder={"Search for a Network; ethereu.."} onInput={handleSearch}/>
                    </header>
                    <div className="row">
                      {NETWORKS.sort((a, b) => {
                        return a.s > b.s
                      }).filter(network => {
                        return network.s.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                            network.n.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                      }).map(r => {
                        return <section key={r.s} className={"col-md-12 card-body border mb-3"}>
                          <h2 id={`${r.s}-rpc`} className={"fw-bold mb-2"}>
                            <a className="text-decoration-none" href={r.u}>{r.n}</a> RPCs
                          </h2>
                          <div className={"row"}>
                            <div className="col-md-12">
                              <div className={"row"}>
                                {RPCS.filter(x => x.network === r.s).map(p => {
                                  return <div className={"col-md-4"} key={p.chainId}>
                                    <div className="card mb-3">
                                      <div className="card-body">
                                        <h3 className={"border-bottom"}>{p.name}</h3>
                                        <dl>
                                          <dt>Type</dt>
                                          <dd>{p.type}</dd>
                                          <dt className={""}>RPC</dt>
                                          <dd><a href={p.url}>{p.url}</a></dd>
                                          <dt>Chain ID</dt>
                                          <dd>{p.chainId}</dd>
                                          <dt>Symbol</dt>
                                          <dd>{p.symbol}</dd>
                                          <dt>Block explorer</dt>
                                          <dd><a href={p.block_explorer}>{p.block_explorer}</a></dd>
                                          <>{p.chainId ? (<a onClick={() => handleAddToMetamask(p.chainId)}
                                                             className={"btn btn-sm btn-primary rounded shadow mb-2"}>
                                            Add to Metamask <img
                                              src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                                              height={13} width={13} alt="Metamask logo"
                                              title={`Add ${p.name} RPC to Metamask`}>
                                          </img></a>) : null}</>
                                        </dl>
                                      </div>
                                    </div>
                                  </div>
                                })}
                              </div>
                            </div>
                          </div>
                        </section>
                            ;
                      })}
                    </div>
                    <section>
                      <h2 id="faqs" className="">FAQs</h2>
                      <dl>
                        <dt>What does RPC stand for?</dt>
                        <dd>RPC standards for Remote Procedural Call.</dd>
                        <dt>What is a Metamask Custom RPC?</dt>
                        <dd>A Metamask Custom RPC is an RPC that is added to the Metamask wallet so users
                          can use other
                          blockchains. For example, Binance Smart Chain, or Avalanche C-Chain.
                        </dd>
                        <dt>How can I add an RPC to the list?</dt>
                        <dd><a href="//t.me/truemiller1">Contact True Miller via Telegram</a>.</dd>
                      </dl>
                    </section>
                  </article>
                </main>
              </div>

              <footer className="footer p-3 bg-white d-flex flex-row border-top">
					<span className="text-muted align-self-start">&copy; <a href="https://truemiller.com"
                                                                            className={"text-decoration-none"}>True Miller</a> 2020-2021. All rights
						reserved.</span>
                <span className={"mx-2"}><a href="//cryptologos.net"
                                            className={"text-decoration-none"}>Crypto Logos</a></span>
                <span className={"mx-2"}><a href="//twitter.com/truemiller_com" className={"text-decoration-none"}>Twitter</a></span>
                <span className={"mx-2"}><a href="//t.me/truemiller1"
                                            className={"text-decoration-none"}>Contact via Telegram</a></span>
              </footer>
            </div>

          </>)
          ;
    }
;

const NETWORKS = [{
  s: "avax",
  n: "Avalanche",
  d: "Avalanche is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/avax.png",
  u: "https://www.avax.network/"
}, {
  s: "bsc",
  n: "Binance Smart Chain",
  d: "Avalanche is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/bnb.png",
  u: "https://www.bnbchain.world/en"
}, {
  s: "eth",
  n: "Ethereum",
  d: "Avalanche is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/eth.png",
  u: "//ethereum.org"
}, {
  s: "ftm",
  n: "Fantom",
  d: "Avalanche is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/ftm.png",
  u: "https://fantom.foundation/"
}, {
  s: "one",
  n: "Harmony",
  d: "Harmony  is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/harmony.png",
  u: "https://www.harmony.one/"
}, {
  s: "heco",
  n: "Huobi Eco Chain",
  d: "Huobi Eco Chain is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/heco.png",
  u: "https://www.hecochain.com"
}, {
  s: "matic",
  n: "Polygon Matic",
  d: "Polygon Matic is a high-throughput, scalable, smartcontract-enabled blockchain. There are multiple chains and subnets, including the X-Chain, C-Chain, P-Chain, and matching testnets.",
  i: "/logos/matic.png",
  u: "https://polygon.technology/"
}, {
  s: "kcc",
  n: "Kucoin Chain",
  d: "Kucoin Community Chain, operated by the KuCoin community",
  i: "/logos/kcc.png",
  u: "https://www.kcc.io/"
},
  {
    s: "ela",
    n: "Elastos",
    d: "Elastos is three elements in one, a Blockchain-powered internet, operating system, and web3 runtime.",
    i: "/logos/ela.png",
    u: "https://www.elastos.org/"
  },
  {
    s: "gno",
    n: "Gnosis",
    d: "xDai is an Ethereum sidechain. Smart-contract-enabled, EVM-compatible, and powered with xDai--a stablecoin and gas token.",
    i: "/logos/wxdai.png",
    u: "https://gnosis.io/"
  },
  {
    s: "ubiq",
    n: "Ubiq",
    d: "",
    i: "/logos/ubiq.png",
    u: "https://ubiqsmart.com/"
  },
  {
    s: "cro",
    n: "Cronos",
    d: "",
    i: "/logos/cro.svg",
    u: "https://cronos.org/"
  },
  {
    s: "fuse",
    n: "Fuse",
    d: "",
    i: "/logos/fuse.png",
    u: "https://fuse.io/"
  },
  {
    s: "moonriver",
    n: "Moonriver",
    d: "",
    i: "/logos/movr.webp",
    u: "https://moonbeam.network/networks/moonriver/"
  },
  {
    s: "okex",
    n: "OKEx",
    d: "",
    i: "/logos/okt.webp",
    u: "https://www.okx.com/okc"
  },
  {
    s: "telos",
    n: "Telos",
    d: "",
    i: "/logos/tlos.png",
    u: "https://www.telos.net/"
  },
  {
    s: "nahmii",
    n: "Nahmii",
    d: "",
    i: "/logos/nii.webp",
    u: "https://www.nahmii.io/"
  },
  {
    s: "iotex",
    n: "IoTeX",
    d: "",
    i: "/logos/iotex.webp",
    u: "https://iotex.io/"
  },
  {
    s: "hoo",
    n: "Hoo",
    d: "",
    i: "/logos/hoo.png",
    u: "https://www.hoosmartchain.com/"
  },
  {
    s: "celo",
    n: "Celo",
    d: "",
    i: null,
    u: "https://celo.org/"
  },
  {
    s: "near",
    n: "Near",
    d: "",
    i: null,
    u: "https://near.org/"
  },
  {
    s: "arbitrum",
    n: "Arbitrum",
    d: "",
    i: null,
    u: "https://offchainlabs.com/"
  },
  {
    s: "solana",
    n: "Solana",
    d: "",
    i: null,
    u: "https://solana.com/"
  },
  {
    s: "smartbch",
    n: "SmartBCH",
    d: "",
    i: null,
    u: "https://smartbch.org/"
  },
]

const RPCS = [
  // avax
  {
    network: 'avax',
    name: 'Avalanche C Chain Mainnet RPC',
    url: 'https://api.avax.network/ext/bc/C/rpc',
    chainId: 43114,
    symbol: 'AVAX',
    block_explorer: 'https://snowtrace.io',
    type: 'Mainnet'
  },
  {
    network: 'avax',
    name: 'Avalanche C Chain Mainnet RPC',
    url: 'https://rpc.ankr.com/avalanche',
    chainId: 43114,
    symbol: 'AVAX',
    block_explorer: 'https://snowtrace.io',
    type: 'Mainnet'
  },
  {
    network: 'avax',
    name: 'Avalanche FUJI Testnet RPC',
    url: 'https://api.avax-test.network/ext/bc/C/rpc',
    chainId: 43113,
    symbol: 'AVAX',
    block_explorer: 'https://testnet.explorer.avax.network/',
    type: "Testnet"
  },
  {
    network: 'avax',
    name: 'Avalanche C Chain Local RPC',
    url: 'https://localhost:9650/ext/bc/C/rpc',
    chainId: 43112,
    symbol: 'AVAX',
    block_explorer: 'https://snowtrace.io',
    type: "Testnet"
  },
  // bsc
  {
    network: 'bsc',
    name: 'Binance Smart Chain Mainnet RPC',
    url: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    symbol: 'BNB',
    block_explorer: 'https://bscscan.com',
    type: "Mainnet"
  },
  {
    network: 'bsc',
    name: 'Binance Smart Chain Mainnet RPC',
    url: 'https://rpc.ankr.com/bsc',
    chainId: 56,
    symbol: 'BNB',
    block_explorer: 'https://bscscan.com',
    type: "Mainnet"
  },
  {
    network: 'bsc',
    name: 'Binance Smart Chain Testnet RPC',
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97,
    symbol: 'BNB',
    block_explorer: 'https://testnet.bscscan.com',
    type: "Testnet"
  },
  // cro
  {
    network: "cro",
    name: "Cronos Mainnet RPC",
    url: "https://evm-cronos.crypto.org",
    chainId: 25,
    symbol: "CRO",
    block_explorer: "https://cronos.crypto.org/explorer/",
    type: "Mainnet"
  },
  // elastos
  {
    network: 'ela',
    name: 'Elastos ETH Mainnet RPC',
    url: "https://api.elastos.io/eth",
    chainId: 20,
    symbol: "ELA",
    block_explorer: "https://explorer.elaeth.io/",
    type: "Mainnet"
  },
  // eth
  {
    network: 'eth',
    name: 'Ethereum Mainnet RPC',
    url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 0x1,
    symbol: 'ETH',
    block_explorer: 'https://etherscan.io',
    type: "Mainnet"
  },
  {
    network: 'eth',
    name: 'Ethereum Mainnet RPC',
    url: 'https://rpc.ankr.com/eth',
    chainId: 0x1,
    symbol: 'ETH',
    block_explorer: 'https://etherscan.io',
    type: "Mainnet"
  },
  {
    network: 'eth',
    name: 'Ethereum Ropsten Testnet RPC',
    url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 0x3,
    symbol: 'ETH',
    block_explorer: 'https://ropsten.etherscan.io',
    type: "Testnet"
  },
  {
    network: 'eth',
    name: 'Ethereum Rinkeby Testnet RPC',
    url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 0x4,
    symbol: 'ETH',
    block_explorer: 'https://rinkey.etherscan.io',
    type: "Testnet"
  },
  {
    network: 'eth',
    name: 'Ethereum Goerli Testnet RPC',
    url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 0x5,
    symbol: 'ETH',
    block_explorer: 'https://goerli.etherscan.io',
    type: "Testnet"
  },
  {
    network: 'eth',
    name: 'Ethereum Kovan Testnet RPC',
    url: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 0x6,
    symbol: 'ETH',
    block_explorer: 'https://kovan.etherscan.io',
    type: "Testnet"
  },
  //    ftm
  {
    network: 'ftm',
    name: 'Fantom Opera Mainnet RPC',
    url: 'https://rpc.ftm.tools/',
    chainId: 0xfa,
    symbol: 'FTM',
    block_explorer: 'https://ftmscan.com',
    type: "Mainnet"
  },
  {
    network: 'ftm',
    name: 'Fantom Testnet RPC',
    url: 'https://rpc.testnet.fantom.network/',
    chainId: 0xfa2,
    symbol: 'FTM',
    block_explorer: 'https://testnet.ftmscan.com',
    type: "Testnet"
  },
  // fuse
  {
    network: "fuse",
    name: "Fuse Mainnet RPC",
    url: "https://rpc.fuse.io",
    chainId: 0x7a,
    symbol: "FUSE",
    block_explorer: "https://explorer.fuse.io/",
    type: "Mainnet"
  },
  //    heco
  {
    network: 'heco',
    name: 'HECO Mainnet RPC',
    url: 'https://http-mainnet-node.huobichain.com/',
    chainId: 128,
    symbol: 'HT',
    block_explorer: 'https://hecoinfo.com/',
    type: "Mainnet"
  },
  {
    network: 'heco',
    name: 'HECO Testnet RPC',
    url: 'https://http-testnet.hecochain.com',
    chainId: 256,
    symbol: 'HT',
    block_explorer: 'https://testnet.hecoinfo.com/',
    type: "Testnet"
  },
  // kcc
  {
    network: 'kcc',
    name: 'KCC Mainnet RPC',
    url: 'https://rpc-mainnet.kcc.network',
    chainId: 321,
    symbol: 'KCS',
    block_explorer: 'https://scan.kcc.network',
    type: "Mainnet"
  },
  {
    network: 'kcc',
    name: 'KCC Testnet RPC',
    url: 'https://scan-testnet.kcc.network',
    chainId: 322,
    symbol: 'tKCS',
    block_explorer: 'https://scan-testnet.kcc.network',
    type: "Testnet"
  },
  //    matic
  {
    network: 'matic',
    name: 'Matic Mainnet RPC',
    url: 'https://polygon-rpc.com',
    chainId: 0x89,
    symbol: 'MATIC',
    block_explorer: 'https://explorer.matic.network/',
    type: "Mainnet"
  },
  {
    network: 'matic',
    name: 'Matic Testnet RPC',
    url: 'https://rpc-mumbai.maticvigil.com',
    chainId: 0x13881,
    symbol: 'MATIC',
    block_explorer: 'https://mumbai.polygonscan.com/',
    type: "Testnet"
  },
  // moonriver
  {
    network: 'moonriver',
    name: 'Moonriver Mainnet RPC',
    url: 'https://rpc.moonriver.moonbeam.network',
    chainId: 1285,
    symbol: 'MOVR',
    block_explorer: 'https://blockscout.moonriver.moonbeam.network/',
    type: "Mainnet"
  },
  // okex
  {
    network: 'okex',
    name: 'OKExChain Mainnet RPC',
    url: 'https://exchainrpc.okex.org',
    chainId: 66,
    symbol: 'OKT',
    block_explorer: 'https://www.oklink.com/okexchain',
    type: "Mainnet"
  },
  // telos
  {
    network: 'telos',
    name: 'Telos EVM Mainnet RPC',
    url: 'https://mainnet.telos.net/evm',
    chainId: 40,
    symbol: 'TLOS',
    block_explorer: 'https://telos.net/',
    type: "Mainnet"
  },

  //    one
  {
    network: 'one',
    name: 'Harmony Mainnet RPC',
    url: 'https://api.harmony.one/',
    chainId: 0x63564c40,
    symbol: 'ONE',
    block_explorer: 'https://explorer.harmony.one',
    type: "Mainnet"
  },
  {
    network: 'one',
    name: 'Harmony Testnet RPC',
    url: 'https://api.s0.b.hmny.io/',
    chainId: 0x6357d2e0,
    symbol: 'ONE',
    block_explorer: 'https://explorer.harmony.one',
    type: "Testnet"
  },
  // ubiq
  {
    network: "ubiq",
    name: "Ubiq Mainnet RPC",
    url: "https://rpc.octano.dev/",
    chainId: 8,
    symbol: "UBQ",
    block_explorer: "https://ubiqscan.io/",
    type: "Mainnet"
  },
  // xdai
  {
    network: "gno",
    name: "Gnosis Mainnet RPC",
    url: "https://rpc.gnosischain.com/",
    chainId: 0x64,
    symbol: "XDAI",
    block_explorer: "https://blockscout.com/xdai/mainnet/",
    type: "Mainnet"
  },
  // nahmii
  {
    network: "nahmii",
    name: "Nahmii Mainnet RPC",
    url: "https://l2.nahmii.io/",
    chainId: 5551,
    symbol: "ETH",
    block_explorer: "https://explorer.nahmii.io/",
    type: "Mainnet"
  },
  {
    network: "nahmii",
    name: "Nahmii Testnet RPC",
    url: "https://l2.testnet.nahmii.io/",
    chainId: 5553,
    symbol: "ETH",
    block_explorer: "https://explorer.testnet.nahmii.io/",
    type: "Testnet"
  },
  //iotex
  {
    network: "iotex",
    name: "IoTeX Mainnet RPC",
    url: "https://babel-api.mainnet.iotex.io",
    chainId: 4689,
    symbol: "IOTEX",
    block_explorer: "https://iotexscan.io/",
    type: "Mainnet"
  },
  // hoo
  {
    network: "hoo",
    name: "Hoo Mainnet RPC",
    url: "https://http-mainnet.hoosmartchain.com",
    chainId: 70,
    symbol: "HOO",
    block_explorer: "https://hooscan.com",
    type: "Mainnet"
  },
  // celo
  {
    network: "celo",
    name: "Celo Mainnet RPC",
    url: "https://rpc.ankr.com/celo",
    chainId: 42220,
    symbol: "CELO",
    block_explorer: "https://celoscan.com",
    type: "Mainnet"
  },
  // near
  {
    network: "near",
    name: "Near Mainnet RPC",
    url: "https://rpc.ankr.com/near",
    chainId: null,
    symbol: "NEAR",
    block_explorer: "",
    type: "Mainnet"
  },
  // arbirtrum
  {
    network: "arbitrum",
    name: "Arbitrum Mainnet RPC",
    url: "https://rpc.ankr.com/arbitrum",
    chainId: 42161,
    symbol: "ETH",
    block_explorer: "https://arbiscan.io/",
    type: "Mainnet"
  },
  // solana
  {
    network: "solana",
    name: "Solana Mainnet RPC",
    url: "https://rpc.ankr.com/solana",
    chainId: null,
    symbol: "SOL",
    block_explorer: "https://solscan.io/",
    type: "Mainnet"
  },
  // smartbch
  {
    network: "smartbch",
    name: "SmartBCH Mainnet RPC",
    url: "https://smartbch.fountainhead.cash/mainnet",
    chainId: 10000,
    symbol: "BCH",
    block_explorer: "https://www.smartscan.cash/",
    type: "Mainnet"
  },

];

