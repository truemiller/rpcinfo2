import "bootswatch/dist/cosmo/bootstrap.min.css";
import { Helmet } from "react-helmet";
import NETWORKS from "./json/networks.json";
import RPCS from "./json/rpcs.json";
import { useState } from "react";

export default function Home() {
  const [filterSlug, setFilterSlug] = useState("");

  const handleFilterClick = (_filterSlug) => {
    if (_filterSlug === filterSlug) {
      setFilterSlug("");
    } else {
      setFilterSlug(_filterSlug);
    }
  };
  const handleAddToMetamask = (chainId) => {
    console.debug(`Adding chainId "${chainId}" to Metamask`);
    let rpc = RPCS.find((rpc) => rpc.chainId === chainId);
    if (!rpc) return;

    let _chainId = "";
    if (rpc.chainId.toString().includes("0x")) {
      _chainId = rpc.chainId;
    } else {
      _chainId = "0x" + chainId.toString(16);
    }

    let params = {
      chainId: _chainId,
      blockExplorerUrls: [`${rpc.block_explorer}`],
      chainName: rpc.name,
      nativeCurrency: {
        name: rpc.symbol,
        symbol: rpc.symbol,
        decimals: 18,
      },
      rpcUrls: [`${rpc.url}`],
    };

    window.ethereum.enable().then((r) => {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((p) => {
        window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [params, p],
          })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>RPC Info</title>
        <meta
          name="description"
          content="Metamask Custom RPCs, and public RPC API endpoints for blockchain networks. Including Avalanche, Binance Smart Chain, Matic and more."
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-203811220-1"
        />
        <script>
          {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-203811220-1');
                `}
        </script>
      </Helmet>
      <div className={"flex flex-column"}>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <a href="/" className="navbar-brand">
              RPC Info
            </a>
          </div>
        </nav>

        <main className="container">
          <section className="mt-2">
            <header className="row">
              <div className="d-flex flew-row justify-content-between">
                <h1 className="font-weight-bolder mb-0 display-1 fw-bolder">
                  RPC Info
                </h1>
              </div>
              <p className="lead">
                Easily add <strong>custom RPCs</strong> to{" "}
                <a className="text-decoration-none" href="//metamask.io">
                  Metamask
                </a>
                .
              </p>
              <section>
                {NETWORKS.sort((a, b) => a.s > b.s).map((network) => {
                  return (
                    <button
                      key={network.s}
                      className={`border rounded btn ${
                        filterSlug === network.s
                          ? "btn-primary text-white"
                          : "btn-light text-dark "
                      } mb-3 me-3`}
                      onClick={() => handleFilterClick(network.s)}
                    >
                      {network.n}
                    </button>
                  );
                })}
              </section>
            </header>
            <div className="row">
              {NETWORKS.filter((a) => a.s === filterSlug || filterSlug === "")
                .sort((a, b) => {
                  return a.s > b.s;
                })
                .map((r) => {
                  return (
                    <section
                      key={r.s}
                      className={"col-md-12 card-body border mb-3"}
                    >
                      <h2 id={`${r.s}-rpc`} className={"fw-bold mb-2"}>
                        <a className="text-decoration-none" href={r.u}>
                          {r.n}
                        </a>{" "}
                        RPCs
                      </h2>
                      <div className={"row"}>
                        <div className="col-md-12">
                          <div className={"row"}>
                            {RPCS.filter((x) => x.network === r.s).map((p) => {
                              return (
                                <div className={"col-md-4"} key={p.url}>
                                  <div className="card mb-3">
                                    <div className="card-body">
                                      <h3 className={"border-bottom"}>
                                        {p.name}
                                      </h3>
                                      <dl>
                                        <dt>Type</dt>
                                        <dd>{p.type}</dd>
                                        <dt className={""}>RPC</dt>
                                        <dd>
                                          <a href={p.url}>{p.url}</a>
                                        </dd>
                                        <dt>Chain ID</dt>
                                        <dd>{p.chainId}</dd>
                                        <dt>Symbol</dt>
                                        <dd>{p.symbol}</dd>
                                        <dt>Block explorer</dt>
                                        <dd>
                                          <a href={p.block_explorer}>
                                            {p.block_explorer}
                                          </a>
                                        </dd>
                                        <>
                                          {p.chainId ? (
                                            <a
                                              onClick={() =>
                                                handleAddToMetamask(p.chainId)
                                              }
                                              className={
                                                "btn btn-sm btn-primary rounded shadow mb-2"
                                              }
                                            >
                                              Add to Metamask{" "}
                                              <img
                                                src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                                                height={13}
                                                width={13}
                                                alt="Metamask logo"
                                                title={`Add ${p.name} RPC to Metamask`}
                                              ></img>
                                            </a>
                                          ) : null}
                                        </>
                                      </dl>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                })}
            </div>
            <section>
              <h2 id="faqs" className="">
                FAQs
              </h2>
              <dl>
                <dt>What does RPC stand for?</dt>
                <dd>RPC standards for Remote Procedural Call.</dd>
                <dt>What is a Metamask Custom RPC?</dt>
                <dd>
                  A Metamask Custom RPC is an RPC that is added to the Metamask
                  wallet so users can use other blockchains. For example,
                  Binance Smart Chain, or Avalanche C-Chain.
                </dd>
                <dt>How can I add an RPC to the list?</dt>
                <dd>
                  <a href="//t.me/truemiller1">
                    Contact True Miller via Telegram
                  </a>
                  .
                </dd>
              </dl>
            </section>
          </section>
        </main>

        <footer className="mt-auto footer p-3 bg-white d-flex flex-row border-top">
          <span className="text-muted align-self-start">
            &copy;{" "}
            <a href="https://mlxn.ltd" className={"text-decoration-none"}>
              MLXN Ltd
            </a>{" "}
            2020-2021. All rights reserved.
          </span>
          <span className={"mx-2"}>
            <a href="//cryptologos.net" className={"text-decoration-none"}>
              Crypto Logos
            </a>
          </span>
          <span className={"mx-2"}>
            <a href="//twitter.com/joshmlxn" className={"text-decoration-none"}>
              Twitter
            </a>
          </span>
          <span className={"mx-2"}>
            <a href="//t.me/truemiller1" className={"text-decoration-none"}>
              Contact via Telegram
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
